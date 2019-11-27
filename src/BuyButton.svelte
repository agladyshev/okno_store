<script>
  export let product;
  import { basket } from "./stores.js";
  function addToBasket() {
    basket.update(basket => {
      let map = basket.set(product.id, product);
      return map;
    });
  }
</script>

<style>
  input {
    /* margin: auto; */
    padding: 0.5rem;
    background-color: yellow;
  }
</style>

<input type="button" on:click={addToBasket} value="Хочу" />
