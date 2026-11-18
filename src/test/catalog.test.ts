import { describe, expect, it } from "vitest";
import { getProduct, products } from "../lib/catalog";

describe("product catalog", () => {
  it("keeps product ids and photography unique", () => {
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
    expect(new Set(products.map((product) => product.image)).size).toBe(products.length);
  });

  it("uses valid local product images and known categories", () => {
    for (const product of products) {
      expect(product.image).toMatch(/^\/site-assets\/.+\.webp$/);
      expect(["Men", "Women"]).toContain(product.category);
      expect(product.price).toBeGreaterThan(0);
    }
  });

  it("looks up products by their route id", () => {
    expect(getProduct("womens-kurti")?.category).toBe("Women");
    expect(getProduct("not-a-product")).toBeUndefined();
  });
});
