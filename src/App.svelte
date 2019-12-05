<script>
  import Router from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import routes from "./routes";

  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Promo from "./Promo.svelte";
  import Footer from "./Footer.svelte";

  import Collection from "./Collection.svelte";

  import {
    collectionsRaw,
    productsRaw,
    collections,
    deliveryVariants,
    paymentGateways,
    basket,
    orders
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
    orders.subscribe(orders => {
      localStorage.setItem("orders", JSON.stringify(Array.from(orders)));
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
    max-width: 768px;
    margin: auto;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 4rem 1.5rem calc(100vh - 7.7rem) 2rem;
    grid-template-areas:
      "header"
      "promo"
      "main"
      "footer";
  }

  main {
    grid-area: main;
    /* overflow-y: scroll; */
    overflow: auto;
    /* display: flex; */
    /* flex-direction: column; */
  }

  /* @media (min-width: 640px) { */
  /* main { */
  /* max-width: none; */
  /* } */
  /* } */
</style>

<div class="wrapper">
  <Header />
  <Promo />
  {#if col.length && prod.length}
    <main transition:fade>
      <Router {routes} />
    </main>
  {/if}
  <Footer />
</div>
