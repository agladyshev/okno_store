<script context="module">
  export async function preload({ params }) {
    return { ...params };
  }
</script>

<script>
  export let collectionSlug = "frontpage";
  import CollectionsPanel from "../../../../components/CollectionsPanel.svelte";
</script>

<style>
  main {
    grid-area: main;
    scrollbar-width: none;
  }
</style>

<main>
  <CollectionsPanel collection={collectionSlug} />
  <slot />
</main>
