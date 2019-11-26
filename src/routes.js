import CollectionRoute from "./Routes/CollectionRoute.svelte";
import HomeRoute from "./Routes/HomeRoute.svelte";
import Checkout from "./Routes/CheckoutRoute.svelte";

const routes = new Map();

routes.set("/", HomeRoute);
routes.set("/collection/:permalink", CollectionRoute);
routes.set("/checkout", Checkout);

export default routes;
