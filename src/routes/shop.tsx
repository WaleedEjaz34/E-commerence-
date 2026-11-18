import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { addToCart, useCartItems } from "../lib/cart";
import { products, type Product } from "../lib/catalog";
import { toggleWishlist, useWishlistIds } from "../lib/wishlist";
import capturedCSS from "../styles/pages/shop.css?raw";

type ShopSearch = {
  q?: string;
  category?: string;
  collection?: string;
  size?: string;
  maxPrice?: number;
  sort?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    collection: typeof search["collection"] === "string" ? search["collection"] : undefined,
    size: typeof search["size"] === "string" ? search["size"] : undefined,
    maxPrice: Number.isFinite(Number(search["maxPrice"])) ? Number(search["maxPrice"]) : undefined,
    sort: typeof search["sort"] === "string" ? search["sort"] : undefined,
  }) as ShopSearch,
  head: () => ({
    meta: [
      { title: "Shop All — CLOZET Pakistan" },
      { name: "description", content: "Browse the CLOZET collection of everyday clothing for men and women, including new arrivals, kurtis, shirts, and more." },
      { property: "og:title", content: "Shop All — CLOZET Pakistan" },
      { property: "og:description", content: "Browse the CLOZET collection of everyday clothing for men and women, including new arrivals, kurtis, shirts, and more." },
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
            <p className="text-xs tracking-[0.3em] text-olive">THE CLOZET COLLECTION</p>
            <h1 className="mt-3 max-w-3xl text-4xl md:text-6xl">Good things, well chosen.</h1>
            <div className="mt-4 max-w-2xl text-muted-foreground">
              <p>Everyday clothing for men and women. Find something that feels like you.</p>
            </div>
          </div>
        </section>
        <ImportedSectionSearch />
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
  const searchParams = Route.useSearch();
  const currentCategory = searchParams.category;

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
        <a className={"\x66ont-display text-2xl font-semibold tracking-[0.32em]"} aria-label="CLOZET home" href="/">CLO<span className="text-terracotta">Z</span>ET</a>
        <nav className={"hidden items-center gap-7 \x6dd:\x66lex"} aria-label="Main">
          <a className="text-sm tracking-wide transition-colors hover:text-terracotta" href="/">Home</a>
          <a className={`text-sm tracking-wide transition-colors hover:text-terracotta ${currentCategory === "Men" ? "text-terracotta font-medium" : ""}`} href="/shop?category=Men">Men</a>
          <a className={`text-sm tracking-wide transition-colors hover:text-terracotta ${currentCategory === "Women" ? "text-terracotta font-medium" : ""}`} href="/shop?category=Women">Women</a>
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
          <form className="bg-background px-4 py-10" role="search" onSubmit={(event) => {
            event.preventDefault();
            const q = searchInputRef.current?.value.trim();
            window.location.href = q ? `/shop?q=${encodeURIComponent(q)}` : "/shop";
          }}>
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

function ImportedSectionSearch() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(search.q ?? "");
  const [category, setCategory] = useState(search.category ?? "All");
  const [collection, setCollection] = useState(search.collection ?? "All");
  const [size, setSize] = useState(search.size ?? "All");
  const [maxPrice, setMaxPrice] = useState(search.maxPrice ?? 5000);
  const [sort, setSort] = useState(search.sort ?? "newest");
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);
  const wishlist = useWishlistIds();

  useEffect(() => {
    setQuery(search.q ?? "");
    setCategory(search.category ?? "All");
    setCollection(search.collection ?? "All");
    setSize(search.size ?? "All");
    setMaxPrice(search.maxPrice ?? 5000);
    setSort(search.sort ?? "newest");
  }, [search.category, search.collection, search.maxPrice, search.q, search.size, search.sort]);

  function updateSearchParam(updates: Partial<ShopSearch>) {
    const nextSearch = {
      q: updates.q !== undefined ? (updates.q || undefined) : (query || undefined),
      category: updates.category !== undefined ? (updates.category === "All" ? undefined : updates.category) : (category === "All" ? undefined : category),
      collection: updates.collection !== undefined ? (updates.collection === "All" ? undefined : updates.collection) : (collection === "All" ? undefined : collection),
      size: updates.size !== undefined ? (updates.size === "All" ? undefined : updates.size) : (size === "All" ? undefined : size),
      maxPrice: updates.maxPrice !== undefined ? (updates.maxPrice === 5000 ? undefined : updates.maxPrice) : (maxPrice === 5000 ? undefined : maxPrice),
      sort: updates.sort !== undefined ? (updates.sort === "newest" ? undefined : updates.sort) : (sort === "newest" ? undefined : sort),
    };
    navigate({
      to: "/shop",
      search: nextSearch as any,
    });
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setCollection("All");
    setSize("All");
    setMaxPrice(5000);
    setSort("newest");
    navigate({
      to: "/shop",
      search: {} as any,
    });
  }

  const filteredProducts = useMemo(() => {
    const matching = products.filter((product) => {
      const searchText =
        `${product.name} ${product.category} ${product.collection} ${product.description}`.toLowerCase();
      const matchesQuery = !query.trim() || searchText.includes(query.trim().toLowerCase());
      const matchesCategory =
        category === "All" || product.category.toLowerCase() === category.toLowerCase();
      const matchesCollection =
        collection === "All" || product.collection.toLowerCase() === collection.toLowerCase();
      const matchesSize = size === "All" || product.sizes.includes(size);
      const matchesPrice = product.price <= maxPrice;
      return matchesQuery && matchesCategory && matchesCollection && matchesSize && matchesPrice;
    });

    return [...matching].sort((first, second) => {
      if (sort === "price-low") return first.price - second.price;
      if (sort === "price-high") return second.price - first.price;
      if (sort === "popular") return second.id.localeCompare(first.id);
      return Number(Boolean(second.isNew)) - Number(Boolean(first.isNew));
    });
  }, [category, collection, maxPrice, query, size, sort]);

  function handleQuickAdd(product: Product) {
    addToCart({
      id: `${product.id}-M`,
      name: product.name,
      image: product.image,
      price: product.price,
      size: "M",
    });
    setQuickAddedId(product.id);
    window.setTimeout(() => setQuickAddedId(null), 1800);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className={"\x73pace-y-6 \x62order-b \x62order-border pb-5 \x6cg:\x62order-b-0 \x6cg:\x62order-r lg:pr-6"}>
          <div>
            <h2 className={"\x66ont-display text-lg"}>Search</h2>
            <input
              className={"mt-2 w-full \x62order \x62order-input bg-background px-3 py-2 text-sm \x6futline-none \x66ocus:\x72ing-1 \x66ocus:\x72ing-ring"}
              aria-label="Search products"
              placeholder="Find a style…"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                updateSearchParam({ q: e.target.value });
              }}
            />
          </div>
          <label className="block text-sm">
            Category
            <select
              className={"mt-2 w-full \x62order \x62order-input bg-background px-3 py-2"}
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                updateSearchParam({ category: e.target.value });
              }}
            >
              <option value="All">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </label>
          <label className="block text-sm">
            Collection
            <select
              className={"mt-2 w-full \x62order \x62order-input bg-background px-3 py-2"}
              value={collection}
              onChange={(e) => {
                setCollection(e.target.value);
                updateSearchParam({ collection: e.target.value });
              }}
            >
              <option value="All">All</option>
              <option value="T-shirts">T-shirts</option>
              <option value="Shirts">Shirts</option>
              <option value="Kurtis">Kurtis</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Dresses">Dresses</option>
              <option value="Winter wear">Winter wear</option>
              <option value="Suits">Suits</option>
            </select>
          </label>
          <label className="block text-sm">
            Maximum price <span className="text-muted-foreground">PKR {maxPrice.toLocaleString()}</span>
            <input
              className={"mt-3 w-full \x61ccent-primary"}
              aria-label="Maximum price"
              min="1000"
              max="5000"
              step="100"
              type="range"
              value={maxPrice}
              onChange={(e) => {
                const nextVal = Number(e.target.value);
                setMaxPrice(nextVal);
                updateSearchParam({ maxPrice: nextVal });
              }}
            />
          </label>
          <label className="block text-sm">
            Size
            <select
              className={"mt-2 w-full \x62order \x62order-input bg-background px-3 py-2"}
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                updateSearchParam({ size: e.target.value });
              }}
            >
              <option value="All">All</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </label>
          <button
            className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 w-full rounded-none"}
            type="button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </aside>
        <div>
          <div className={"flex flex-wrap items-center justify-between gap-4 \x62order-b \x62order-border pb-4"}>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
            </p>
            <label className="flex items-center gap-3 text-sm">
              Sort by{" "}
              <select
                className={"\x62order \x62order-input bg-background px-3 py-2"}
                aria-label="Sort products"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  updateSearchParam({ sort: e.target.value });
                }}
              >
                <option value="newest">Newest</option>
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </label>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6">
            {filteredProducts.map((product) => {
              const isSaved = wishlist.includes(product.id);
              const isAdded = quickAddedId === product.id;
              return (
                <article className="group" key={product.id}>
                  <div className={"relative overflow-hidden \x62g-secondary aspect-[4/5]"}>
                    <a aria-label={product.name} href={`/product/${product.id}`}>
                      <img
                        className={"size-full object-cover transition-transform duration-700 \x67roup-hover:\x73cale-105"}
                        alt={product.name}
                        loading="lazy"
                        src={product.image}
                      />
                    </a>
                    {product.isNew && (
                      <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] tracking-[0.2em] text-olive">NEW</span>
                    )}
                    <button
                      className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x68over:\x62g-accent hover:text-accent-foreground absolute right-3 top-3 size-9 rounded-full \x62g-background/\x390 transition \x61ctive:\x73cale-90"}
                      aria-label={`${isSaved ? "Remove" : "Save"} ${product.name} ${isSaved ? "from" : "to"} wishlist`}
                      aria-pressed={isSaved}
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <svg
                        className={`size-4 ${isSaved ? "text-terracotta" : ""}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={isSaved ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                      </svg>
                    </button>
                    <button
                      className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 px-4 absolute \x69nset-x-3 bottom-3 h-auto \x74ranslate-y-0 rounded-none py-2.5 text-xs tracking-[0.18em] transition \x6dd:\x74ranslate-y-16 \x6dd:\x67roup-hover:\x74ranslate-y-0"}
                      aria-label={`Quick add ${product.name} in size M`}
                      type="button"
                      onClick={() => handleQuickAdd(product)}
                    >
                      <svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg> {isAdded ? "ADDED TO BAG" : "QUICK ADD · M"}
                    </button>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <a className={"\x66ont-display text-lg leading-tight hover:text-terracotta"} href={`/product/${product.id}`}>
                        {product.name}
                      </a>
                      <p className="mt-1 text-xs text-muted-foreground">{product.sizes.join(" · ")}</p>
                    </div>
                    <p className="whitespace-nowrap text-sm font-medium">PKR {product.price.toLocaleString()}</p>
                  </div>
                </article>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <p className="font-display text-2xl">No pieces found matching your selection.</p>
                <p className="mt-2 text-sm text-muted-foreground">Try clearing your filters or selecting a different category.</p>
                <button
                  type="button"
                  className="mt-6 inline-flex h-9 items-center justify-center border border-input bg-background px-4 py-2 text-sm shadow-sm hover:bg-accent cursor-pointer"
                  onClick={clearFilters}
                >
                  Clear all filters
                </button>
              </div>
            )}
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
        <form className={"mx-auto mt-6 flex max-w-md \x62order-b \x62order-primary-foreground/\x350"} onSubmit={(e) => e.preventDefault()}>
          <input className={"w-full bg-transparent py-3 \x6futline-none \x70laceholder:\x74ext-primary-foreground/\x350"} required placeholder="Your email address" aria-label="Email address" type="email" defaultValue="" />
          <button className="px-2 text-sm tracking-widest hover:text-terracotta" type="submit">SUBSCRIBE</button>
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
          <a aria-current="page" href="/shop">Shop All</a>
        </div>
        <div className={"flex flex-col gap-2 text-sm \x74ext-primary-foreground/\x375"}>
          <p className="mb-2 text-xs tracking-[0.2em] text-primary-foreground">SUPPORT</p>
          <a href="/contact">Contact Us</a>
          <a href="/about">About Us</a>
          <a href="/cart">Shopping Bag</a>
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
