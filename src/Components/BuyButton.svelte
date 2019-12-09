<script>
  export let product, added;
  import { basket } from "../stores.js";
  import Button from "./Button.svelte";
  import { addOne } from "../storeHelpers.js";
  $: value = added ? "удалить" : "хочу";
  function handleClick() {
    addOne(product.id);
  }
</script>

<Button onclick={handleClick} {value} type="button" />
