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
    height: calc(100vh - 7.5rem - 5rem);
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
    height: calc(100vh - 7.5rem - 5rem);
    object-fit: cover;
  }
</style>

<!-- <h2>{title}</h2>
<picture>
  <img src={original_url} alt="" />
</picture>
{length} -->
{#if products.length}
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
{/if}
