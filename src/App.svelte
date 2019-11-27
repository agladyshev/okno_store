<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";

  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Promo from "./Promo.svelte";
  import Footer from "./Footer.svelte";
  import Legal from "./Legal.svelte";

  import Collection from "./Collection.svelte";

  import {
    collectionsRaw,
    productsRaw,
    collections,
    collectionsArray,
    deliveryVariants,
    paymentGateways,
    basket
  } from "./stores.js";

  import {
    getCollections,
    getProducts,
    getDelivery,
    getPayment
  } from "./api.js";

  import {
    arrayToObject,
    populateCollections,
    filterEmptyCollections
  } from "./helpers.js";

  let col = [],
    prod = [];

  let test = {};

  $: {
    collectionsRaw.subscribe(c => {
      col = c;
    });
    productsRaw.subscribe(p => {
      prod = p;
    });

    collections.set(populateCollections(col, prod));

    basket.subscribe(basket => {
      localStorage.setItem("basket", JSON.stringify(Array.from(basket)));
    });
    collectionsArray.subscribe(v => {
      test = v;
    });
  }

  onMount(async () => {
    getCollections().then(value => {
      collectionsRaw.set(value);
    });
    getProducts().then(value => {
      productsRaw.set(value);
    });
    getDelivery().then(value => {
      deliveryVariants.set(value);
    });
    getPayment().then(value => {
      paymentGateways.set(value);
    });
  });
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 4rem 1.5rem calc(100vh - 7.5rem) 2rem;
    grid-template-areas:
      "header"
      "promo"
      "main"
      "footer";
  }

  main {
    grid-area: main;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<div class="wrapper">
  <Header />
  <Promo />
  <main>
    <Router {routes} />
    <Legal />
  </main>
  <Footer />
</div>
