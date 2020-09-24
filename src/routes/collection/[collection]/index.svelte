<script context="module">
  export async function preload({ params }) {
    let permalink = params.collection;
    return { permalink };
  }
</script>

<script>
  export let permalink;
  import Collection from "../../../components/Collection.svelte";
  import { collections } from "../../../stores.js";
  import CollectionsPanel from "../../../components/CollectionsPanel.svelte";
  $: collection = $collections.find((col) => col.permalink == permalink) || {};
</script>

<style>
  main {
    grid-area: main;
    scrollbar-width: none;
  }
</style>

<main>
  <CollectionsPanel collection={permalink} />
  <Collection {collection} />
</main>
