<script>
  // import { location } from "svelte-spa-router";
  import { basket } from "../stores.js";
  import GoBackButton from "./GoBackButton.svelte";
  import BuyButton from "./BuyButton.svelte";
  import ProductImage from "./ProductImage.svelte";
  export let collection = {};
  export let productSlug;

  let productMap = new Map(collection.products.map((i) => [i.permalink, i]));
  let baseURL = `collection/${collection.permalink}/`;
  let previousURL, nextURL;

  let products = collection.products || [];
  let images = [];
  let currentProduct = {};
  let productCounter = 0;
  let inBasket;
  let original_url;
  let sort_type;

  // Special variable for forced rerender of image gallery
  let keys = new Uint32Array(1);

  $: if (products.length) {
    currentProduct = productSlug ? productMap.get(productSlug) : products[0];
  }

  $: if (currentProduct) {
    images = currentProduct.images;
  }

  $: if (currentProduct) {
    productCounter = collection.products.findIndex(
      (c) => c.id === currentProduct.id
    );
  }

  $: if (productCounter == products.length - 1) {
    nextURL = baseURL + products[0].permalink;
  } else {
    nextURL = baseURL + products[productCounter + 1].permalink;
  }

  $: if (productCounter == 0) {
    previousURL = baseURL + products[products.length - 1].permalink;
  } else {
    previousURL = baseURL + products[productCounter - 1].permalink;
  }
  $: if (products.length) {
    if ($basket.get(currentProduct.variants[0].id)) {
      inBasket = $basket.get(currentProduct.variants[0].id).quantity;
    } else {
      inBasket = 0;
    }
  }
</script>

<style>
  :root {
    --photoHeight: calc(100vh - 7.5rem - 5.7rem - 7.3rem);
  }
  .wrapper {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "counter"
      "gallery"
      "panel";
  }
  .counter {
    grid-area: counter;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 70%;
    font-size: 0.8rem;
    padding: 0.25rem 4vw 0.25rem;
  }

  .counter a.disabled {
    visibility: hidden;
  }

  .gallery {
    grid-area: gallery;
    height: calc(100vh - 7.5rem - 5.7rem - 7.3rem);
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  }
  div.gallery-transition-wrapper {
    flex-basis: calc((100vh - 7.5rem - 5.7rem - 7.3rem) * 0.75);
    position: relative;
  }
  .panel {
    grid-area: panel;
    padding: 0.5rem 15vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
  }
  a.controls {
    min-width: 50px;
    margin: 0;
    padding: 0;
    border: none;
    background-color: var(--backgroundColor);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a.controls:focus {
    outline: none;
    box-shadow: 0 0px 16px #0005;
  }
  a.controls img {
    opacity: 20%;
    max-height: 0.8rem;
  }
  .info {
    flex-grow: 1;
    font-size: 0.9rem;
  }
  .info .title {
    font-size: 1rem;
    padding-right: 0.1rem;
  }
  .info .price {
    font-size: 0.8rem;
  }

  .info .price span {
    font-size: 0.8rem;
  }

  .sale {
    background-color: var(--brandColor);
  }

  .info .option {
    font-size: 0.8rem;
  }

  .info .option span.size {
    font-weight: 800;
  }

  @media screen and (min-width: 600px) {
    a.controls {
      flex-grow: 1;
    }
    .panel {
      padding: 0.5rem 25vw;
    }
    .counter {
      padding: 0.25rem 20vw 0.25rem 20vw;
    }
  }
  @media screen and (min-width: 768px) {
    .panel {
      padding: 0.5rem 25%;
    }
    .counter {
      padding: 0.25rem 20% 0.25rem 20%;
    }
  }
</style>

{#if products.length}
  <div class="wrapper">
    <div class="counter">
      <a href="/" class:disabled={collection.permalink == 'frontpage'}>
        <GoBackButton icon="icons/barr.png" />
      </a>
      <div>{productCounter + 1}/{collection.products.length}</div>
    </div>
    <div class="gallery">
      <a class="controls" href={previousURL}>
        <img src="/icons/larr.png" alt="предыдущий товар" />
      </a>
      <div class="gallery-transition-wrapper">
        {#if products.length}
          {#each [...keys] as x (window.crypto.getRandomValues(keys)[0])}
            <ProductImage {currentProduct} {inBasket} />
          {/each}
        {/if}
      </div>
      <a class="controls" href={nextURL}>
        <img class="" src="icons/rarr.png" alt="следующий товар" />
      </a>
    </div>
    <div class="panel">
      <div class="info" aria-live="assertive">
        <div class="title">{currentProduct.title.toLowerCase()}</div>
        <div class="price">
          {#if currentProduct.variants[0].old_price}
            <s class="old">
              {currentProduct.variants[0].old_price.slice(0, -2)}
            </s>
          {/if}
          <span class:sale={currentProduct.variants[0].old_price}>
            {currentProduct.variants[0].price.slice(0, -2)}р
          </span>
        </div>
        {#each currentProduct.option_names as optionName}
          <div class="option">
            {#if optionName.title != 'Материал'}
              {optionName.title.toLowerCase()}:
            {/if}
            {#if optionName.title == 'Размер'}
              <span class="size">
                {currentProduct.variants[0].option_values.find((v) => v.option_name_id == optionName.id).title}
              </span>
            {:else}
              {currentProduct.variants[0].option_values.find((v) => v.option_name_id == optionName.id).title}
            {/if}
          </div>
        {/each}
      </div>
      <BuyButton product={currentProduct} {inBasket} />
    </div>
  </div>
{/if}
