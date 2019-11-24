// import { wrap } from "svelte-spa-router";

import Collections from "./Collections.svelte";
import CollectionRoute from "./CollectionRoute.svelte";
import Checkout from "./Checkout.svelte";

const routes = new Map();

routes.set("/", Collections);
routes.set("/collection/:permalink", CollectionRoute);
routes.set("/checkout", Checkout);

export default routes;
