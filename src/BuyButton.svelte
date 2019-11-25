<script>
  export let product;
  import { basket } from "./stores.js";
  function addToBasket() {
    basket.update(basket => basket.add(product));
  }
  let basketValues;
  basket.subscribe(values => {
    basketValues = values;
  });
</script>

<style>
  input {
    margin: auto;
    background-color: yellow;
  }
</style>

<input type="button" on:click={addToBasket} value="В пакет" />
