<script>
  import DeleteButton from "./DeleteButton.svelte";
  import { addOne, removeOne } from "../storeHelpers.js";
  export let products = [];
</script>

<style>
  ul {
    /* flex-grow: 1; */
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 0.5rem;
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
    font-size: 0.75rem;
  }

  ul li picture {
    max-width: 15%;
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
    flex-basis: 30%;
    text-align: left;
    padding-left: 2rem;
    font-size: 0.9rem;
  }

  ul li .price {
    flex-basis: 15%;
    font-size: 0.8rem;
    text-align: right;
  }

  ul li .delete {
    align-self: flex-start;
    display: flex;
  }

  .info .option {
    font-size: 0.8rem;
    text-align: right;
  }

  .info .option span.size {
    font-weight: 800;
  }
  .info .option div.quantity {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .info .option div.quantity div {
    font-weight: 800;
    margin: 0;
    padding-left: 1px;
    width: 1.4rem;
    text-align: center;
    /* padding-bottom: 0.3rem; */
  }
  .info .option div.quantity input {
    /* height: 0.6rem; */
    /* width: 0.6rem; */
    border: none;
    margin: 0;
    height: 1.4rem;
    width: 1.4rem;
  }
  @media screen and (max-width: 374px) {
    .min-width {
      display: none;
    }
  }
</style>

<ul>
  {#each products as { product, productId, variantId, quantity, is_hidden }}
    <li class:unavailable={is_hidden} class="item">
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
        <img
          class="cover"
          src={product.images[0].original_url}
          alt={product.title} />
      </picture>
      <div class="info">
        <div class="title">{product.title.toLowerCase()}</div>

        {#if is_hidden}
          <span class="unavailable-text">уже купили</span>
        {:else if product.option_names.length}
          {#each product.option_names as optionName}
            <div class="option min-width">
              {#if optionName.title == 'Размер'}
                <!-- {optionName.title.toLowerCase()}: -->
                <span class="size">
                  {product.variants[0].option_values.find(v => v.option_name_id == optionName.id).title}
                </span>
              {/if}
            </div>
          {/each}
        {/if}
        {#if product.variants.find(v => v.id == variantId).quantity > 1}
          <div class="option">
            <div class="quantity">
              <input
                on:click={() => addOne(productId, variantId)}
                type="image"
                src="./icons/uarr.png"
                alt="добавить 1" />
              <div>{quantity}</div>
              <input
                on:click={() => removeOne(productId, variantId)}
                type="image"
                src="./icons/darr.png"
                alt="убрать 1" />
            </div>
          </div>
        {/if}
        <div class="price">
          {#if product.variants[0].old_price}
            <s class="old">{product.variants[0].old_price.slice(0, -2)}</s>
          {/if}
          {product.variants[0].price.slice(0, -2)}
        </div>
      </div>
      <div class="delete">
        <DeleteButton {productId} {variantId} />
      </div>
    </li>
  {/each}
</ul>
