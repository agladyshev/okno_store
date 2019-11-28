<script>
  import { basket } from "./stores.js";
  import DeleteButton from "./DeleteButton.svelte";
  let products;

  $: {
    basket.subscribe(map => {
      products = Array.from(map.values());
    });
  }
</script>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem;
    padding: 0;
  }
  ul li {
    flex-basis: 100vw;
    margin: 0 0 0.5rem 0;
    padding: 0.5rem;
    /* border: solid #333 1px; */
    border-radius: 3px;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ul li.unavailable {
    border: solid red 1px;
  }
  ul li picture {
    flex-basis: 15%;
  }

  .cover {
    width: 100%;
    height: calc(5rem);
  }
  img {
    object-fit: cover;
  }
  ul li .info {
    flex-basis: 40%;
    /* flex-grow: 2; */
  }

  ul li .info .title {
    font-size: 0.9rem;
  }

  ul li .info .description {
    font-size: 0.7rem;
  }

  ul li .price {
    flex-basis: 25%;
    font-size: 0.8rem;
    text-align: right;
  }

  ul li .delete {
    align-self: flex-start;
    display: flex;
  }
</style>

<ul>
  {#each products as product}
    {#if product.is_hidden}Товар недоступен{/if}
    <li class:unavailable={product.is_hidden}>
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
        <img class="cover" src={product.images[0].original_url} alt="logo" />
      </picture>
      <div class="info">
        <div class="title">{product.title}</div>
        {#if product.short_description}
          <div class="description">
            {product.short_description.replace(/<[^>]*>?/gm, '')}
          </div>
        {/if}
      </div>
      <div class="price">
        {#if product.variants[0].old_price}
          <s class="old">{product.variants[0].old_price.slice(0, -2)}</s>
        {/if}
        {product.variants[0].price.slice(0, -2)}
      </div>
      <div class="delete">
        <DeleteButton {product} />
      </div>
    </li>
  {/each}
</ul>
