<script>
  export let params = {};
  import { fade } from "svelte/transition";
  import Collection from "../Components/Collection.svelte";
  import { collections } from "../stores.js";
  import CollectionsPanel from "../Components/CollectionsPanel.svelte";
  $: collection =
    $collections.find((col) => col.permalink == params.permalink) || {};
</script>

<style>
  main {
    grid-area: main;
    scrollbar-width: none;
  }
</style>

<main>
  <CollectionsPanel {params} />
  <Collection {collection} />
</main>
