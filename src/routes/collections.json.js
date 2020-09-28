import { fetchCollections } from "../fetchers.js";
import { addProductsPositions, filterCollections } from "../utils.js";
import inSalesCache from "../cache.js";

export async function get(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let cached = inSalesCache.get("collections");
  if (cached) {
    return res.end(JSON.stringify(cached));
  }
  return (
    inSalesCache.get("collections") ||
    fetchCollections()
      .then((collections) => {
        return Promise.all(collections.map(addProductsPositions));
      })
      .then((collections) => collections.filter(filterCollections))
      .then((collections) => {
        inSalesCache.set(
          "collections",
          collections,
          process.env.CACHE_COLLECTIONS || 5
        );
        res.end(JSON.stringify(collections));
      })
      .catch((error) => {
        console.log(error);
        next();
      })
  );
}
