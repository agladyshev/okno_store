import { fetchDiscounts } from "../fetchers.js";

export async function post(req, res, next) {
  let { code = "", orderSum = 0 } = req.body;
  console.log(code);
  res.setHeader("Content-Type", "application/json");
  if (!code) {
    return fetchDiscounts()
      .then((discounts) => {
        // res.discount = false;
        if (discounts.length) {
          discounts.forEach((discount) => {
            if (
              !discount.disabled &&
              ((discount.worked && discount.act_once) || !discount.act_once) &&
              ((Date.now() - Date.parse(discount.expired_at)) / 3600000 <= 24 ||
                !discount.expired_at)
            ) {
              res.end(JSON.stringify({ discount: true }));
            }
          });
          res.end(JSON.stringify({ discount: false }));
        } else {
          res.end(JSON.stringify({ discount: false }));
        }
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  } else {
    return fetchDiscounts()
      .then((discounts) => {
        let discount = discounts.find((d) => d.code == code);
        if (discount) {
          if (discount.disabled || (!discount.worked && discount.act_once)) {
            // res.discount = { status: "disabled" };
            res.end(JSON.stringify({ status: "disabled" }));
            // next();
          } else if (
            // if there is no expiration, still works
            (Date.now() - Date.parse(discount.expired_at)) / 3600000 >
            24
          ) {
            // res.discount = { status: "expired" };
            // next();
            res.end(JSON.stringify({ status: "expired" }));
          } else if (orderSum < discount.min_price) {
            // res.discount = { status: "low_sum", min_price: discount.min_price };
            res.end(
              JSON.stringify({
                status: "low_sum",
                min_price: discount.min_price,
              })
            );
            // next();
          } else {
            discount.status = "success";
            // res.discount = discount;
            res.end(JSON.stringify(discount));
          }
        } else {
          res.end(JSON.stringify({ status: "not_found" }));
          // next();
        }
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  }
}
