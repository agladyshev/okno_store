import { fetchCollections } from "../fetchers.js";
import { addProductsPositions, filterCollections } from "../utils.js";

export async function get(req, res, next) {
  return fetchCollections()
    .then((collections) => {
      return Promise.all(collections.map(addProductsPositions));
    })
    .then((collections) => collections.filter(filterCollections))
    .then((collections) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(collections));
    })
    .catch((error) => {
      console.log(error);
      next();
    });
}
