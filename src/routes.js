// import { wrap } from "svelte-spa-router";

import Collections from "./Collections.svelte";
import Collection from "./Collection.svelte";
import Checkout from "./Checkout.svelte";

const routes = new Map();

routes.set("/", Collections);
routes.set("/collection/:title", Collection);
routes.set("/checkout", Checkout);

export default routes;
