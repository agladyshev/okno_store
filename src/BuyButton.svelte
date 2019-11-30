<script>
  export let product;
  import { basket } from "./stores.js";
  import Button from "./Button.svelte";
  function addToBasket() {
    basket.update(basket => {
      let map = basket.set(product.id, product);
      return map;
    });
  }
</script>

<Button onclick={addToBasket} value="хочу" type="button" />
