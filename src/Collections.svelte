<script>
  import Collection from "./Collection.svelte";
  export let collections;
</script>

<style>
  ul {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0.5rem 0 0 0;
    /* padding: 0; */
    margin: 0;
    /* background-color: grey; */
  }
</style>

<ul>
  {#each Object.values(collections) as { id, title, products }}
    <Collection {title} images={products[0].images[0]} />
  {/each}
</ul>
