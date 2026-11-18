import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useCartItems } from "../lib/cart";
import { useWishlistIds } from "../lib/wishlist";
import capturedCSS from "../styles/pages/contact.css?raw";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CLOZET — We're Here to Help" },
      { name: "description", content: "Get in touch with CLOZET about the collection using the contact page’s demonstration message form." },
      { property: "og:title", content: "Contact CLOZET — We're Here to Help" },
      { property: "og:description", content: "Get in touch with CLOZET about the collection using the contact page’s demonstration message form." },
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
            <p className="text-xs tracking-[0.3em] text-olive">WE'RE HERE TO HELP</p>
            <h1 className="mt-3 max-w-3xl text-4xl md:text-6xl">Let’s talk CLOZET.</h1>
            <div className="mt-4 max-w-2xl text-muted-foreground">
              <p>Questions about the collection? Send a message through our demonstration form.</p>
            </div>
          </div>
        </section>
        <ImportedSectionAFriendlyHello />
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
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/about">About Us</a>
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

function ImportedSectionAFriendlyHello() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 md:grid-cols-[1fr_300px] md:px-8 md:py-16">
      <div>
        <form className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">Full name<input className={"flex h-9 w-full rounded-md \x62order \x62order-input bg-transparent px-3 py-1 text-base \x73hadow-sm transition-colors \x66ile:\x62order-0 \x66ile:\x62g-transparent \x66ile:\x74ext-sm \x66ile:\x66ont-medium \x66ile:\x74ext-foreground \x70laceholder:\x74ext-muted-foreground \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x63ursor-not-allowed disabled:opacity-50 md:text-sm"} required maxLength={100} autoComplete="name" name="name" /></label>
          <label className="grid gap-2 text-sm">Email address<input className={"flex h-9 w-full rounded-md \x62order \x62order-input bg-transparent px-3 py-1 text-base \x73hadow-sm transition-colors \x66ile:\x62order-0 \x66ile:\x62g-transparent \x66ile:\x74ext-sm \x66ile:\x66ont-medium \x66ile:\x74ext-foreground \x70laceholder:\x74ext-muted-foreground \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x63ursor-not-allowed disabled:opacity-50 md:text-sm"} type="email" required maxLength={120} autoComplete="email" name="email" /></label>
          <label className="grid gap-2 text-sm sm:col-span-2">Subject<input className={"flex h-9 w-full rounded-md \x62order \x62order-input bg-transparent px-3 py-1 text-base \x73hadow-sm transition-colors \x66ile:\x62order-0 \x66ile:\x62g-transparent \x66ile:\x74ext-sm \x66ile:\x66ont-medium \x66ile:\x74ext-foreground \x70laceholder:\x74ext-muted-foreground \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x63ursor-not-allowed disabled:opacity-50 md:text-sm"} required maxLength={140} name="subject" /></label>
          <label className="grid gap-2 text-sm sm:col-span-2">Message<textarea className={"w-full \x62order \x62order-input bg-transparent px-3 py-2 \x6futline-none \x66ocus:\x72ing-1 \x66ocus:\x72ing-ring"} name="message" rows={6} required minLength={5} maxLength={2000} /></label>
          <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 h-9 px-4 py-2 w-fit rounded-none"} type="submit">Send demonstration message</button>
        </form>
      </div>
      <aside className={"\x62order-t \x62order-border pt-6 \x6dd:\x62order-l \x6dd:\x62order-t-0 md:pl-8 md:pt-0"}>
        <p className="text-xs tracking-[0.2em] text-olive">CUSTOMER SUPPORT</p>
        <h2 className={"mt-3 \x66ont-display text-2xl"}>A friendly hello.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Real business contact details haven’t been supplied yet. Add the official contact information before launch.</p>
        <div className={"mt-6 \x73pace-y-4 text-sm"}>
          <p className="flex items-center gap-3"><svg className="size-4 text-olive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg> Email: to be confirmed</p>
          <p className="flex items-center gap-3"><svg className="size-4 text-olive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg> WhatsApp: placeholder only</p>
          <p className="flex items-center gap-3"><svg className="size-4 text-olive" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg> <a className="hover:text-terracotta" href="/">Social handle: to be confirmed</a></p>
        </div>
      </aside>
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
          <a aria-current="page" href="/contact">Contact Us</a>
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