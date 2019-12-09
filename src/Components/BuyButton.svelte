<script>
  export let product, added;
  import { basket } from "../stores.js";
  import Button from "./Button.svelte";
  import { toggleBasket } from "../storeHelpers.js";
  $: value = added ? "удалить" : "хочу";
  function handleClick() {
    toggleBasket(product, added);
  }
</script>

<Button onclick={handleClick} {value} type="button" />
