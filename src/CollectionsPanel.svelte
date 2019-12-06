<script>
  export let params;
  import CollectionIcon from "./CollectionIcon.svelte";
  import { collections } from "./stores.js";
  let col;
  function isMainPage(value) {
    if (value) {
      return value.permalink != "frontpage";
    }
    return false;
  }
  collections.subscribe(values => {
    if (values) {
      col = values.filter(isMainPage);
    }
  });
</script>

<style>
  ul {
    display: flex;
    overflow: auto;
    padding: 0 0 0 0;
    margin: 0;
  }
  @media screen and (min-width: 480px) {
    ul {
      justify-content: safe center;
    }
  }
</style>

<nav>
  <ul>
    {#each col as { id, title, products, permalink }}
      {#if products[0].images}
        <CollectionIcon
          highlight={permalink == params.permalink}
          {title}
          {permalink}
          images={products[0].images[0]} />
      {/if}
    {/each}
  </ul>
</nav>
