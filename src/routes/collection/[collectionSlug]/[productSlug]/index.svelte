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

  // let prefetchImage = function (product) {
  //   console.log(nextProduct.images[0].original_url);
  //   let img = new Image();
  //   img.src = nextProduct.images[0].original_url;
  // };

  let collection =
    $collections.find((col) => col.permalink == collectionSlug) || {};

  let products = collection.products || [];
  let baseURL = `collection/${collection.permalink}/`;
  let previousURL, nextURL;
  let currentProduct;
  let previousProduct, nextProduct;

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
    nextProduct = products[0];
  } else {
    nextProduct = products[productCounter + 1];
  }

  $: if (productCounter == 0) {
    previousProduct = products[products.length - 1];
  } else {
    previousProduct = products[productCounter - 1];
  }

  $: nextURL = baseURL + nextProduct.permalink;
  $: previousURL = baseURL + previousProduct.permalink;

  // $: if (nextProduct) {
  //   prefetchImage(nextProduct);
  // }
</script>

<Product
  {currentProduct}
  {nextURL}
  {previousURL}
  {productCounter}
  {collectionSlug}
  collectionLength={products.length} />
