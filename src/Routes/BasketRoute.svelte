<script>
  let BASE_URL = "http://localhost:3000";
  import { onMount } from "svelte";
  import { basket } from "../stores.js";
  import { push } from "svelte-spa-router";

  let products;

  $: {
    basket.subscribe(values => {
      products = Array.from(values);
    });
  }
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
  }
  ul li {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  ul li picture img {
    height: 5rem;
  }
  ul li div {
    /* flex-grow: 1; */
  }
</style>

{#if products.length}
  <ul>
    {#each products as product}
      <li>
        <picture>
          <source
            srcset={product.images[0].thumb_url}
            media="(min-width: 200px)" />
          <source
            srcset={product.images[0].compact_url}
            media="(min-width: 300px)" />
          <source
            srcset={product.images[0].medium_url}
            media="(min-width: 400px)" />
          <source
            srcset={product.images[0].large_url}
            media="(min-width: 600px)" />
          <img src={product.images[0].original_url} alt="logo" />
        </picture>
        <div>{product.title}</div>
      </li>
    {/each}
  </ul>
  <a href="#/checkout">
    <input type="button" value="Оформить заказ" />
  </a>
{:else}В пакете ничего нет{/if}
