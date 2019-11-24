import CollectionRoute from "./Routes/CollectionRoute.svelte";
import HomeRoute from "./Routes/HomeRoute.svelte";
import Checkout from "./Checkout.svelte";

const routes = new Map();

routes.set("/", HomeRoute);
routes.set("/collection/:permalink", CollectionRoute);
routes.set("/checkout", Checkout);

export default routes;
