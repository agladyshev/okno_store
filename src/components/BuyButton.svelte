<script>
  export let product, inBasket;
  import Button from "./Button.svelte";
  import { addOne, removeOne } from "../storeHelpers.js";
  let maxQuantity = product.variants[0].quantity;
  $: value = inBasket == maxQuantity ? "удалить" : "хочу";
  function handleClick() {
    if (inBasket < maxQuantity) {
      addOne(product.id);
    } else {
      removeOne(product.id);
    }
  }
</script>

<Button onclick={handleClick} {value} type="button" />
