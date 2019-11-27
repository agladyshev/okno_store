import { writable, derived } from "svelte/store";

export const productsRaw = writable([]);

export const collectionsRaw = writable([]);

export const collections = writable({});

export const collectionsArray = derived(collections, $collections => {
  return Object.values($collections).filter(col => col.products.length);
});

export const basket = writable(
  new Map(JSON.parse(localStorage.getItem("basket")))
);

export const deliveryVariants = writable([]);
export const paymentGateways = writable([]);
