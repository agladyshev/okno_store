import {
  fetchCollections,
  fetchDelivery,
  fetchPromo,
  fetchPayment,
  postOrder,
  fetchProducts,
  fetchDiscounts,
} from "./fetchers.js";
import {
  addProductsPositions,
  filterProducts,
  filterCollections,
  findMissingProducts,
} from "./helpers.js";

export const getCollections = function (req, res, next) {
  fetchCollections()
    .then((collections) => {
      return Promise.all(collections.map(addProductsPositions));
    })
    .then((collections) => collections.filter(filterCollections))
    .then((collections) => {
      res.collections = collections;
      next();
    })
    .catch((error) => console.log(error));
};

export const getProducts = function (req, res, next) {
  fetchProducts()
    .then((json) => json.filter(filterProducts))
    .then((filtered) => {
      res.products = filtered;
      next();
    })
    .catch((error) => console.log(error));
};

export const checkAvailability = function (req, res, next) {
  // check every product id in the basket
  // return only those which are unavailable for purchase
  let { ids } = req.body;
  findMissingProducts(ids)
    .then((missing) => {
      if (missing.length) {
        res.send({ status: "missing_products", products: missing });
      } else {
        next();
      }
    })
    .catch((error) => console.log(error));
};

export const getDelivery = function (req, res, next) {
  fetchDelivery()
    .then((json) => {
      res.delivery = json;
      next();
    })
    .catch((error) => console.log(error));
};

export const getPayment = function (req, res, next) {
  fetchPayment()
    .then((json) => {
      res.payment = json;
      next();
    })
    .catch((error) => console.log(error));
};

export const getPromo = function (req, res, next) {
  fetchPromo()
    .then((json) => {
      res.promo = json.find((article) => article.pinned) || {
        pinned: true,
        content: "",
      };
      next();
    })
    .catch((error) => console.log(error));
};

export const checkDiscount = function (req, res, next) {
  let { code } = req.body;
  fetchDiscounts()
    .then((discounts) => {
      let discount = discounts.find((d) => d.code == code);
      if (discount) {
        if (discount.disabled) {
          res.discount = { status: "disabled" };
          next();
        } else if (
          (Date.now() - Date.parse(discount.expired_at)) / 3600000 >
          24
        ) {
          res.discount = { status: "expired" };
          next();
        } else {
          res.discount = { status: "success", discount: discount.discount };
          next();
        }
      } else {
        res.discount = { status: "not_found" };
        next();
      }
    })
    .catch((error) => console.log(error));
};

export const addOrder = function (req, res, next) {
  let {
    products,
    name,
    // email = "",
    phone,
    address,
    deliveryOption = fetchDelivery()[0].id,
    paymentOption = fetchPayment()[0].id,
  } = req.body;

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
    },
  };
  postOrder(body).then((order) => {
    res.order = order;
    next();
  });
  // .catch(error => {
  //   res.json = error;
  //   next();
  // });
};
