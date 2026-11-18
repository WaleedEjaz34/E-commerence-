import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { addToCart, useCartItems } from "../lib/cart";
import { getProduct } from "../lib/catalog";
import { toggleWishlist, useWishlistIds } from "../lib/wishlist";
import capturedCSS from "../styles/pages/index.css?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CLOZET — Everyday Fashion, Delivered in Pakistan" },
      { name: "description", content: "Discover thoughtful everyday fashion for men and women, with the latest CLOZET collections and new arrivals." },
      { property: "og:title", content: "CLOZET — Everyday Fashion, Delivered in Pakistan" },
      { property: "og:description", content: "Discover thoughtful everyday fashion for men and women, with the latest CLOZET collections and new arrivals." },
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
        <ImportedSectionStyleThatFeelsLike />
        <ImportedSectionALittleSomethingFor />
        <ImportedSectionFreshFromTheCLOZET />
        <section className={"relative grid min-h-[550px] \x62g-primary text-primary-foreground md:grid-cols-2"}>
          <img className={"h-72 w-full object-cover \x6fbject-center md:h-full"} src="/site-assets/de81bb99153ce78a.webp" alt="Women in contemporary Pakistani everyday fashion" width="1200" height="1408" loading="lazy" />
          <div className="flex flex-col justify-center px-8 py-14 md:px-16 md:py-20">
            <p className="text-xs tracking-[0.28em] text-terracotta">OUR POINT OF VIEW</p>
            <h2 className="mt-5 max-w-lg text-4xl leading-tight md:text-5xl">Everyday Fashion.<br />Effortless Confidence.</h2>
            <p className={"mt-6 max-w-md leading-relaxed \x74ext-primary-foreground/\x375"}>Good style belongs in the everyday. CLOZET is a fresh, approachable edit of clothing for men and women — grounded in the way we live here.</p>
            <div className="mt-8">
              <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x73hadow-sm h-9 px-4 py-2 rounded-none \x62order-primary-foreground/\x360 bg-transparent text-primary-foreground \x68over:\x62g-primary-foreground/\x310 hover:text-primary-foreground"} href="/about">Get to know us <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <ImportedSectionMadeToFitYour />
        <ImportedSectionThoughtfullyUncomplicated />
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.28em] text-olive">STYLE, IN GOOD COMPANY</p>
              <h2 className="mt-3 text-4xl md:text-5xl">Follow the CLOZET Look</h2>
            </div>
            <a className="inline-flex items-center gap-2 pb-1 text-sm" href="https://instagram.com" rel="noreferrer" target="_blank"><svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg> @clozet (placeholder)</a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <img className="aspect-square size-full object-cover" src="/site-assets/964cbece38507622.webp" alt="CLOZET menswear look" loading="lazy" />
            <img className="aspect-square size-full object-cover" src="/site-assets/9af1c69c9d05d635.webp" alt="CLOZET dress collection look" loading="lazy" />
            <img className="aspect-square size-full object-cover" src="/site-assets/de81bb99153ce78a.webp" alt="CLOZET women's collection look" loading="lazy" />
            <img className="aspect-square size-full object-cover" src="/site-assets/e8f11de533c644b1.webp" alt="CLOZET winterwear look" loading="lazy" />
          </div>
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
  const wishlist = useWishlistIds();

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
        <a className={"\x66ont-display text-2xl font-semibold tracking-[0.32em]"} aria-current="page" aria-label="CLOZET home" href="/">CLO<span className="text-terracotta">Z</span>ET</a>
        <nav className={"hidden items-center gap-7 \x6dd:\x66lex"} aria-label="Main">
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta text-terracotta" aria-current="page" href="/">Home</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/shop?category=Men">Men</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/shop?category=Women">Women</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/shop?sort=newest">New Arrivals</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/shop?collection=Winter+wear">Winter Wear</a>
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/about">About Us</a>
        </nav>
        <div className="flex items-center gap-4">
          <button ref={searchButtonRef} type="button" aria-label="Search" aria-expanded={searchOpen} aria-controls="clozet-search" onClick={() => setSearchOpen(true)}>
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </button>
          <a className="relative" aria-label={`Wishlist, ${wishlist.length} items`} href="/wishlist">
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

