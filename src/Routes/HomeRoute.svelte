<script>
  export let params = {};
  import { fade } from "svelte/transition";
  import CollectionsPanel from "../Components/CollectionsPanel.svelte";
  import Collection from "../Components/Collection.svelte";
  import { collections } from "../stores.js";
  let collectionMain = $collections.find((el) => el.permalink == "frontpage");
</script>

<style>
  main {
    grid-area: main;
    scrollbar-width: none;
  }
</style>

<main transition:fade>
  <CollectionsPanel {params} />
  <Collection collection={collectionMain} />
</main>
