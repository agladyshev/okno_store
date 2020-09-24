<script>
  export let params;
  import CollectionIcon from "./CollectionIcon.svelte";
  import { collections } from "../stores.js";
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
    {#each $collections.filter((c) => c.permalink != 'frontpage') as { id, title, products, permalink, image }}
      {#if products[0].images}
        <CollectionIcon
          highlight={permalink == params.permalink}
          {title}
          {permalink}
          cover={image}
          images={products[0].images[0]} />
      {/if}
    {/each}
  </ul>
</nav>
