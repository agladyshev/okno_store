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
  import CollectionsPanel from "../../../../components/CollectionsPanel.svelte";
  $: collection =
    $collections.find((col) => col.permalink == collectionSlug) || {};
</script>

<style>
  main {
    grid-area: main;
    scrollbar-width: none;
  }
</style>

<main>
  <CollectionsPanel collection={collectionSlug} />
  <Collection {collection} {productSlug} />
</main>
