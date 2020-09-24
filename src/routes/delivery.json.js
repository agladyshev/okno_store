import { fetchDelivery } from "../fetchers.js";

export async function get(req, res, next) {
  return fetchDelivery()
    .then((json) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(json));
    })
    .catch((error) => {
      console.log(error);
      next();
    });
}
