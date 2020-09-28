import { fetchProducts } from "../fetchers.js";
import { filterProducts } from "../utils.js";
import inSalesCache from "../cache.js";

export async function get(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let cached = inSalesCache.get("products");
  if (cached) {
    return res.end(JSON.stringify(cached));
  }
  let products = await fetchProducts();
  if (products) {
    let filtered = products.filter(filterProducts);
    inSalesCache.set("products", filtered, process.env.CACHE_PRODUCTS || 5);
    res.end(JSON.stringify(filtered));
  } else {
    next();
  }
}
