<script>
  export let collection = {};
  let products = [];
  let productCounter = 0;
  $: {
    ({ products } = collection);
  }
  // $: {
  //   ({ images } = products);
  // }
  // console.log();
  // $: length = products.length;
  // console.log(products[0]);
  // let { original_url } = products[0].images;
</script>

<style>
  .wrapper {
    display: flex;
    align-items: stretch;
    margin-top: 0.6rem;
    height: calc(100vh - 7.5rem - 5rem - 15vh);
  }
  .info {
    /* height: 5vh; */
    /* height: 100px; */
    padding: 0.5rem 15vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 0.9rem;
    align-items: stretch;
    /* text-align: right; */
    /* padding: ; */
  }
  /* .info .right {
    text-align: right;
  } */
  /* .basket {
    padding: 0.5rem 15vw;
    text-align: right;
  } */
  .info .title {
    flex-basis: 100%;
    text-align: left;
  }

  .info .price {
    /* padding: 0.2rem; */
    font-size: 0.7rem;
  }

  .info .button {
    flex-basis: 50%;
    text-align: right;
  }

  .info .button button {
    /* margin: 0; */
    /* padding: 1rem; */
    /* padding: 0; */
    margin: auto;
    background-color: yellow;
  }

  button.controls {
    width: 15vw;
    margin: 0;
    padding: 0;
    background-color: white;
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

<!-- <h2>{title}</h2>
<picture>
  <img src={original_url} alt="" />
</picture>
{length} -->
{#if products.length}
  <!-- <div class="info">
    <div>{products[productCounter].title}</div>
    <div class="">{products[productCounter].variants[0].price}</div>
  </div> -->
  <div class="wrapper">

    <button class="controls" />
    <picture>
      <source
        srcset={products[productCounter].images[0].original_url}
        media="(min-width: 600px)" />
      <!-- <source srcset={products[productCounter].images[0].large_url} /> -->
      <img src={products[productCounter].images[0].original_url} alt="logo" />
    </picture>
    <button class="controls" />

  </div>
  <div class="info">
    <div class="">
      <div class="title">{products[productCounter].title}</div>
      <div class="price">{products[productCounter].variants[0].price}</div>

    </div>
    <div class="button">
      <button class="">В пакет</button>
    </div>
  </div>
{/if}
