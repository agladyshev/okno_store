<script context="module">
  export async function preload({ params }) {
    // return { ...params };
    let { collectionSlug } = params;
    return { collectionSlug };
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
