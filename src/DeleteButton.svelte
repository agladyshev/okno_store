<script>
  export let product;
  import { basket } from "./stores.js";
  function deleteProduct() {
    basket.update(basket => {
      basket.delete(product.id);
      return basket;
    });
  }
  //   let basketValues;
  //   basket.subscribe(values => {
  // basketValues = values;
  //   });
</script>

<style>
  button {
    /* margin: 0.5rem; */
    padding: 0rem 0.5rem 0.5rem 0.5rem;
    font-size: 0.8rem;
    background: none;
    opacity: 70%;
    border: none;
    line-height: 0.8rem;
    /* background-color: yellow; */
  }
</style>

<!-- <input type="button" on:click={deleteProduct} value="&#128473;" /> -->

<button on:click={deleteProduct}>&#10799;</button>
