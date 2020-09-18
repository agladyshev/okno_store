<script>
  export let params = {};
  import { fade } from "svelte/transition";
  import Collection from "../Components/Collection.svelte";
  import { collections } from "../stores.js";
  import CollectionsPanel from "../Components/CollectionsPanel.svelte";
  let permalink;
  let collection = {};
  $: {
    permalink = params.permalink;
    collections.subscribe((values) => {
      collection = values.find((col) => col.permalink == permalink);
    });
  }
</script>

<style>
  main {
    grid-area: main;
    /* overflow-x: scroll; */
    scrollbar-width: none;
  }
</style>

<main>
  <CollectionsPanel {params} />
  <Collection {collection} />
</main>
