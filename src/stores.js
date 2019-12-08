import { writable } from "svelte/store";

export const productsRaw = writable([]);

export const collectionsRaw = writable([]);

export const collections = writable({});

export const basket = writable(
  new Map(JSON.parse(localStorage.getItem("basket")))
);

export const orders = writable(
  new Map(JSON.parse(localStorage.getItem("orders")))
);

export const deliveryVariants = writable([]);
export const paymentGateways = writable([]);
