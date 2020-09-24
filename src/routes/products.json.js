import { fetchProducts } from "../fetchers.js";
import { filterProducts } from "../utils.js";

export async function get(req, res, next) {
  let products = await fetchProducts();
  if (products) {
    let filtered = products.filter(filterProducts);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(filtered));
  } else {
    next();
  }
}
