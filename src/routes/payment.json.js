import { fetchPayment } from "../fetchers.js";
import inSalesCache from "../cache.js";

export async function get(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let cached = inSalesCache.get("payment");
  if (cached) {
    return res.end(JSON.stringify(cached));
  }
  return fetchPayment()
    .then((payment) => {
      inSalesCache.set("payment", payment, process.env.CACHE_PAYMENT || 600);
      res.end(JSON.stringify(payment));
    })
    .catch((error) => {
      console.log(error);
      next();
    });
}
