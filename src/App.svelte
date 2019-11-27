<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";

  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Promo from "./Promo.svelte";
  // import Collections from "./Collections.svelte";
  import Footer from "./Footer.svelte";
  import Legal from "./Legal.svelte";

  import Collection from "./Collection.svelte";

  import {
    collections,
    collectionsArray,
    deliveryVariants,
    paymentGateways,
    basket
  } from "./stores.js";

  const BASE_URL = "http://localhost:3000";

  $: {
    basket.subscribe(basket => {
      localStorage.setItem("basket", JSON.stringify(Array.from(basket)));
    });
  }

  const arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {});

  const getCollections = function() {
    return fetch(`${BASE_URL}/getCollections`).then(res => {
      return res.json();
    });
  };

  const getProducts = function() {
    return fetch(`${BASE_URL}/getProducts`).then(res => {
      return res.json();
    });
  };
  const getDelivery = function() {
    return fetch(`${BASE_URL}/getDelivery`).then(res => {
      return res.json();
    });
  };

  const getPayment = function() {
    return fetch(`${BASE_URL}/getPayment`).then(res => {
      return res.json();
    });
  };

  const populateCollections = function(collections, products) {
    return products.reduce((obj, product) => {
      let ids = product.collections_ids;
      for (let id of ids) {
        obj[id].products.push(product);
      }
      return obj;
    }, arrayToObject(collections, "id"));
  };

  const filterEmptyCollections = function(col) {
    return col.products.length;
  };

  onMount(async () => {
    Promise.all([getCollections(), getProducts()])
      .then(res => {
        let [col, products] = res;
        return populateCollections(col, products);
      })
      .then(col => collections.set(col));
    // .then(col => Object.values(col))
    // .then(col => col.filter(filterEmptyCollections))
    // .then(res => collectionsArray.set(res));

    getDelivery().then(variants => {
      deliveryVariants.set(variants);
    });
    getPayment().then(gatweays => {
      paymentGateways.set(gatweays);
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
