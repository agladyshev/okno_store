import { writable } from "svelte/store";

export const collections = writable({});
export const collectionsArray = writable([]);
// export const basket = writable(
//   new Set(JSON.parse(localStorage.getItem("basket") || "[]"))
// );
export const basket = writable(new Map());
export const deliveryVariants = writable([]);
export const paymentGateways = writable([]);
