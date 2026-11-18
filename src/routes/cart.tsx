import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { StoreFooter, StoreHeader } from "../components/storefront";
import { clearCart, updateCartItem, useCartItems, type CartItem } from "../lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Shopping Bag — CLOZET" }] }),
  component: CartPage,
});

type CheckoutDetails = {
  name: string;
  phone: string;
  address: string;
  payment: string;
};

type ConfirmedOrder = {
  id: string;
  items: CartItem[];
  subtotal: number;
  details: CheckoutDetails;
  date: string;
};

function CartPage() {
  const items = useCartItems();
  const [stage, setStage] = useState<"cart" | "review" | "confirmation">("cart");
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [details, setDetails] = useState<CheckoutDetails>({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on delivery",
  });
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  function reviewCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStage("review");
  }

  function handlePlaceOrder() {
    const orderId = `CLZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrder({
      id: orderId,
      items: [...items],
      subtotal,
      details: { ...details },
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });
    clearCart();
    setStage("confirmation");
  }

  return (
    <>
      <StoreHeader />
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <p className="text-xs tracking-[0.3em] text-olive">YOUR SELECTION</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Your shopping bag.</h1>
        {stage === "confirmation" && confirmedOrder ? (
          <section className="mt-10 border-y border-border py-12" role="status">
            <p className="text-xs tracking-[0.3em] text-olive">ORDER CONFIRMATION</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Order Confirmed!</h2>
            <div className="mt-4 max-w-2xl border border-border bg-secondary/50 p-4 text-sm">
              <p className="font-medium text-foreground">
                Your order has been successfully placed! This is a personal shopping website, and online payments are currently unavailable. Your order details have been received.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                No online payment has been processed and no charges were made.
              </p>
            </div>
            <div className="mt-8 max-w-xl space-y-4 border border-border p-6 text-sm">
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Order Reference</span>
                <span className="font-mono font-medium">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Customer Name</span>
                <span className="font-medium">{confirmedOrder.details.name}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Contact Phone</span>
                <span className="font-medium">{confirmedOrder.details.phone}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Delivery Address</span>
                <span className="max-w-xs whitespace-pre-wrap text-right font-medium">{confirmedOrder.details.address}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium">{confirmedOrder.details.payment} (Offline/Demo)</span>
              </div>
              <div className="border-b border-border pb-3">
                <span className="mb-2 block text-muted-foreground">Items Ordered:</span>
                <ul className="space-y-2">
                  {confirmedOrder.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-xs">
                      <span>{item.name} (Size {item.size}) × {item.quantity}</span>
                      <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between pt-1 text-base font-semibold">
                <span>Order Total</span>
                <span>PKR {confirmedOrder.subtotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-8">
              <a
                className="inline-flex h-10 items-center bg-primary px-6 text-sm text-primary-foreground hover:bg-primary/90"
                href="/shop"
              >
                Return to the collection
              </a>
            </div>
          </section>
        ) : items.length === 0 ? (
          <section className="mt-10 border-y border-border py-12 text-center">
            <h2 className="font-display text-2xl">Your bag is waiting for something good.</h2>
            <p className="mt-2 text-muted-foreground">
              Add a piece from the collection to see it here.
            </p>
            <a
              className="mt-6 inline-flex h-10 items-center bg-primary px-5 text-sm text-primary-foreground"
              href="/shop"
            >
              Explore the collection
            </a>
          </section>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
            <section
              aria-label="Items in your bag"
              className="divide-y divide-border border-y border-border"
            >
              {items.map((item) => (
                <article className="flex gap-4 py-5 sm:gap-6" key={item.id}>
                  <img
                    className="aspect-4/5 w-24 bg-secondary object-cover sm:w-32"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="font-display text-xl">{item.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Size {item.size}</p>
                      <button
                        className="mt-3 cursor-pointer text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground"
                        type="button"
                        onClick={() => updateCartItem(item.id, 0)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm">
                        Qty{" "}
                        <select
                          className="ml-2 border border-input bg-background px-2 py-1"
                          value={item.quantity}
                          aria-label={`Quantity for ${item.name}`}
                          onChange={(event) => updateCartItem(item.id, Number(event.target.value))}
                        >
                          {Array.from({ length: Math.max(10, item.quantity) }, (_, i) => i + 1).map((quantity) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </select>
                      </label>
                      <p className="whitespace-nowrap text-sm font-medium">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </section>
            <aside className="h-fit border-t border-border pt-5">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">PKR {subtotal.toLocaleString()}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Delivery and payment are for demonstration only.
              </p>
              {stage === "cart" ? (
                <form className="mt-8 space-y-5" onSubmit={reviewCheckout}>
                  <h2 className="font-display text-2xl">Delivery details</h2>
                  <label className="block text-sm">
                    Name
                    <input
                      className="mt-2 w-full border border-input bg-background px-3 py-2"
                      autoComplete="name"
                      required
                      value={details.name}
                      onChange={(event) => setDetails({ ...details, name: event.target.value })}
                    />
                  </label>
                  <label className="block text-sm">
                    Contact number
                    <input
                      className="mt-2 w-full border border-input bg-background px-3 py-2"
                      autoComplete="tel"
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9+ ]{7,20}"
                      title="Enter 7 to 20 digits, spaces, or a leading + sign."
                      required
                      value={details.phone}
                      onChange={(event) => setDetails({ ...details, phone: event.target.value })}
                    />
                  </label>
                  <label className="block text-sm">
                    Delivery address
                    <textarea
                      className="mt-2 w-full border border-input bg-background px-3 py-2"
                      autoComplete="street-address"
                      rows={3}
                      required
                      value={details.address}
                      onChange={(event) => setDetails({ ...details, address: event.target.value })}
                    />
                  </label>
                  <label className="block text-sm">
                    Payment method
                    <select
                      className="mt-2 w-full border border-input bg-background px-3 py-2"
                      value={details.payment}
                      onChange={(event) => setDetails({ ...details, payment: event.target.value })}
                    >
                      <option>Cash on delivery</option>
                      <option>Bank transfer (demo only)</option>
                      <option>Card (demo only)</option>
                    </select>
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Personal website notice: Online payments are currently unavailable. No financial charge will be made.
                  </p>
                  <button
                    className="h-11 w-full bg-primary px-4 text-sm tracking-wide text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    type="submit"
                  >
                    Review details
                  </button>
                </form>
              ) : (
                <section className="mt-8 space-y-5" aria-label="Review checkout details">
                  <h2 className="font-display text-2xl">Review your details</h2>
                  <dl className="space-y-3 border-y border-border py-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Name</dt>
                      <dd>{details.name}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Contact number</dt>
                      <dd>{details.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Delivery address</dt>
                      <dd className="whitespace-pre-wrap">{details.address}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Payment method</dt>
                      <dd>{details.payment}</dd>
                    </div>
                  </dl>
                  <p className="text-sm text-muted-foreground">
                    This is a personal website. Online payments are unavailable and no order payment will be charged.
                  </p>
                  <button
                    className="h-11 w-full bg-primary px-4 text-sm tracking-wide text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    type="button"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                  <button
                    className="w-full py-2 text-sm underline underline-offset-4 cursor-pointer"
                    type="button"
                    onClick={() => setStage("cart")}
                  >
                    Edit delivery details
                  </button>
                </section>
              )}
            </aside>
          </div>
        )}
      </main>
      <StoreFooter />
    </>
  );
}
