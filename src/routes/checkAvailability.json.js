import { findMissingProducts } from "../utils.js";

export async function get(req, res, next) {
  // check every product id in the basket
  // return only those which are unavailable for purchase
  let { ids } = req.body;
  res.setHeader("Content-Type", "application/json");
  return findMissingProducts(ids)
    .then((missing) => {
      if (missing.length) {
        res.end(
          JSON.stringify({ status: "missing_products", products: missing })
        );
      } else {
        res.end(JSON.stringify({}));
      }
    })
    .catch((error) => {
      console.log(error);
      next();
    });
}
