export type Product = {
  id: string;
  name: string;
  category: "Men" | "Women";
  collection: string;
  description: string;
  image: string;
  price: number;
  sizes: string[];
  isNew?: boolean;
};

export const products: Product[] = [
  {
    id: "basic-cotton-t-shirt",
    name: "Basic Cotton T-shirt",
    category: "Men",
    collection: "T-shirts",
    description: "A soft, everyday cotton crew neck with an easy regular fit.",
    image: "/site-assets/4899989704d9089f.webp",
    price: 1450,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "printed-t-shirt",
    name: "Printed T-shirt",
    category: "Men",
    collection: "T-shirts",
    description: "A relaxed cotton tee with a subtle graphic for off-duty days.",
    image: "/site-assets/974e85bb9246b242.webp",
    price: 1650,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "mens-casual-shirt",
    name: "Men's Casual Shirt",
    category: "Men",
    collection: "Shirts",
    description: "A versatile button-down in a muted olive tone, made for easy layering.",
    image: "/site-assets/ef2665cd054b58de.webp",
    price: 2250,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "womens-kurti",
    name: "Women's Kurti",
    category: "Women",
    collection: "Kurtis",
    description: "A printed kurti with delicate detailing and a comfortable straight fit.",
    image: "/site-assets/f33506f12299a5c7.webp",
    price: 2000,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "denim-jeans",
    name: "Denim Jeans",
    category: "Men",
    collection: "Bottoms",
    description: "Classic mid-wash denim with a straight leg and everyday comfort.",
    image: "/site-assets/e6193cb68a917930.webp",
    price: 3000,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "summer-dress",
    name: "Summer Dress",
    category: "Women",
    collection: "Dresses",
    description: "A flowing printed dress with an easy silhouette for warm-weather plans.",
    image: "/site-assets/9af1c69c9d05d635.webp",
    price: 2750,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "hoodie",
    name: "Hoodie",
    category: "Men",
    collection: "Winter wear",
    description: "A soft brushed-fleece layer with a relaxed hooded fit.",
    image: "/site-assets/e8f11de533c644b1.webp",
    price: 3300,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "two-piece-suit",
    name: "Two-piece Suit",
    category: "Women",
    collection: "Suits",
    description: "A coordinated two-piece set designed for a polished, effortless look.",
    image: "/site-assets/688c4eca30d30a4a.webp",
    price: 3500,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: "winter-sweater",
    name: "Winter Sweater",
    category: "Men",
    collection: "Winter wear",
    description: "A warm knit crew neck that works on its own or under a jacket.",
    image: "/site-assets/f89303de3ffd37d1.webp",
    price: 2900,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "straight-trousers",
    name: "Straight Trousers",
    category: "Men",
    collection: "Bottoms",
    description: "Clean-cut straight trousers with a versatile, comfortable finish.",
    image: "/site-assets/870ea6b39cde3863.webp",
    price: 2100,
    sizes: ["S", "M", "L", "XL"],
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}
