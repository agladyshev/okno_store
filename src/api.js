const BASE_URL = "http://localhost:3000";

export const getCollections = function() {
  return fetch(`${BASE_URL}/getCollections`).then(res => {
    return res.json();
  });
};

export const getProducts = function() {
  return fetch(`${BASE_URL}/getProducts`).then(res => {
    return res.json();
  });
};
export const getDelivery = function() {
  return fetch(`${BASE_URL}/getDelivery`).then(res => {
    return res.json();
  });
};

export const getPayment = function() {
  return fetch(`${BASE_URL}/getPayment`).then(res => {
    return res.json();
  });
};

export const getPromo = function() {
  return fetch(`${BASE_URL}/getPromo`).then(res => {
    return res.json();
  });
};
