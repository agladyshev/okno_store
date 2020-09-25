<script context="module">
  export async function preload({ params }) {
    return { ...params };
  }
</script>

<script>
  import * as sapper from "@sapper/app";
  import { collections } from "../../../stores.js";
  export let collectionSlug;
  let productSlug = $collections.find((col) => col.permalink == collectionSlug)
    .products[0].permalink;
  sapper.goto(`/collection/${collectionSlug}/${productSlug}`);
</script>
