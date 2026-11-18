import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useCartItems } from "../lib/cart";
import { useWishlistIds } from "../lib/wishlist";
import capturedCSS from "../styles/pages/about.css?raw";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CLOZET — Everyday Fashion from Pakistan" },
      { name: "description", content: "Learn about CLOZET’s point of view on thoughtful, comfortable everyday fashion for men and women in Pakistan." },
      { property: "og:title", content: "About CLOZET — Everyday Fashion from Pakistan" },
      { property: "og:description", content: "Learn about CLOZET’s point of view on thoughtful, comfortable everyday fashion for men and women in Pakistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "en" }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <>
      <style>{capturedCSS}</style>
      <div className={"\x62g-primary px-4 py-2 text-center text-xs tracking-[0.18em] text-primary-foreground"}>DISCOVER EVERYDAY STYLE <span className="mx-2 text-terracotta">|</span> SPECIAL LAUNCH OFFERS ON SELECTED STYLES</div>
      <ImportedHeader />
      <main className="min-h-[60vh]">
        <section className={"\x62order-b \x62order-border px-4 py-14 md:px-8 md:py-20"}>
          <div className="mx-auto max-w-7xl">
            <p className="text-xs tracking-[0.3em] text-olive">A LITTLE ABOUT US</p>
            <h1 className="mt-3 max-w-3xl text-4xl md:text-6xl">Everyday style, with a point of view.</h1>
            <div className="mt-4 max-w-2xl text-muted-foreground">
              <p>CLOZET is a proposed Pakistan-based online clothing store focused on making everyday fashion accessible, comfortable and affordable for men and women.</p>
            </div>
          </div>
        </section>
        <section className={"mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 \x6dd:\x69tems-center md:px-8 md:py-20"}>
          <img className="max-h-[640px] w-full object-cover" src="/site-assets/de81bb99153ce78a.webp" alt="CLOZET's contemporary women's everyday fashion" width="1200" height="1408" />
          <div className="max-w-lg">
            <p className="text-xs tracking-[0.28em] text-olive">THE CLOZET IDEA</p>
            <h2 className="mt-4 text-4xl leading-tight">Good style belongs in the everyday.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">CLOZET is imagined as an easy place to find clothing that feels right for real life. A modern edit of everyday pieces, made approachable for the way men and women dress in Pakistan.</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">We believe that shopping online should feel clear and convenient. Straightforward pricing, a focused collection and helpful customer support are part of the idea from the start.</p>
            <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 h-9 px-4 py-2 mt-7 rounded-none"} href="/shop">Explore the collection <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
          </div>
        </section>
        <section className={"grid \x62g-secondary/\x350 md:grid-cols-2"}>
          <div className="flex flex-col justify-center px-6 py-12 md:px-16 md:py-20">
            <p className="text-xs tracking-[0.28em] text-olive">OUR PHILOSOPHY</p>
            <h2 className="mt-4 max-w-md text-4xl">A considered edit.<br />A comfortable point of view.</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">From everyday tees and easy layers to Pakistani-inspired pieces, the CLOZET concept brings together styles for more than one kind of day. We keep the choice simple and the published selling prices clear.</p>
          </div>
          <img className="max-h-[600px] w-full object-cover" src="/site-assets/964cbece38507622.webp" alt="CLOZET men's collection campaign" width="1200" height="1408" loading="lazy" />
        </section>
      </main>
      <ImportedFooterNewStylesFirst />
      <section aria-label="Notifications alt+T" tabIndex={-1} aria-live="polite" aria-relevant="additions text" aria-atomic="false" />
    </>
  );
}

function ImportedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      } else if (searchOpen) {
        setSearchOpen(false);
        searchButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (menuOpen) menuCloseRef.current?.focus();
    if (searchOpen) searchInputRef.current?.focus();
  }, [menuOpen, searchOpen]);

  const cartItems = useCartItems();
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const wishlistIds = useWishlistIds();

  return (
    <header className={"sticky top-0 z-40 \x62order-b \x62order-border \x62g-background/\x395"}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <button ref={menuButtonRef} className={"\x6dd:\x68idden"} type="button" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="clozet-mobile-menu" onClick={() => setMenuOpen(true)}>
          <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
        <a className={"\x66ont-display text-2xl font-semibold tracking-[0.32em]"} aria-label="CLOZET home" href="/">CLO<span className="text-terracotta">Z</span>ET</a>
        <nav className={"hidden items-center gap-7 \x6dd:\x66lex"} aria-label="Main">
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/">Home</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/shop?category=Men">Men</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/shop?category=Women">Women</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/shop?sort=newest">New Arrivals</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/shop?collection=Winter+wear">Winter Wear</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta text-terracotta" aria-current="page" href="/about">About Us</a>
        </nav>
        <div className="flex items-center gap-4">
          <button ref={searchButtonRef} type="button" aria-label="Search" aria-expanded={searchOpen} aria-controls="clozet-search" onClick={() => setSearchOpen(true)}>
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </button>
          <a className="relative" aria-label={`Wishlist, ${wishlistIds.length} items`} href="/wishlist">
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
          </a>
          <a className="relative" aria-label={`Shopping bag, ${cartCount} items`} href="/cart">
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 10a4 4 0 0 1-8 0" />
              <path d="M3.103 6.034h17.794" />
              <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
            </svg>
            <span className={"absolute -right-2 -top-2 grid size-4 place-items-center rounded-full \x62g-primary text-[10px] text-primary-foreground"}>{cartCount}</span>
          </a>
        </div>
      </div>
      {menuOpen && (
        <div id="clozet-mobile-menu" className="site-mobile-menu-overlay flex flex-col bg-background p-6 text-foreground md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="flex items-center justify-between">
            <a className="font-display text-xl font-semibold" href="/" aria-label="CLOZET home">CLO<span className="text-terracotta">Z</span>ET</a>
            <button ref={menuCloseRef} type="button" className="grid size-10 place-items-center" aria-label="Close menu" onClick={() => { setMenuOpen(false); menuButtonRef.current?.focus(); }}>
              <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12" /></svg>
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-4 overflow-y-auto font-display text-3xl" aria-label="Mobile navigation">
            <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="/shop?category=Men" onClick={() => setMenuOpen(false)}>Men</a>
            <a href="/shop?category=Women" onClick={() => setMenuOpen(false)}>Women</a>
            <a href="/shop?sort=newest" onClick={() => setMenuOpen(false)}>New Arrivals</a>
            <a href="/shop?collection=Winter+wear" onClick={() => setMenuOpen(false)}>Winter Wear</a>
            <a href="/shop" onClick={() => setMenuOpen(false)}>Shop All</a>
            <a href="/about" onClick={() => setMenuOpen(false)}>About Us</a>
            <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
        </div>
      )}
      {searchOpen && (
        <div id="clozet-search" className="site-search-overlay bg-primary/60" role="dialog" aria-modal="true" aria-label="Search products" onClick={(event) => { if (event.target === event.currentTarget) { setSearchOpen(false); searchButtonRef.current?.focus(); } }}>
          <form className="bg-background px-4 py-10" role="search" onSubmit={(event) => event.preventDefault()}>
            <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-border">
              <svg className="size-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.34-4.34" /></svg>
              <input ref={searchInputRef} className="w-full bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground" placeholder="Search kurtis, denim, winter…" aria-label="Search products" type="search" />
              <button type="button" className="grid size-10 shrink-0 place-items-center" aria-label="Close search" onClick={() => { setSearchOpen(false); searchButtonRef.current?.focus(); }}>
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12" /></svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}

function ImportedFooterNewStylesFirst() {
  return (
    <footer className={"\x62g-primary text-primary-foreground"}>
      <section className={"\x62order-b \x62order-primary-foreground/\x315 px-4 py-16 text-center"}>
        <p className="text-xs tracking-[0.3em] text-terracotta">THE CLOZET LETTER</p>
        <h2 className="mt-3 text-3xl md:text-4xl">New styles, first.</h2>
        <form className={"mx-auto mt-6 flex max-w-md \x62order-b \x62order-primary-foreground/\x350"}>
          <input className={"w-full bg-transparent py-3 \x6futline-none \x70laceholder:\x74ext-primary-foreground/\x350"} type="email" required placeholder="Your email address" aria-label="Email address" defaultValue="" />
          <button className="px-2 text-sm tracking-widest hover:text-terracotta">SUBSCRIBE</button>
        </form>
      </section>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className={"\x66ont-display text-2xl tracking-[0.32em]"}>CLO<span className="text-terracotta">Z</span>ET</p>
          <p className={"mt-2 \x66ont-display italic \x74ext-primary-foreground/\x380"}>Style Delivered to Your Doorstep.</p>
          <p className={"mt-4 text-sm \x74ext-primary-foreground/\x360"}>Comfortable, reasonably priced everyday fashion for men and women in Pakistan.</p>
        </div>
        <div className={"flex flex-col gap-2 text-sm \x74ext-primary-foreground/\x375"}>
          <p className="mb-2 text-xs tracking-[0.2em] text-primary-foreground">SHOP</p>
          <a href="/shop?category=Men">Men</a>
          <a href="/shop?category=Women">Women</a>
          <a href="/shop?sort=newest">New Arrivals</a>
          <a href="/shop">Shop All</a>
        </div>
        <div className={"flex flex-col gap-2 text-sm \x74ext-primary-foreground/\x375"}>
          <p className="mb-2 text-xs tracking-[0.2em] text-primary-foreground">SUPPORT</p>
          <a href="/contact">Contact Us</a>
          <a href="/delivery">Delivery Information</a>
          <a href="/returns">Return &amp; Refund Policy</a>
          <a href="/faq">FAQs</a>
          <a aria-current="page" href="/about">About Us</a>
        </div>
        <div className={"flex flex-col gap-2 text-sm \x74ext-primary-foreground/\x375"}>
          <p className="mb-2 text-xs tracking-[0.2em] text-primary-foreground">FOLLOW</p>
          <a href="https://instagram.com" rel="noreferrer" target="_blank">Instagram (placeholder)</a>
          <a href="https://facebook.com" rel="noreferrer" target="_blank">Facebook (placeholder)</a>
          <a href="https://tiktok.com" rel="noreferrer" target="_blank">TikTok (placeholder)</a>
        </div>
      </div>
      <p className={"\x62order-t \x62order-primary-foreground/\x315 py-6 text-center text-xs \x74ext-primary-foreground/\x350"}>© 2026 CLOZET · Academic business project — a frontend demonstration store.</p>
    </footer>
  );
}