<script>
  export let product;
  import { deleteProduct } from "../storeHelpers.js";
  function handleClick() {
    return deleteProduct(product.id);
  }
</script>

<style>
  button {
    padding: 0rem 0.5rem 0.5rem 0.5rem;
    font-size: 0.8rem;
    background: none;
    opacity: 70%;
    border: none;
    line-height: 0.8rem;
  }
</style>

<button on:click={handleClick}>&#10799;</button>
