import { fetchArticles } from "../fetchers.js";
import inSalesCache from "../cache.js";

export async function get(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let cached = inSalesCache.get("promo");
  if (cached) {
    return res.end(JSON.stringify(cached));
  }
  const articles = await fetchArticles();
  if (articles) {
    let promo = articles.find((article) => article.pinned);
    inSalesCache.set("promo", promo, process.env.CACHE_PROMO || 300);
    res.end(JSON.stringify(promo));
  } else {
    next();
  }
}
