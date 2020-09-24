import { fetchPayment } from "../fetchers.js";

export async function get(req, res, next) {
  return fetchPayment()
    .then((json) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(json));
    })
    .catch((error) => {
      console.log(error);
      next();
    });
}
