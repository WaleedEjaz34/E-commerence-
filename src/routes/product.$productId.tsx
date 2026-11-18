import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard, StoreFooter, StoreHeader } from "../components/storefront";
import { addToCart } from "../lib/cart";
import { getProduct, products } from "../lib/catalog";

export const Route = createFileRoute("/product/$productId")({
  head: ({ params }) => {
    const product = getProduct(params.productId);
    return {
      meta: [
        { title: product ? `${product.name} | CLOZET` : "Piece not found | CLOZET" },
        {
          name: "description",
          content: product?.description ?? "Explore the CLOZET everyday collection.",
        },
        {
          property: "og:title",
          content: product ? `${product.name} | CLOZET` : "Piece not found | CLOZET",
        },
        {
          property: "og:description",
          content: product?.description ?? "Explore the CLOZET everyday collection.",
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const product = getProduct(productId);
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <StoreHeader />
        <main className="mx-auto min-h-[55vh] max-w-7xl px-4 py-20 text-center">
          <p className="text-[10px] tracking-[0.2em] text-olive">CLOZET COLLECTION</p>
          <h1 className="mt-4 font-display text-3xl">We couldn't find that piece.</h1>
          <Link className="mt-6 inline-block border-b border-foreground pb-1 text-xs" to="/shop">
            BACK TO SHOP
          </Link>
        </main>
        <StoreFooter />
      </>
    );
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  function addProduct() {
    if (!product) return;
    addToCart({
      id: `${product.id}-${size}`,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
    });
    setAdded(true);
  }

  return (
    <>
      <StoreHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <nav className="mb-6 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
        <section className="grid gap-8 md:grid-cols-2 md:gap-14">
          <div className="bg-secondary">
            <img
              className="aspect-4/5 w-full object-cover"
              src={product.image}
              alt={product.name}
              fetchPriority="high"
            />
          </div>
          <div className="flex flex-col justify-center py-4 md:py-12">
            <p className="text-[10px] tracking-[0.2em] text-olive">
              {product.category.toUpperCase()} · {product.collection.toUpperCase()}
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-lg">PKR {product.price.toLocaleString()}</p>
            <p className="mt-6 max-w-lg text-sm leading-6 text-muted-foreground">
              {product.description}
            </p>
            <fieldset className="mt-8">
              <legend className="text-xs">
                Select size <span className="ml-2 text-muted-foreground">{size}</span>
              </legend>
              <div className="mt-3 flex gap-2">
                {product.sizes.map((option) => (
                  <button
                    className={`grid size-11 place-items-center border text-xs ${size === option ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary"}`}
                    key={option}
                    type="button"
                    aria-pressed={size === option}
                    onClick={() => {
                      setSize(option);
                      setAdded(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
            <button
              className="mt-8 h-12 max-w-lg bg-primary px-6 text-xs tracking-[0.16em] text-primary-foreground hover:bg-primary/90"
              type="button"
              onClick={addProduct}
            >
              {added ? "ADDED TO YOUR BAG" : "ADD TO BAG · PKR " + product.price.toLocaleString()}
            </button>
            {added && (
              <p className="mt-3 text-xs text-olive" role="status">
                {product.name}, size {size}, is in your bag.
              </p>
            )}
            <p className="mt-5 max-w-lg text-xs leading-5 text-muted-foreground">
              CLOZET is a personal-use demo store. Checkout details are for demonstration only; no
              payment or order is processed.
            </p>
          </div>
        </section>
        {related.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-olive">MORE TO EXPLORE</p>
                <h2 className="mt-2 font-display text-3xl">In the same edit.</h2>
              </div>
              <Link className="text-xs" to="/shop" search={{ category: product.category }}>
                VIEW ALL →
              </Link>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>
      <StoreFooter />
    </>
  );
}
