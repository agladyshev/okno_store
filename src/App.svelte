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

  localStorage.setItem("version", JSON.stringify(1.0));

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
    /* height: 100vh; */
    min-height: 100vh;
    margin: auto;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 4rem auto 1fr 2rem;
    grid-template-areas:
      "header"
      "promo"
      "main"
      "footer";
    overflow-y: scroll;
  }

  main {
    grid-area: main;
    /* overflow-y: scroll; */
    overflow-x: scroll;
    scrollbar-width: none;

    /* display: flex; */
    /* flex-direction: column; */
  }
  main::-webkit-scrollbar {
    display: none;
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
