const fetch = require("node-fetch");
fetch(
  new URL(
    "http://08dc48a4dbcd3a4e4b1ede809fe9e676:4172a97218461e722ed8fba3bb8f866d@myshop-yq315.myinsales.ru/admin/articles.json"
  ),
  {
    method: "GET"
    // headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic' },
    // body: {
    //     "order": {
    //         "order_lines_attributes": [
    //             {
    //                 "variant_id": 277527836,
    //                 "quantity": 1
    //             }
    //         ],
    //         "client": {
    //             "name": "Vasya",
    //             "email": "vasya@example.com",
    //             "phone": "79111112233"
    //         },
    //         "shipping_address_attributes": {
    //             "address": "Moscow, Krasnaya Presna 24"
    //         },
    //         "delivery_variant_id": 1,
    //         "payment_gateway_id": 1,
    //         "coupon": "20% discount"
    //     }
    // }
  }
)
  .then(res => res.json())
  .then(json => {
    console.log(json);
  })
  .catch(error => console.log(error));
