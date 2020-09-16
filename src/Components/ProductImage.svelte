<script>
  export let currentProduct, inBasket;
  import { fade } from "svelte/transition";
  let pictureCounter = 0;
  let images = currentProduct.images;
  $: currentProduct, (pictureCounter = 0), (images = currentProduct.images);
  function getNextPicture() {
    pictureCounter < images.length - 1
      ? pictureCounter++
      : (pictureCounter = 0);
  }
</script>

<style>
  picture {
    grid-area: picture;
    /* flex-basis: 70vw; */
    display: flex;
    justify-content: center;
  }
  picture:focus {
    outline: none;
    box-shadow: 0 0px 16px #0005;
  }
  .cover {
    /* first 2 values are for main
    3rd value is for collecion list
    4th value is for info
     */
    height: calc(100vh - 7.5rem - 5.7rem - 7.3rem);
  }
  img {
    max-width: 100%;
    object-fit: cover;
  }
  img.basket {
    opacity: 70%;
  }
</style>

{#if currentProduct}
  <picture
    aria-live="assertive"
    tabindex="0"
    on:click={getNextPicture}
    on:keydown={getNextPicture}
    transition:fade>
    <source
      srcset={images[pictureCounter].original_url}
      media="(min-width: 600px)" />
    <source
      srcset={images[pictureCounter].original_url}
      media="(min-device-pixel-ratio: 3), (-webkit-min-device-pixel-ratio: 3)" />
    <source
      srcset={images[pictureCounter].original_url}
      media="(min-width: 400px) and (min-device-pixel-ratio: 2), (min-width:
      400px) and (-webkit-min-device-pixel-ratio: 2)" />
    <source
      srcset={images[pictureCounter].large_url}
      media="(min-width: 300px)" />
    <source srcset={images[pictureCounter].medium_url} />
    <img
      class:basket={inBasket}
      class="cover"
      src={currentProduct.images[pictureCounter].original_url}
      alt={currentProduct.title} />
  </picture>
{/if}
