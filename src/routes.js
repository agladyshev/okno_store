// import { wrap } from "svelte-spa-router";

import Collections from "./Collections.svelte";
import Collection from "./Collection.svelte";

const routes = new Map();

routes.set("/", Collections);
routes.set("/collection/:title", Collection);

export default routes;
