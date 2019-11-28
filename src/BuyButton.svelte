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
    background-color: yellow;
    border-radius: 0.3rem;
    align-self: flex-end;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
</style>

<div>
  <input type="button" on:click={addToBasket} value="Хочу" />
</div>
