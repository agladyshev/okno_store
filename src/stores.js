import { writable } from "svelte/store";

export const productsRaw = writable([]);

export const collectionsRaw = writable([]);

export const collections = writable({});

export const basket = writable(new Map());

export const orders = writable(new Map());

export const deliveryVariants = writable([]);
export const paymentGateways = writable([]);
