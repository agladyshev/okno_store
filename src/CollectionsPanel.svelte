<script>
  // import "dragscroll.js";
  export let params;
  import CollectionIcon from "./CollectionIcon.svelte";
  import { collectionsArray } from "./stores.js";
  let collections;
  collectionsArray.subscribe(values => {
    collections = values.filter(el => el.permalink != "frontpage");
  });
</script>

<style>
  ul {
    flex-shrink: 0;
    display: flex;
    /* justify-content: space-evenly; */
    /* flex-wrap: wrap; */
    overflow-x: scroll;
    /* overflow: hidden; */
    /* cursor: grab; */
    padding: 0;
    margin: 0;
  }
</style>

<nav>
  <ul class="draggable">
    {#each collections as { id, title, products, permalink }}
      <CollectionIcon
        highlight={permalink == params.permalink}
        {title}
        {permalink}
        images={products[0].images[0]} />
    {/each}
  </ul>
</nav>
