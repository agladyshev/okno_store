import CollectionRoute from "./Routes/CollectionRoute.svelte";
import HomeRoute from "./Routes/HomeRoute.svelte";
import Checkout from "./Routes/CheckoutRoute.svelte";
import Basket from "./Routes/BasketRoute.svelte";

const routes = new Map();

routes.set("/", HomeRoute);
routes.set("/collection/:permalink", CollectionRoute);
routes.set("/basket", Basket);
routes.set("/checkout", Checkout);

export default routes;
