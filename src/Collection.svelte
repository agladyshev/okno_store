<script>
  import BuyButton from "./BuyButton.svelte";
  export let collection = {};
  let products = [];
  let productCounter = 0;
  let pictureCounter = 0;
  let currentProduct = {};
  let images = [];
  $: {
    ({ products = [] } = collection);
    currentProduct = products[productCounter] || {};
    images = currentProduct.images;
  }
  function getNext() {
    pictureCounter = 0;
    productCounter == products.length - 1
      ? (productCounter = 0)
      : productCounter++;
  }
  function getPrevious() {
    pictureCounter = 0;
    productCounter == 0
      ? (productCounter = products.length - 1)
      : productCounter--;
  }
  function getNextPicture() {
    pictureCounter < images.length - 1
      ? pictureCounter++
      : (pictureCounter = 0);
  }
</script>

<style>
  .wrapper {
    /* overflow-y: scroll; */
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* align-items: stretch; */
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto 5rem;
    grid-template-areas:
      "gallery"
      "panel";
    margin-top: 0.6rem;
    /* height: calc(100vh - 7.5rem - 5.7rem); */
  }
  .gallery {
    grid-area: gallery;
    display: flex;
    height: calc(100vh - 7.5rem - 5.7rem - 5.4rem);
  }
  picture {
    flex-basis: 70vw;
  }
  .cover {
    /* object-fit: cover; */
    width: 100%;
    /* first 2 values are for main
    3rd value is for collecion list
    4th value is for info
     */
    height: calc(100vh - 7.5rem - 5.7rem - 5.4rem);
  }
  img {
    /* max-width: 100%; */
    /* max-height: 100%; */
    object-fit: cover;
  }
  .panel {
    grid-area: panel;
    flex-grow: 0;
    padding: 0.5rem 15vw;
    display: flex;
    justify-content: space-between;
    flex-basis: 100%;
  }
  .info {
    font-size: 0.9rem;
  }

  .info .price {
    font-size: 0.8rem;
  }
  .info .description {
    font-size: 0.7rem;
  }

  button.controls {
    flex-basis: 15vw;
    margin: 0;
    padding: 0;
    background-color: ivory;
    color: #999;
    opacity: 20%;
  }
</style>

{#if products.length}
  <div class="wrapper">
    <div class="gallery">
      <button class="controls" on:click={getPrevious}>◀</button>
      <picture on:click={getNextPicture}>
        <source
          srcset={currentProduct.images[pictureCounter].original_url}
          media="(min-width: 600px)" />
        <img
          class="cover"
          src={currentProduct.images[pictureCounter].original_url}
          alt="logo" />
      </picture>
      <button class="controls" on:click={getNext}>▶</button>
    </div>
    <div class="panel">
      <div class="info">
        <div class="title">{currentProduct.title}</div>
        {#if currentProduct.short_description}
          <div class="description">
            {currentProduct.short_description.replace(/<[^>]*>?/gm, '')}
          </div>
        {/if}
        <div class="price">
          {#if currentProduct.variants[0].old_price}
            <s class="old">
              {currentProduct.variants[0].old_price.slice(0, -2)}
            </s>
          {/if}
          {currentProduct.variants[0].price.slice(0, -2)}
        </div>
      </div>
      <BuyButton class="buy" product={currentProduct} />
    </div>
  </div>
{/if}
