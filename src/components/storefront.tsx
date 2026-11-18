import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { addToCart, useCartItems } from "../lib/cart";
import { toggleWishlist, useWishlistIds } from "../lib/wishlist";
import type { Product } from "../lib/catalog";

export function StoreHeader() {
  const items = useCartItems();
  const wishlist = useWishlistIds();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="bg-primary px-4 py-2 text-center text-xs tracking-[0.18em] text-primary-foreground">
        DISCOVER EVERYDAY STYLE <span className="mx-2 text-terracotta">|</span> SPECIAL LAUNCH OFFERS ON SELECTED STYLES
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <button
            className="md:hidden"
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="clozet-mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
          <Link
            className="font-display text-2xl font-semibold tracking-[0.32em]"
            to="/"
            aria-label="CLOZET home"
          >
            CLO<span className="text-terracotta">Z</span>ET
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            <Link className="text-sm tracking-wide transition-colors hover:text-terracotta" to="/">Home</Link>
            <Link className="text-sm tracking-wide transition-colors hover:text-terracotta" to="/shop" search={{ category: "Men" }}>Men</Link>
            <Link className="text-sm tracking-wide transition-colors hover:text-terracotta" to="/shop" search={{ category: "Women" }}>Women</Link>
            <Link className="text-sm tracking-wide transition-colors hover:text-terracotta" to="/shop" search={{ sort: "newest" }}>New Arrivals</Link>
            <Link className="text-sm tracking-wide transition-colors hover:text-terracotta" to="/shop" search={{ collection: "Winter wear" }}>Winter Wear</Link>
            <Link className="text-sm tracking-wide transition-colors hover:text-terracotta" to="/about">About Us</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              aria-controls="clozet-search"
              onClick={() => setSearchOpen(true)}
            >
              <Search aria-hidden="true" size={20} />
            </button>
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} saved items`}
            >
              <Heart aria-hidden="true" size={20} />
            </Link>
            <Link
              className="relative"
              to="/cart"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <ShoppingBag aria-hidden="true" size={20} />
              <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div
          id="clozet-mobile-menu"
          className="site-mobile-menu-overlay flex flex-col bg-background p-6 text-foreground md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between">
            <Link className="font-display text-xl font-semibold" to="/" aria-label="CLOZET home">CLO<span className="text-terracotta">Z</span>ET</Link>
            <button
              type="button"
              className="grid size-10 place-items-center"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={21} />
            </button>
          </div>
          <nav
            className="mt-8 flex flex-col gap-4 overflow-y-auto font-display text-3xl"
            aria-label="Mobile navigation"
          >
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shop" search={{ category: "Men" }} onClick={() => setMenuOpen(false)}>Men</Link>
            <Link to="/shop" search={{ category: "Women" }} onClick={() => setMenuOpen(false)}>Women</Link>
            <Link to="/shop" search={{ sort: "newest" }} onClick={() => setMenuOpen(false)}>New Arrivals</Link>
            <Link to="/shop" search={{ collection: "Winter wear" }} onClick={() => setMenuOpen(false)}>Winter Wear</Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop All</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
      {searchOpen && (
        <div
          id="clozet-search"
          className="site-search-overlay bg-primary/60"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          onClick={(event) => { if (event.target === event.currentTarget) { setSearchOpen(false); } }}
        >
          <form
            className="bg-background px-4 py-10"
            action="/shop"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-border">
              <Search className="size-5 shrink-0" aria-hidden="true" />
              <input
                autoFocus
                className="w-full bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground"
                name="q"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search kurtis, denim, winter…"
                aria-label="Search products"
              />
              <button
                type="button"
                className="grid size-10 shrink-0 place-items-center"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export function StoreFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <section className="border-b border-primary-foreground/15 px-4 py-16 text-center">
        <p className="text-xs tracking-[0.3em] text-terracotta">THE CLOZET LETTER</p>
        <h2 className="mt-3 text-3xl md:text-4xl">New styles, first.</h2>
        <form className="mx-auto mt-6 flex max-w-md border-b border-primary-foreground/50" onSubmit={(e) => e.preventDefault()}>
          <input className="w-full bg-transparent py-3 outline-none placeholder:text-primary-foreground/50" type="email" required placeholder="Your email address" aria-label="Email address" defaultValue="" />
          <button className="px-2 text-sm tracking-widest hover:text-terracotta" type="submit">SUBSCRIBE</button>
        </form>
      </section>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <Link className="font-display text-2xl tracking-[0.32em]" to="/">
            CLO<span className="text-terracotta">Z</span>ET
          </Link>
          <p className="mt-2 font-display italic text-primary-foreground/80">Style Delivered to Your Doorstep.</p>
          <p className="mt-4 text-sm text-primary-foreground/60">Comfortable, reasonably priced everyday fashion for men and women in Pakistan.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-primary-foreground/75">
          <p className="mb-2 text-xs tracking-[0.2em] text-primary-foreground">SHOP</p>
          <Link to="/shop" search={{ category: "Men" }}>Men</Link>
          <Link to="/shop" search={{ category: "Women" }}>Women</Link>
          <Link to="/shop" search={{ sort: "newest" }}>New Arrivals</Link>
          <Link to="/shop">Shop All</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-primary-foreground/75">
          <p className="mb-2 text-xs tracking-[0.2em] text-primary-foreground">SUPPORT</p>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
          <Link to="/cart">Shopping Bag</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-primary-foreground/75">
          <p className="mb-2 text-xs tracking-[0.2em] text-primary-foreground">FOLLOW</p>
          <a href="https://instagram.com" rel="noreferrer" target="_blank">Instagram (placeholder)</a>
          <a href="https://facebook.com" rel="noreferrer" target="_blank">Facebook (placeholder)</a>
          <a href="https://tiktok.com" rel="noreferrer" target="_blank">TikTok (placeholder)</a>
        </div>
      </div>
      <p className="border-t border-primary-foreground/15 py-6 text-center text-xs text-primary-foreground/50">© 2026 CLOZET · Academic business project — a frontend demonstration store.</p>
    </footer>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const saved = useWishlistIds().includes(product.id);
  const add = () => {
    addToCart({
      id: `${product.id}-M`,
      name: product.name,
      image: product.image,
      price: product.price,
      size: "M",
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="group min-w-0">
      <div className="relative aspect-4/5 overflow-hidden bg-secondary">
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          aria-label={`View ${product.name}`}
        >
          <img
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </Link>
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[9px] tracking-[0.16em]">
            NEW
          </span>
        )}
        <button
          className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/95 ${saved ? "text-terracotta" : "text-foreground"}`}
          type="button"
          aria-label={`${saved ? "Remove" : "Save"} ${product.name} ${saved ? "from" : "to"} wishlist`}
          aria-pressed={saved}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          className="absolute bottom-3 left-3 right-3 min-h-10 bg-background/95 px-3 text-[10px] tracking-[0.14em] transition-colors hover:bg-primary hover:text-primary-foreground"
          type="button"
          onClick={add}
          aria-label={`Quick add ${product.name} in size M`}
        >
          {added ? "ADDED TO BAG" : "QUICK ADD · M"}
        </button>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            className="font-display text-base leading-tight hover:text-terracotta"
            to="/product/$productId"
            params={{ productId: product.id }}
          >
            {product.name}
          </Link>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {product.category} · {product.collection}
          </p>
        </div>
        <p className="shrink-0 whitespace-nowrap text-xs font-medium">
          PKR {product.price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
