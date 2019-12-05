<script>
  export let params;
  import CollectionIcon from "./CollectionIcon.svelte";
  import { collections } from "./stores.js";
  let col;
  collections.subscribe(values => {
    col = values.filter(el => el.permalink != "frontpage");
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
      <CollectionIcon
        highlight={permalink == params.permalink}
        {title}
        {permalink}
        images={products[0].images[0]} />
    {/each}
  </ul>
</nav>
