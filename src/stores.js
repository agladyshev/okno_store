import { writable } from "svelte/store";

export const productsRaw = writable([]);

export const collectionsRaw = writable([]);

export const collections = writable({});

export const basket = writable({});

export const orders = writable({});

export const deliveryVariants = writable([]);
export const paymentGateways = writable([]);
