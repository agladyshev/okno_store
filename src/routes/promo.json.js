import { fetchArticles } from "../fetchers.js";

export async function get(req, res, next) {
  const articles = await fetchArticles();
  if (articles) {
    let promo = articles.find((article) => article.pinned);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(promo));
  } else {
    next();
  }
}
