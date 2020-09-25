import { writable } from "svelte/store";

export const productsRaw = writable([]);

export const collectionsRaw = writable([]);

export const collections = writable({});

export const basket = writable(
  typeof window !== "undefined" &&
    new Number(JSON.parse(localStorage.getItem("version"))) >= 1.1
    ? new Map(JSON.parse(localStorage.getItem("basket")))
    : new Map()
);

export const orders = writable(
  typeof window !== "undefined"
    ? new Map(JSON.parse(localStorage.getItem("orders")))
    : new Map()
);

export const deliveryVariants = writable([]);
export const paymentGateways = writable([]);
