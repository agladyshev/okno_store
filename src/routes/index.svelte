<script>
  import { fade } from "svelte/transition";
  import CollectionsPanel from "../components/CollectionsPanel.svelte";
  import Collection from "../components/Collection.svelte";
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
  <CollectionsPanel />
  <Collection collection={collectionMain} />
</main>
