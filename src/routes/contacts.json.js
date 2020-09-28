import { fetchArticles } from "../fetchers.js";
import inSalesCache from "../cache.js";

export async function get(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let cached = inSalesCache.get("contacts");
  if (cached) {
    return res.end(JSON.stringify(cached));
  }
  return fetchArticles()
    .then((json) => {
      let contacts = json.reduce(function (result, item) {
        result[item.title] = item.content.replace(/<[^>]*>?/gm, "");
        return result;
      }, {});
      inSalesCache.set(
        "contacts",
        contacts,
        process.env.CACHE_CONTACTS || 3000
      );
      res.end(JSON.stringify(contacts));
    })
    .catch((error) => {
      console.log(error);
      next();
    });
}
