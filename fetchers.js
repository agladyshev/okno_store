import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

let baseURL = `https://${process.env.INSALES_KEY}:${process.env.INSALES_PASSWORD}@${process.env.INSALES_HOSTNAME}`;

export const fetchCollections = function () {
  return fetch(new URL("/admin/collections.json?per_page=250", baseURL))
    .then((res) => res.json())
    .then((json) => {
      // Filter unused fields
      return json.map((obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            [
              "id",
              "is_hidden",
              "position",
              "sort_type",
              "title",
              "permalink",
              "products",
              "image",
            ].includes(key)
          )
        );
      });
    })
    .catch((error) => console.log(error));
};

export const fetchCollectionOrder = function (id) {
  return fetch(new URL(`/admin/collects.json?collection_id=${id}`, baseURL))
    .then((res) => res.json())
    .then((json) => {
      // Filter unused fields
      return json.map((obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            ["product_id", "position"].includes(key)
          )
        );
      });
    })
    .catch((error) => console.log(error));
};

export const fetchProductsPage = function (page) {
  return fetch(
    new URL("/admin/products.json?per_page=250&page=" + page, baseURL)
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const fetchProductsCount = function () {
  return fetch(new URL("/admin/products/count.json", baseURL)).then((res) =>
    res.json()
  );
};

export const fetchProducts = function () {
  return (
    fetchProductsCount()
      .then((res) => {
        return res.count;
      })
      // Making multiple fetches because of the pagination
      .then((count) => [...Array(Math.ceil(count / 250) + 1).keys()].slice(1))
      .then((pages) =>
        Promise.all(pages.map((page) => fetchProductsPage(page)))
      )
      .then((res) => [].concat(...res))

      .then((json) => {
        // Filter unused fields
        return json.map((obj) => {
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
                "variants",
              ].includes(key)
            )
          );
        });
      })
      .catch((error) => console.log(error))
  );
};

export const fetchDelivery = function () {
  return fetch(new URL("/admin/delivery_variants.json", baseURL))
    .then((res) => res.json())
    .then((json) => {
      // Filter unused fields
      return json.map((obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            [
              "id",
              "position",
              "title",
              "description",
              "price",
              "type",
            ].includes(key)
          )
        );
      });
    })
    .catch((error) => console.log(error));
};

export const fetchPayment = function () {
  return fetch(new URL("/admin/payment_gateways.json", baseURL))
    .then((res) => res.json())
    .then((json) => {
      // Filter unused fields
      return json.map((obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            ["id", "position", "title", "description"].includes(key)
          )
        );
      });
    })
    .catch((error) => console.log(error));
};

export const fetchArticles = function () {
  return fetch(new URL("/admin/articles.json", baseURL))
    .then((res) => res.json())
    .then((json) => {
      // Filter unused fields
      return json.map((obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            ["pinned", "content", "title"].includes(key)
          )
        );
      });
    })
    .catch((error) => console.log(error));
};

export const fetchDiscounts = function () {
  return fetch(new URL("/admin/discount_codes.json?per_page=250", baseURL))
    .then((res) => res.json())
    .then((json) => {
      // Filter unused fields
      return json.map((obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key]) =>
            [
              "code",
              "expired_at",
              "worked",
              "discount",
              "type_id",
              "disabled",
              "act_once",
              "min_price",
            ].includes(key)
          )
        );
      });
    })
    .catch((error) => console.log(error));
};

export const postOrder = function (body) {
  return fetch(new URL("/admin/orders.json", baseURL), {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((result) => result.json())
    .then((order) => {
      // Filter unused fields
      // return json.map(obj => {
      if (!order.number) {
        return order;
      } else {
        return Object.fromEntries(
          Object.entries(order).filter(([key]) => ["number"].includes(key))
        );
      }
    })
    .catch((error) => console.log(error));
};
