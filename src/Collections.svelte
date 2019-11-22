<script>
  // import "dragscroll.js";
  import CollectionIcon from "./CollectionIcon.svelte";
  import { collections } from "./stores.js";
  let collectionsArray;
  collections.subscribe(object => {
    collectionsArray = Object.values(object);
  });
  // let collections = getContext("collections");
  // console.log(collections);
</script>

<style>
  ul {
    display: flex;
    /* justify-content: space-evenly; */
    /* flex-wrap: wrap; */
    overflow-x: scroll;
    /* overflow: hidden; */
    /* cursor: grab; */
    padding: 0.5rem 0 0 0;
    margin: 0 0 0 0;
  }
</style>

<ul class="draggable">
  {#each collectionsArray as { id, title, products }}
    <CollectionIcon {title} images={products[0].images[0]} />
  {/each}
</ul>
