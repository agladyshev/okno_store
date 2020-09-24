import { fetchDelivery, fetchPayment, postOrder } from "../fetchers.js";

// import { get as checkAvailability } from "./checkAvailability.json.js";

import { findMissingProducts } from "../utils.js";

// app.post("/addOrder", express.json(), checkAvailability, addOrder, function (
//   req,
//   res,
//   next
// ) {
//   if ((!res.order.status && !res.order.number) || res.order.status == "error") {
//     log.error(res.order);
//     res.status(500).json(res.order);
//   } else {
//     res.json(res.order);
//   }
// });

export async function post(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let {
    products,
    name,
    // email = "",
    ids,
    phone,
    address,
    deliveryOption = fetchDelivery()[0].id,
    paymentOption = fetchPayment()[0].id,
    coupon,
  } = req.body;
  let missing = await findMissingProducts(ids);
  if (missing.length) {
    res.end(JSON.stringify({ status: "missing_products", products: missing }));
  }
  const body = {
    order: {
      order_lines_attributes: products,
      client: {
        name: name,
        // email: email,
        phone: phone,
      },
      shipping_address_attributes: {
        address: address,
      },
      delivery_variant_id: deliveryOption,
      payment_gateway_id: paymentOption,
      coupon: coupon,
    },
  };
  return postOrder(body)
    .then((order) => {
      res.end(JSON.stringify(order));
    })
    .catch((error) => {
      res.end(JSON.stringify(error));
    });
}
