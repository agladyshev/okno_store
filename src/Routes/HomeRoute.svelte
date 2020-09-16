<script>
  import { fade } from "svelte/transition";
  export let params;
  import CollectionsPanel from "../Components/CollectionsPanel.svelte";
  import Collection from "../Components/Collection.svelte";
  import { collections } from "../stores.js";
  let collectionMain;
  collections.subscribe((values) => {
    collectionMain = values.find((el) => el.permalink == "frontpage");
  });
</script>

<style>
  main {
    grid-area: main;
    /* overflow-x: scroll; */
    scrollbar-width: none;
  }
</style>

<main transition:fade>
  <CollectionsPanel {params} />
  <Collection collection={collectionMain} />
</main>
