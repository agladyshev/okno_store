import { fetchArticles } from "../fetchers.js";
export async function get(req, res, next) {
  return fetchArticles()
    .then((json) => {
      let contacts = json.reduce(function (result, item) {
        result[item.title] = item.content.replace(/<[^>]*>?/gm, "");
        return result;
      }, {});
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(contacts));
    })
    .catch((error) => {
      console.log(error);
      next();
    });
}
