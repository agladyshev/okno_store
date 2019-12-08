import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

let baseURL = `https://${process.env.INSALES_KEY}:${process.env.INSALES_PASSWORD}@${process.env.INSALES_HOSTNAME}`;

export const fetchCollections = function() {
  return fetch(new URL("/admin/collections.json?per_page=1000", baseURL))
    .then(res => res.json())
    .then(json => {
      // Filter unused fields
      return json.map(obj => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            [
              "id",
              "is_hidden",
              "position",
              "sort_type",
              "title",
              "permalink",
              "products"
            ].includes(key)
          )
        );
      });
    })
    .catch(error => console.log(error));
};

export const fetchCollectionOrder = function(id) {
  return fetch(new URL(`/admin/collects.json?collection_id=${id}`, baseURL))
    .then(res => res.json())
    .then(json => {
      // Filter unused fields
      return json.map(obj => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            ["product_id", "position"].includes(key)
          )
        );
      });
    })
    .catch(error => console.log(error));
};

export const fetchProducts = function() {
  return fetch(new URL("/admin/products.json?per_page=1000", baseURL))
    .then(res => res.json())
    .then(json => {
      // Filter unused fields
      return json.map(obj => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            [
              "id",
              "created_at",
              "is_hidden",
              "available",
              "title",
              "permalink",
              "images",
              "option_names",
              "variants"
            ].includes(key)
          )
        );
      });
    })
    .catch(error => console.log(error));
};

export const fetchDelivery = function() {
  return fetch(new URL("/admin/delivery_variants.json", baseURL))
    .then(res => res.json())
    .then(json => {
      // Filter unused fields
      return json.map(obj => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            ["id", "position", "title", "description"].includes(key)
          )
        );
      });
    })
    .catch(error => console.log(error));
};

export const fetchPayment = function() {
  return fetch(new URL("/admin/payment_gateways.json", baseURL))
    .then(res => res.json())
    .then(json => {
      // Filter unused fields
      return json.map(obj => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            ["id", "position", "title", "description"].includes(key)
          )
        );
      });
    })
    .catch(error => console.log(error));
};

export const fetchPromo = function() {
  return fetch(new URL("/admin/articles.json", baseURL))
    .then(res => res.json())
    .then(json => {
      // Filter unused fields
      return json.map(obj => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            ["pinned", "content"].includes(key)
          )
        );
      });
    })
    .catch(error => console.log(error));
};

export const postOrder = function(body) {
  return fetch(new URL("/admin/orders.json", baseURL), {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(result => result.json())
    .then(json => {
      // Filter unused fields
      return json.map(obj => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) => ["number"].includes(key))
        );
      });
    })
    .catch(error => console.log(error));
};
