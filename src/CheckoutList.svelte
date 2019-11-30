<script>
  import { basket } from "./stores.js";
  import DeleteButton from "./DeleteButton.svelte";
  let products;

  $: {
    basket.subscribe(map => {
      products = Array.from(map.values());
    });
  }
  $: totalSum = products.reduce((sum, product) => {
    return sum + Number(product.variants[0].price);
  }, 0);
</script>

<style>
  ul {
    /* flex-grow: 1; */
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 1rem;
    padding: 0;
  }
  ul li {
    flex-basis: 100vw;
    margin: 0 0 0.5rem 0;
    padding: 0.5rem;
    /* border: solid #333 1px; */
    border-radius: 3px;
    list-style: none;

    /* box-shadow: 1px 1px 1px 1px #333; */
  }

  ul li.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ul li.unavailable {
    background-color: #fcc7c7;

    opacity: 70%;

    border-radius: 10px;
  }
  span.unavailable-text {
    font-size: 0.7rem;
  }

  ul li picture {
    flex-basis: 15%;
  }

  .cover {
    width: 100%;
    /* height: calc(5rem); */
  }
  img {
    object-fit: cover;
  }
  ul li .info {
    flex-grow: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* flex-grow: 2; */
  }

  ul li .info .title {
    flex-basis: 40%;
    font-size: 1rem;
    text-align: left;
    padding: 2rem;
  }

  ul li .price {
    /* flex-basis: 35%; */
    font-size: 0.8rem;
    text-align: right;
  }

  ul li .delete {
    align-self: flex-start;
    display: flex;
  }

  ul li.total {
    text-align: right;
  }
  ul li.total span {
    background-color: yellow;
    color: #333;
    /* padding: 0.2rem 1rem; */
    /* background-color: yellow; */
    border-radius: 2px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.05);
    border: none;
    font-size: 0.8rem;
  }

  ul li.total span img {
    max-height: 0.6rem;
  }

  .info .option {
    font-size: 0.8rem;
  }

  .info .option span.size {
    font-weight: 800;
  }
</style>

<ul>
  {#each products as product}
    <li
      class:unavailable={product.is_hidden || !product.available}
      class="item">
      <picture>
        <source
          srcset={product.images[0].thumb_url}
          media="(max-width: 200px)" />
        <source
          srcset={product.images[0].compact_url}
          media="(max-width: 300px)" />
        <source
          srcset={product.images[0].medium_url}
          media="(max-width: 400px)" />
        <source
          srcset={product.images[0].large_url}
          media="(max-width: 600px)" />
        <img class="cover" src={product.images[0].original_url} alt="logo" />
      </picture>
      <div class="info">
        <div class="title">{product.title.toLowerCase()}</div>

        {#if product.is_hidden || !product.available}
          <span class="unavailable-text">Товар недоступен</span>
        {:else if product.option_names.length}
          {#each product.option_names as optionName}
            <div class="option">
              {#if optionName.title == 'Размер'}
                <!-- {optionName.title.toLowerCase()}: -->
                <span class="size">
                  {product.variants[0].option_values.find(v => v.option_name_id == optionName.id).title}
                </span>
              {/if}
            </div>
          {/each}
        {/if}
        <div class="price">
          {#if product.variants[0].old_price}
            <s class="old">{product.variants[0].old_price.slice(0, -2)}</s>
          {/if}
          {product.variants[0].price.slice(0, -2)}
        </div>

      </div>
      <div class="delete">
        <DeleteButton {product} />
      </div>
    </li>
  {/each}
  <li class="total">
    <span>{totalSum}р</span>
  </li>
</ul>
