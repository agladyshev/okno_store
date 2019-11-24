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
    let pictureCounter = 0;
    productCounter == products.length - 1
      ? (productCounter = 0)
      : productCounter++;
  }
  function getPrevious() {
    let pictureCounter = 0;
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
    display: flex;
    align-items: stretch;
    margin-top: 0.6rem;
    height: calc(100vh - 7.5rem - 5rem - 15vh);
  }
  .panel {
    padding: 0.5rem 15vw;
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }
  .panel .info {
    flex-basis: 100%;
  }

  .panel .info .price {
    font-size: 0.7rem;
  }

  button.controls {
    width: 15vw;
    margin: 0;
    padding: 0;
    background-color: white;
    color: #999;
    opacity: 20%;
  }

  picture {
    width: 70vw;
  }
  picture img {
    width: 100%;
    height: calc(100vh - 7.5rem - 5rem - 15vh);
    object-fit: cover;
  }
</style>

{#if products.length}
  <div class="wrapper">
    <button class="controls" on:click={getPrevious}>◀</button>
    <picture on:click={getNextPicture}>
      <source
        srcset={currentProduct.images[pictureCounter].original_url}
        media="(min-width: 600px)" />
      <!-- <source srcset={products[productCounter].images[0].large_url} /> -->
      <img
        src={currentProduct.images[pictureCounter].original_url}
        alt="logo" />
    </picture>
    <button class="controls" on:click={getNext}>▶</button>
  </div>
  <div class="panel">
    <div class="info">
      <div class="title">{currentProduct.title}</div>
      <div class="price">{currentProduct.variants[0].price}</div>
    </div>
    <BuyButton id={currentProduct.id} />
  </div>
{/if}
