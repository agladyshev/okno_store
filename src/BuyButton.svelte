<script>
  export let product;
  import { basket } from "./stores.js";
  function addToBasket() {
    basket.update(basket => basket.add(product));
  }
</script>

<style>
  input {
    margin: auto;
    padding: 0.5rem;
    background-color: yellow;
  }
</style>

<input type="button" on:click={addToBasket} value="Хочу" />