function ImportedSectionStyleThatFeelsLike() {
  return (
    <section className={"relative isolate min-h-[76vh] overflow-hidden \x62g-primary md:min-h-[660px]"}>
      <img className={"absolute inset-0 size-full object-cover \x6fbject-[\x362%\x5f40%]"} src="/site-assets/3763620879ac5651.webp" alt="CLOZET models in everyday South Asian fashion, in a Lahore courtyard" width="1536" height="1080" fetchPriority="high" />
      <div className={"absolute inset-0 \x62g-gradient-to-r \x66rom-primary/\x380 \x76ia-primary/\x335 \x74o-transparent"} />
      <div className="relative mx-auto flex min-h-[76vh] max-w-7xl items-center px-6 py-20 text-primary-foreground md:min-h-[660px] md:px-12">
        <div className="max-w-xl">
          <p className="mb-6 text-xs tracking-[0.35em] text-secondary">A NEW EVERYDAY, BY CLOZET</p>
          <h1 className="max-w-lg text-5xl leading-[1.08] md:text-7xl">Style That Feels Like You.</h1>
          <p className={"mt-6 max-w-md text-base leading-relaxed \x74ext-primary-foreground/\x385"}>Comfortable, thoughtful everyday fashion for all the ways life unfolds — made more accessible, and delivered to your doorstep.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-secondary text-secondary-foreground \x73hadow-sm \x68over:\x62g-secondary/\x380 h-10 px-8 rounded-none"} href="/shop">Explore Collection <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
            <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x73hadow-sm h-10 px-8 rounded-none \x62order-primary-foreground/\x365 bg-transparent text-primary-foreground \x68over:\x62g-primary-foreground/\x310 hover:text-primary-foreground"} href="/about">Discover CLOZET</a>
          </div>
          <p className={"mt-12 \x66ont-display italic text-secondary"}>Style Delivered to Your Doorstep.</p>
        </div>
      </div>
      <div className={"absolute bottom-6 right-6 hidden items-center gap-3 \x74ext-primary-foreground/\x380 \x6dd:\x66lex"}>
        <span className="text-xs tracking-widest">THE NEW EDIT</span>
        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m7 7 10 10" />
          <path d="M17 7v10H7" />
        </svg>
      </div>
    </section>
  );
}

