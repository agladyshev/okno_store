<script>
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import Promo from "../components/Promo.svelte";
  import Footer from "../components/Footer.svelte";

  import {
    collectionsRaw,
    productsRaw,
    collections,
    deliveryVariants,
    paymentGateways,
    basket,
    orders,
  } from "../stores.js";

  import {
    getCollections,
    getProducts,
    getDelivery,
    getPayment,
  } from "../api.js";

  import { deleteSoldVariants } from "../storeHelpers.js";
  import { populateCollections } from "../helpers.js";

  onMount(async () => {
    //Fetch inSales data and populate svelte stores
    getCollections().then((value) => {
      collectionsRaw.set(value);
    });
    getProducts()
      .then((value) => {
        productsRaw.set(value);
      })
      .then(() => deleteSoldVariants());
    getDelivery().then((value) => {
      deliveryVariants.set(value);
    });
    getPayment().then((value) => {
      paymentGateways.set(value);
    });
    localStorage.setItem("version", JSON.stringify(1.1));
  });

  $: {
    collections.set(populateCollections($collectionsRaw, $productsRaw));
  }

  $: if (typeof window !== "undefined") {
    localStorage.setItem("basket", JSON.stringify(Array.from($basket)));
    localStorage.setItem("orders", JSON.stringify(Array.from($orders)));
  }
</script>

<style>
  .wrapper {
    min-height: 100%;
    max-width: 768px;
    margin: auto;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 4rem auto 1fr 2rem;
    grid-template-areas:
      "header"
      "promo"
      "main"
      "footer";
  }
</style>

<div class="wrapper">
  <Header />
  <Promo />
  {#if $collectionsRaw.length && $productsRaw.length}
    <slot />
  {/if}
  <Footer />
</div>
