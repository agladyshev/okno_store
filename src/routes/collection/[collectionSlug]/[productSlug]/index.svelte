<script context="module">
  export async function preload({ params }) {
    return { ...params };
  }
</script>

<script>
  export let collectionSlug = "frontpage",
    productSlug;
  import Collection from "../../../../components/Collection.svelte";
  import { collections } from "../../../../stores.js";

  $: collection =
    $collections.find((col) => col.permalink == collectionSlug) || {};
</script>

<Collection {collection} {productSlug} />