function ImportedSectionALittleSomethingFor() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.28em] text-olive">FIND YOUR EVERYDAY</p>
          <h2 className="mt-3 text-4xl md:text-5xl">A little something for every day.</h2>
        </div>
        <a className="inline-flex items-center gap-2 pb-2 text-sm hover:text-terracotta" href="/shop">View everything <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
        <a className="group" href="/shop?category=Men">
          <div className={"aspect-[4/5] overflow-hidden \x62g-secondary"}>
            <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/964cbece38507622.webp" alt="Men collection" loading="lazy" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h3 className={"\x66ont-display text-lg"}>Men</h3>
              <p className="mt-1 text-xs text-muted-foreground">Everyday, considered.</p>
            </div>
            <svg className={"size-4 shrink-0 transition \x67roup-hover:\x2dtranslate-y-1 \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>
        </a>
        <a className={"group \x73m:\x74ranslate-y-8"} href="/shop?category=Women">
          <div className={"aspect-[4/5] overflow-hidden \x62g-secondary"}>
            <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/de81bb99153ce78a.webp" alt="Women collection" loading="lazy" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h3 className={"\x66ont-display text-lg"}>Women</h3>
              <p className="mt-1 text-xs text-muted-foreground">A new kind of classic.</p>
            </div>
            <svg className={"size-4 shrink-0 transition \x67roup-hover:\x2dtranslate-y-1 \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>
        </a>
        <a className="group" href="/shop?collection=T-shirts">
          <div className={"aspect-[4/5] overflow-hidden \x62g-secondary"}>
            <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/4899989704d9089f.webp" alt="T-shirts collection" loading="lazy" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h3 className={"\x66ont-display text-lg"}>T-shirts</h3>
              <p className="mt-1 text-xs text-muted-foreground">The everyday starting point.</p>
            </div>
            <svg className={"size-4 shrink-0 transition \x67roup-hover:\x2dtranslate-y-1 \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>
        </a>
        <a className="group" href="/shop?collection=Kurtis">
          <div className={"aspect-[4/5] overflow-hidden \x62g-secondary"}>
            <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/f33506f12299a5c7.webp" alt="Kurtis collection" loading="lazy" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h3 className={"\x66ont-display text-lg"}>Kurtis</h3>
              <p className="mt-1 text-xs text-muted-foreground">A familiar favorite, refreshed.</p>
            </div>
            <svg className={"size-4 shrink-0 transition \x67roup-hover:\x2dtranslate-y-1 \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>
        </a>
        <a className="group" href="/shop?collection=Bottoms">
          <div className={"aspect-[4/5] overflow-hidden \x62g-secondary"}>
            <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/e6193cb68a917930.webp" alt="Bottoms collection" loading="lazy" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h3 className={"\x66ont-display text-lg"}>Bottoms</h3>
              <p className="mt-1 text-xs text-muted-foreground">Made to go with everything.</p>
            </div>
            <svg className={"size-4 shrink-0 transition \x67roup-hover:\x2dtranslate-y-1 \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>
        </a>
        <a className={"group \x73m:\x74ranslate-y-8"} href="/shop?collection=Winter+wear">
          <div className={"aspect-[4/5] overflow-hidden \x62g-secondary"}>
            <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/e8f11de533c644b1.webp" alt="Winter wear collection" loading="lazy" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h3 className={"\x66ont-display text-lg"}>Winter wear</h3>
              <p className="mt-1 text-xs text-muted-foreground">One more reason to linger.</p>
            </div>
            <svg className={"size-4 shrink-0 transition \x67roup-hover:\x2dtranslate-y-1 \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}

function ImportedSectionFreshFromTheCLOZET() {
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);
  const wishlistIds = useWishlistIds();

  function handleQuickAdd(productId: string) {
    const product = getProduct(productId);
    if (!product) return;
    addToCart({ id: `${product.id}-M`, name: product.name, image: product.image, price: product.price, size: "M" });
    setQuickAddedId(productId);
    window.setTimeout(() => setQuickAddedId(null), 1800);
  }

  return (
    <section className={"\x62g-card px-4 py-20 md:px-8 md:py-24"}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs tracking-[0.28em] text-olive">JUST ARRIVED</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Fresh from the CLOZET edit.</h2>
          </div>
          <a className="inline-flex items-center gap-2 pb-1 text-sm" href="/shop?sort=newest">Shop new arrivals <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          <article className="group">
            <div className={"relative overflow-hidden \x62g-secondary aspect-[4/5]"}>
              <a aria-label="Basic Cotton T-shirt" href="/product/basic-cotton-t-shirt">
                <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/4899989704d9089f.webp" alt="Basic Cotton T-shirt" loading="lazy" />
              </a>
              <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] tracking-[0.2em] text-olive">NEW</span>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x68over:\x62g-accent hover:text-accent-foreground absolute right-3 top-3 size-9 rounded-full \x62g-background/\x390 transition \x61ctive:\x73cale-90"} aria-label="Save Basic Cotton T-shirt to wishlist" aria-pressed={wishlistIds.includes("basic-cotton-t-shirt")} onClick={() => toggleWishlist("basic-cotton-t-shirt")}>
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 px-4 absolute \x69nset-x-3 bottom-3 h-auto \x74ranslate-y-0 rounded-none py-2.5 text-xs tracking-[0.18em] transition \x6dd:\x74ranslate-y-16 \x6dd:\x67roup-hover:\x74ranslate-y-0"} aria-label="Quick add Basic Cotton T-shirt in size M" onClick={() => handleQuickAdd("basic-cotton-t-shirt")}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg> QUICK ADD · M</button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <a className={"\x66ont-display text-lg leading-tight hover:text-terracotta"} href="/product/basic-cotton-t-shirt">Basic Cotton T-shirt</a>
                <p className="mt-1 text-xs text-muted-foreground">S · M · L · XL</p>
              </div>
              <p className="whitespace-nowrap text-sm font-medium">PKR 1,450</p>
            </div>
          </article>
          <article className="group">
            <div className={"relative overflow-hidden \x62g-secondary aspect-[4/5]"}>
              <a aria-label="Printed T-shirt" href="/product/printed-t-shirt">
                <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/974e85bb9246b242.webp" alt="Printed T-shirt" loading="lazy" />
              </a>
              <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] tracking-[0.2em] text-olive">NEW</span>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x68over:\x62g-accent hover:text-accent-foreground absolute right-3 top-3 size-9 rounded-full \x62g-background/\x390 transition \x61ctive:\x73cale-90"} aria-label="Save Printed T-shirt to wishlist" aria-pressed={wishlistIds.includes("printed-t-shirt")} onClick={() => toggleWishlist("printed-t-shirt")}>
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 px-4 absolute \x69nset-x-3 bottom-3 h-auto \x74ranslate-y-0 rounded-none py-2.5 text-xs tracking-[0.18em] transition \x6dd:\x74ranslate-y-16 \x6dd:\x67roup-hover:\x74ranslate-y-0"} aria-label="Quick add Printed T-shirt in size M" onClick={() => handleQuickAdd("printed-t-shirt")}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg> QUICK ADD · M</button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <a className={"\x66ont-display text-lg leading-tight hover:text-terracotta"} href="/product/printed-t-shirt">Printed T-shirt</a>
                <p className="mt-1 text-xs text-muted-foreground">S · M · L · XL</p>
              </div>
              <p className="whitespace-nowrap text-sm font-medium">PKR 1,650</p>
            </div>
          </article>
          <article className="group">
            <div className={"relative overflow-hidden \x62g-secondary aspect-[4/5]"}>
              <a aria-label="Men's Casual Shirt" href="/product/mens-casual-shirt">
                <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/ef2665cd054b58de.webp" alt="Men's Casual Shirt" loading="lazy" />
              </a>
              <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] tracking-[0.2em] text-olive">NEW</span>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x68over:\x62g-accent hover:text-accent-foreground absolute right-3 top-3 size-9 rounded-full \x62g-background/\x390 transition \x61ctive:\x73cale-90"} aria-label="Save Men's Casual Shirt to wishlist" aria-pressed={wishlistIds.includes("mens-casual-shirt")} onClick={() => toggleWishlist("mens-casual-shirt")}>
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 px-4 absolute \x69nset-x-3 bottom-3 h-auto \x74ranslate-y-0 rounded-none py-2.5 text-xs tracking-[0.18em] transition \x6dd:\x74ranslate-y-16 \x6dd:\x67roup-hover:\x74ranslate-y-0"} aria-label="Quick add Men's Casual Shirt in size M" onClick={() => handleQuickAdd("mens-casual-shirt")}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg> QUICK ADD · M</button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <a className={"\x66ont-display text-lg leading-tight hover:text-terracotta"} href="/product/mens-casual-shirt">Men's Casual Shirt</a>
                <p className="mt-1 text-xs text-muted-foreground">S · M · L · XL</p>
              </div>
              <p className="whitespace-nowrap text-sm font-medium">PKR 2,250</p>
            </div>
          </article>
          <article className="group">
            <div className={"relative overflow-hidden \x62g-secondary aspect-[4/5]"}>
              <a aria-label="Women's Kurti" href="/product/womens-kurti">
                <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/f33506f12299a5c7.webp" alt="Women's Kurti" loading="lazy" />
              </a>
              <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] tracking-[0.2em] text-olive">NEW</span>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x68over:\x62g-accent hover:text-accent-foreground absolute right-3 top-3 size-9 rounded-full \x62g-background/\x390 transition \x61ctive:\x73cale-90"} aria-label="Save Women's Kurti to wishlist" aria-pressed={wishlistIds.includes("womens-kurti")} onClick={() => toggleWishlist("womens-kurti")}>
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 px-4 absolute \x69nset-x-3 bottom-3 h-auto \x74ranslate-y-0 rounded-none py-2.5 text-xs tracking-[0.18em] transition \x6dd:\x74ranslate-y-16 \x6dd:\x67roup-hover:\x74ranslate-y-0"} aria-label="Quick add Women's Kurti in size M" onClick={() => handleQuickAdd("womens-kurti")}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg> QUICK ADD · M</button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <a className={"\x66ont-display text-lg leading-tight hover:text-terracotta"} href="/product/womens-kurti">Women's Kurti</a>
                <p className="mt-1 text-xs text-muted-foreground">S · M · L · XL</p>
              </div>
              <p className="whitespace-nowrap text-sm font-medium">PKR 2,000</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionMadeToFitYour() {
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);
  const wishlistIds = useWishlistIds();

  function handleQuickAdd(productId: string) {
    const product = getProduct(productId);
    if (!product) return;
    addToCart({ id: `${product.id}-M`, name: product.name, image: product.image, price: product.price, size: "M" });
    setQuickAddedId(productId);
    window.setTimeout(() => setQuickAddedId(null), 1800);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.28em] text-olive">THE CLOZET EDIT</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Made to fit your rhythm.</h2>
        </div>
        <a className="text-sm" href="/shop">Explore all <svg className="ml-2 inline size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-12">
        <div className="md:col-span-5">
          <article className="group">
            <div className={"relative overflow-hidden \x62g-secondary aspect-[3/4]"}>
              <a aria-label="Women's Kurti" href="/product/womens-kurti">
                <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/f33506f12299a5c7.webp" alt="Women's Kurti" loading="lazy" />
              </a>
              <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] tracking-[0.2em] text-olive">NEW</span>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x68over:\x62g-accent hover:text-accent-foreground absolute right-3 top-3 size-9 rounded-full \x62g-background/\x390 transition \x61ctive:\x73cale-90"} aria-label="Save Women's Kurti to wishlist" aria-pressed={wishlistIds.includes("womens-kurti")} onClick={() => toggleWishlist("womens-kurti")}>
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 px-4 absolute \x69nset-x-3 bottom-3 h-auto \x74ranslate-y-0 rounded-none py-2.5 text-xs tracking-[0.18em] transition \x6dd:\x74ranslate-y-16 \x6dd:\x67roup-hover:\x74ranslate-y-0"} aria-label="Quick add Women's Kurti in size M" onClick={() => handleQuickAdd("womens-kurti")}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg> QUICK ADD · M</button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <a className={"\x66ont-display text-lg leading-tight hover:text-terracotta"} href="/product/womens-kurti">Women's Kurti</a>
                <p className="mt-1 text-xs text-muted-foreground">S · M · L · XL</p>
              </div>
              <p className="whitespace-nowrap text-sm font-medium">PKR 2,000</p>
            </div>
          </article>
        </div>
        <div className="md:col-span-3 md:mt-16">
          <article className="group">
            <div className={"relative overflow-hidden \x62g-secondary aspect-[3/4]"}>
              <a aria-label="Printed T-shirt" href="/product/printed-t-shirt">
                <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/974e85bb9246b242.webp" alt="Printed T-shirt" loading="lazy" />
              </a>
              <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] tracking-[0.2em] text-olive">NEW</span>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x68over:\x62g-accent hover:text-accent-foreground absolute right-3 top-3 size-9 rounded-full \x62g-background/\x390 transition \x61ctive:\x73cale-90"} aria-label="Save Printed T-shirt to wishlist" aria-pressed={wishlistIds.includes("printed-t-shirt")} onClick={() => toggleWishlist("printed-t-shirt")}>
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 px-4 absolute \x69nset-x-3 bottom-3 h-auto \x74ranslate-y-0 rounded-none py-2.5 text-xs tracking-[0.18em] transition \x6dd:\x74ranslate-y-16 \x6dd:\x67roup-hover:\x74ranslate-y-0"} aria-label="Quick add Printed T-shirt in size M" onClick={() => handleQuickAdd("printed-t-shirt")}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg> QUICK ADD · M</button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <a className={"\x66ont-display text-lg leading-tight hover:text-terracotta"} href="/product/printed-t-shirt">Printed T-shirt</a>
                <p className="mt-1 text-xs text-muted-foreground">S · M · L · XL</p>
              </div>
              <p className="whitespace-nowrap text-sm font-medium">PKR 1,650</p>
            </div>
          </article>
        </div>
        <div className="md:col-span-4 md:mt-7">
          <article className="group">
            <div className={"relative overflow-hidden \x62g-secondary aspect-[3/4]"}>
              <a aria-label="Denim Jeans" href="/product/denim-jeans">
                <img className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"} src="/site-assets/e6193cb68a917930.webp" alt="Denim Jeans" loading="lazy" />
              </a>
              <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] tracking-[0.2em] text-olive">NEW</span>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x68over:\x62g-accent hover:text-accent-foreground absolute right-3 top-3 size-9 rounded-full \x62g-background/\x390 transition \x61ctive:\x73cale-90"} aria-label="Save Denim Jeans to wishlist" aria-pressed={wishlistIds.includes("denim-jeans")} onClick={() => toggleWishlist("denim-jeans")}>
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 px-4 absolute \x69nset-x-3 bottom-3 h-auto \x74ranslate-y-0 rounded-none py-2.5 text-xs tracking-[0.18em] transition \x6dd:\x74ranslate-y-16 \x6dd:\x67roup-hover:\x74ranslate-y-0"} aria-label="Quick add Denim Jeans in size M" onClick={() => handleQuickAdd("denim-jeans")}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg> QUICK ADD · M</button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <a className={"\x66ont-display text-lg leading-tight hover:text-terracotta"} href="/product/denim-jeans">Denim Jeans</a>
                <p className="mt-1 text-xs text-muted-foreground">S · M · L · XL</p>
              </div>
              <p className="whitespace-nowrap text-sm font-medium">PKR 3,000</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionThoughtfullyUncomplicated() {
  return (
    <section className={"\x62order-y \x62order-border \x62g-secondary/\x340 px-4 py-16 md:px-8 md:py-20"}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-olive">A CLOZET KIND OF EVERYDAY</p>
          <h2 className="mt-3 text-4xl">Thoughtfully uncomplicated.</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <svg className="mx-auto size-6 text-olive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              <path d="M20 2v4" />
              <path d="M22 4h-4" />
              <circle cx="4" cy="20" r="2" />
            </svg>
            <h3 className={"mt-4 \x66ont-display text-xl"}>Affordable by design</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">A considered edit of everyday clothing at accessible prices.</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto size-6 text-olive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <h3 className={"mt-4 \x66ont-display text-xl"}>Comfort, every day</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">Easy-to-wear styles for the days that matter most.</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto size-6 text-olive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 10a4 4 0 0 1-8 0" />
              <path d="M3.103 6.034h17.794" />
              <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
            </svg>
            <h3 className={"mt-4 \x66ont-display text-xl"}>Simple online shopping</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">Find your look and shop from wherever you are.</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto size-6 text-olive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m16 16 2 2 4-4" />
              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
              <path d="m7.5 4.27 9 5.15" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
            </svg>
            <h3 className={"mt-4 \x66ont-display text-xl"}>Here to help</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">Questions about an order? Our contact page is ready when you are.</p>
          </div>
        </div>
      </div>
    </section>
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
          <a href="/about">About Us</a>
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