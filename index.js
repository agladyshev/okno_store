require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// const cors = require("cors");

// const whitelist = [
//   "http://winxdow.ru",
//   "http://okno.com.ru",
//   "http://okno.store",
//   "http://okno.herokuapp.com",
//   "https://winxdow.ru",
//   "https://okno.com.ru",
//   "https://okno.store",
//   "https://okno.herokuapp.com",
//   "http://localhost:5000"
// ];

// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

let baseURL = `https://${process.env.INSALES_KEY}:${process.env.INSALES_PASSWORD}@${process.env.INSALES_HOSTNAME}`;

// app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  next();
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://okno.herokuapp.com/");
//   res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
//  next();
// });

app.use("/", express.static("public"));

var filterEmptyProducts = function(product) {
  return product.available && !product.is_hidden && product.images.length;
};

var addProductsArray = function(collection) {
  collection.products = [];
  return collection;
};

var getCollections = function(req, res, next) {
  fetch(new URL("/admin/collections.json", baseURL))
    .then(res => res.json())
    .then(json => {
      // Check if collection is not hidden
      // Remove parent collection
      return json.filter(
        collection => !(collection.is_hidden || collection.position == 0)
      );
    })
    .then(collections => {
      res.collections = collections.map(addProductsArray);
      next();
    })
    .catch(error => console.log(error));
};

var fetchProducts = function() {
  return fetch(new URL("/admin/products.json", baseURL))
    .then(res => res.json())
    .then(json => json.filter(filterEmptyProducts))
    .catch(error => console.log(error));
};

var getProducts = function(req, res, next) {
  fetch(new URL("/admin/products.json", baseURL))
    .then(res => res.json())
    .then(json => json.filter(filterEmptyProducts))
    .then(filtered => {
      res.products = filtered;
      next();
    })
    .catch(error => console.log(error));
};

var checkAvailability = function(req, res, next) {
  let { ids } = req.body;
  fetchProducts()
    .then(available => {
      return ids.filter(id => {
        return !available.find(item => item.id == id);
      });
    })
    .then(notAvailable => {
      if (notAvailable.length) {
        res.send({ status: "missing_items", items: notAvailable });
      } else {
        next();
      }
    });
};

var getDelivery = function(req, res, next) {
  fetch(new URL("/admin/delivery_variants.json", baseURL))
    .then(res => res.json())
    .then(json => {
      res.delivery = json;
      next();
    })
    .catch(error => console.log(error));
};

var getPayment = function(req, res, next) {
  fetch(new URL("/admin/payment_gateways.json", baseURL))
    .then(res => res.json())
    .then(json => {
      res.payment = json;
      next();
    })
    .catch(error => console.log(error));
};

var getPromo = function(req, res, next) {
  fetch(new URL("/admin/articles.json", baseURL))
    .then(res => res.json())
    .then(json => {
      res.promo = json.find(article => article.pinned);
      next();
    })
    .catch(error => console.log(error));
};

var addOrder = function(req, res, next) {
  let {
    products,
    name,
    // email = "",
    phone,
    address,
    deliveryOption = "2217458",
    paymentOption = "968309"
  } = req.body;

  const body = {
    order: {
      order_lines_attributes: products,
      client: {
        name: name,
        // email: email,
        phone: phone
      },
      shipping_address_attributes: {
        address: address
      },
      delivery_variant_id: deliveryOption,
      payment_gateway_id: paymentOption
    }
  };
  fetch(
    "http://08dc48a4dbcd3a4e4b1ede809fe9e676:4172a97218461e722ed8fba3bb8f866d@myshop-yq315.myinsales.ru/admin/orders.json",
    {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
  )
    .then(result => result.json())
    .then(order => {
      res.order = order;
      next();
    });
  // .catch(error => {
  //   res.json = error;
  //   next();
  // });
};

app.use("/", express.static("public"));

app.get("/getCollections", getCollections, function(req, res, next) {
  res.send(res.collections);
});

app.get("/getProducts", getProducts, function(req, res, next) {
  res.send(res.products);
});

app.get("/getDelivery", getDelivery, function(req, res, next) {
  res.send(res.delivery);
});

app.get("/getPayment", getPayment, function(req, res, next) {
  res.send(res.payment);
});

app.get("/getPromo", getPromo, function(req, res, next) {
  res.send(res.promo);
});

app.post("/addOrder", express.json(), checkAvailability, addOrder, function(
  req,
  res,
  next
) {
  res.send(res.order);
});

app.listen(port, () => console.log(`Listening`));
