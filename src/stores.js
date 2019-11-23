import { writable } from "svelte/store";

export const collections = writable({});
export const basket = writable(new Set([]));
