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
    grid-template-rows: auto auto;
    grid-template-areas:
      "gallery"
      "panel";
    margin-top: 0.6rem;
    /* height: calc(100vh - 7.5rem - 5.7rem); */
  }
  .gallery {
    grid-area: gallery;
    display: flex;
    height: calc(100vh - 7.5rem - 5.7rem - 6rem);
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
    height: calc(100vh - 7.5rem - 5.7rem - 6rem);
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
    align-items: center;
    flex-basis: 100%;
  }
  .info {
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
  .info .price .sale {
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
</style>

{#if products.length}
  <div class="wrapper">
    <div class="gallery">
      <button class="controls" on:click={getPrevious}>
        <i class="fas fa-chevron-left" />
      </button>
      <picture on:click={getNextPicture}>
        <source
          srcset={currentProduct.images[pictureCounter].original_url}
          media="(min-width: 600px)" />
        <img
          class="cover"
          src={currentProduct.images[pictureCounter].original_url}
          alt="logo" />
      </picture>
      <button class="controls" on:click={getNext}>
        <i class="fas fa-chevron-right" />
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
            {currentProduct.variants[0].price.slice(0, -2)}&#8381;
          </span>
          <span />
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
      <BuyButton product={currentProduct} />
    </div>
  </div>
{/if}
