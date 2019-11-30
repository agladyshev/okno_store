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
    /* flex-shrink: 0; */
    display: flex;

    /* justify-content: center; */
    justify-content: safe center;
    /* flex-wrap: wrap; */
    overflow: auto;
    /* overflow: hidden; */
    /* cursor: grab; */
    /* padding-left: 1rem; */
    padding: 0 0 0 0;
    /* padding: 0; */
    margin: 0;
    /* float: left; */

    /* height: 5rem; */
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
