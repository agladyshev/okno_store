<script>
  export let productId, variantId;
  import { deleteVariant } from "../storeHelpers.js";
  function handleClick() {
    return deleteVariant(productId, variantId);
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
  button:focus {
    outline: solid;
  }
</style>

<button aria-label="удалить товар" title="удалить" on:click={handleClick}>
  &#10799;
</button>
