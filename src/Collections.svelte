<script>
  // import "dragscroll.js";
  import CollectionIcon from "./CollectionIcon.svelte";
  import Collection from "./Collection.svelte";
  import { collections } from "./stores.js";
  const MAIN_URL = "12088934";
  let collectionsArray, collectionMain, collectionsRest;
  collections.subscribe(object => {
    console.log(object);
    ({ [MAIN_URL]: collectionMain, ...collectionsRest } = object);
    collectionsArray = Object.values(collectionsRest);
    console.log(collectionsRest);
    console.log(collectionMain);
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

<ul class="draggable">
  {#each collectionsArray as { id, title, products }}
    <CollectionIcon {title} images={products[0].images[0]} />
  {/each}
</ul>

<Collection collection={collectionMain} />
