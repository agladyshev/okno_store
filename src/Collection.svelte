<script>
  import CrossButton from "./CrossButton.svelte";
  import BuyButton from "./BuyButton.svelte";
  import { basket } from "./stores.js";
  import { location } from "svelte-spa-router";

  import ProductImage from "./ProductImage.svelte";

  function getNext() {
    productCounter == products.length - 1
      ? (productCounter = 0)
      : productCounter++;
  }
  function getPrevious() {
    productCounter == 0
      ? (productCounter = products.length - 1)
      : productCounter--;
  }

  export let collection = {};
  let products = [];
  let productCounter = 0;

  let currentProduct = {};

  let images = [];
  let basketMap = new Map();

  let original_url, inBasket;

  location.subscribe(l => {
    productCounter = 0;
    // pictureCounter = 0;
  });

  $: {
    ({ products = [] } = collection);
    currentProduct = products[productCounter] || {};
    images = currentProduct.images;
    basket.subscribe(map => {
      basketMap = map;
    });
    // if (currentProduct.images) {
    // original_url = images[pictureCounter].original_url;
    // }
    inBasket = basketMap.has(currentProduct.id);
  }
</script>

<style>
  .wrapper {
    /* overflow: auto; */
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* align-items: stretch; */
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "counter"
      "gallery"
      "panel";
    /* margin-top: 0rem; */
    /* height: calc(100vh - 7.5rem - 5.7rem); */
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
    display: flex;
    height: calc(100vh - 7.5rem - 5.7rem - 7.3rem);
  }
  .panel {
    grid-area: panel;
    padding: 0.5rem 15vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
  }
  button.controls {
    flex-basis: 15vw;
    margin: 0;
    padding: 0;
    /* background-color: ivory; */
    background-color: white;
    border: none;
    color: #999;
    opacity: 20%;
  }
  button.controls img {
    /* -webkit-appearance: none; */
    max-height: 0.8rem;
  }
  .info {
    flex-grow: 1;
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
  }
  .info .title {
    font-size: 1rem;
    letter-spacing: 0.05rem;
  }
  .info .price {
    font-size: 0.8rem;
    letter-spacing: 0.05rem;
  }

  .info .price span {
    font-size: 0.8rem;
  }

  .sale {
    background-color: yellow;
  }

  .info .option {
    font-size: 0.8rem;
  }

  .info .option span.size {
    font-weight: 800;
  }

  .info .description {
    font-size: 0.7rem;
  }

  .info .description p {
    margin: 0;
  }

  @media screen and (min-width: 600px) {
    picture {
      flex-basis: 50vw;
    }
    button.controls {
      flex-basis: 25vw;
    }
    .panel {
      padding: 0.5rem 25vw;
    }
    .counter {
      padding: 0.25rem 25vw 0.25rem 25vw;
    }
  }
  @media screen and (min-width: 768px) {
    picture {
      flex-basis: 50%;
    }
    button.controls {
      flex-basis: 25%;
    }
    .panel {
      padding: 0.5rem 25%;
    }
    .counter {
      padding: 0.25rem 25% 0.25rem 25%;
    }
  }
</style>

{#if products.length}
  <div class="wrapper">
    <div class="counter">
      <a href="#/" class:disabled={collection.permalink == 'frontpage'}>
        <CrossButton icon="barr.png" />
      </a>
      <div>{productCounter + 1}/{collection.products.length}</div>
    </div>
    <div class="gallery">
      <button class="controls" on:click={getPrevious}>
        <img src="/larr.png" alt="<" />
      </button>
      <ProductImage {currentProduct} {inBasket} />
      <button class="controls" on:click={getNext}>
        <img class="" src="/rarr.png" alt=">" />
      </button>
    </div>
    <div class="panel">
      <div class="info">
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
                {currentProduct.variants[0].option_values.find(v => v.option_name_id == optionName.id).title}
              </span>
            {:else}
              {currentProduct.variants[0].option_values.find(v => v.option_name_id == optionName.id).title}
            {/if}
          </div>
        {/each}
      </div>
      <BuyButton
        product={currentProduct}
        added={basketMap.has(currentProduct.id)} />
    </div>
  </div>
{/if}
