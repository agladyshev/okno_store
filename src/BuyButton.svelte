<script>
  export let id;
  import { basket } from "./stores.js";
  function addToBasket() {
    basket.update(basket => basket.add(id));
  }
  let basketValues;
  basket.subscribe(values => {
    basketValues = values;
    console.log(values);
  });
  console.log(id);
</script>

<style>
  input {
    margin: auto;
    background-color: yellow;
  }
</style>

<input type="button" on:click={addToBasket} value="В пакет" />
