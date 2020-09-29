<script context="module">
  export async function preload({ params }) {
    return { ...params };
  }
</script>

<script>
  export let collectionSlug = "frontpage",
    productSlug;
  import Product from "../../../../components/Product.svelte";
  import { collections } from "../../../../stores.js";
  import * as sapper from "@sapper/app";

  let prefetchImage = function (url) {
    sapper.prefetch(url);
  };
  let collection =
    $collections.find((col) => col.permalink == collectionSlug) || {};

  let products = collection.products || [];
  let baseURL = `collection/${collection.permalink}/`;
  let previousURL, nextURL;
  let currentProduct;

  let productCounter = 0;

  $: if (currentProduct) {
    productCounter = collection.products.findIndex(
      (c) => c.id === currentProduct.id
    );
  }

  $: productMap = new Map(collection.products.map((i) => [i.permalink, i]));

  $: if (products.length) {
    currentProduct = productSlug ? productMap.get(productSlug) : products[0];
  }

  $: if (productCounter == products.length - 1) {
    nextURL = baseURL + products[0].permalink;
  } else {
    nextURL = baseURL + products[productCounter + 1].permalink;
  }

  $: if (productCounter == 0) {
    previousURL = baseURL + products[products.length - 1].permalink;
  } else {
    previousURL = baseURL + products[productCounter - 1].permalink;
  }

  $: if (nextURL) {
    prefetchImage(nextURL);
  }
</script>

<Product
  {currentProduct}
  {nextURL}
  {previousURL}
  {productCounter}
  {collectionSlug}
  collectionLength={products.length} />
