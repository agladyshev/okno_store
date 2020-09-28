import { fetchDelivery } from "../fetchers.js";
import inSalesCache from "../cache.js";

export async function get(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let cached = inSalesCache.get("delivery");
  if (cached) {
    return res.end(JSON.stringify(cached));
  }
  return fetchDelivery()
    .then((delivery) => {
      inSalesCache.set("delivery", delivery, process.env.CACHE_DELIVERY || 600);
      res.end(JSON.stringify(delivery));
    })
    .catch((error) => {
      console.log(error);
      next();
    });
}
