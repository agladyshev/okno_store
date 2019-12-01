<script>
  export let product, added;
  import { basket } from "./stores.js";
  import Button from "./Button.svelte";
  $: value = added ? "удалить" : "хочу";
  function toggleBasket() {
    basket.update(basket => {
      if (added) {
        basket.delete(product.id);
        return basket;
      } else {
        return basket.set(product.id, product);
      }
    });
  }
</script>

<Button onclick={toggleBasket} {value} type="button" />
