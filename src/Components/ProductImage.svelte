<script>
  import { fade } from "svelte/transition";
  export let currentProduct = {},
    inBasket = false;
  let pictureCounter = 0;
  let images = currentProduct.images;
  function getNextPicture() {
    pictureCounter < images.length - 1
      ? pictureCounter++
      : (pictureCounter = 0);
  }
</script>

<style>
  picture {
    grid-area: picture;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    vertical-align: middle;
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
    filter: brightness(80%);
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
