export const getCollections = function () {
  return fetch(`/collections.json`).then((res) => res.json());
};

export const getProducts = function () {
  return fetch(`/products.json`).then((res) => res.json());
};
export const getDelivery = function () {
  return fetch(`/delivery.json`).then((res) => res.json());
};

export const getPayment = function () {
  return fetch(`/payment.json`).then((res) => res.json());
};

export const getPromo = function () {
  return fetch(`promo.json`).then((res) => res.json());
};

export const getContacts = function () {
  return fetch(`/contacts.json`).then((res) => res.json());
};

export const checkDiscount = function (body) {
  return fetch("/checkDiscount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const addOrder = function (body) {
  return fetch("/addOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
