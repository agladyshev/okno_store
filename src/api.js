export const getCollections = function() {
  return fetch(`/getCollections`).then(res => {
    return res.json();
  });
};

export const getProducts = function() {
  return fetch(`/getProducts`).then(res => {
    return res.json();
  });
};
export const getDelivery = function() {
  return fetch(`/getDelivery`).then(res => {
    return res.json();
  });
};

export const getPayment = function() {
  return fetch(`/getPayment`).then(res => {
    return res.json();
  });
};

export const getPromo = function() {
  return fetch(`/getPromo`).then(res => {
    return res.json();
  });
};

export const addOrder = function(body) {
  return fetch("/addOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(res => res.json());
};
