<script>
  export let product;
  import { basket } from "./stores.js";
  function deleteProduct() {
    basket.update(basket => {
      basket.delete(product);
      return basket;
    });
  }
  //   let basketValues;
  //   basket.subscribe(values => {
  // basketValues = values;
  //   });
</script>

<style>
  input {
    margin: auto;
    padding: 0.5rem;
    /* background-color: yellow; */
  }
</style>

<input type="button" on:click={deleteProduct} value="&#10060;" />
