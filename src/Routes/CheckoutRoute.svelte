<script>
  import CheckoutForm from "../CheckoutForm.svelte";
  import CheckoutList from "../CheckoutList.svelte";
  import { basket } from "../stores.js";
  let products;

  $: {
    basket.subscribe(map => {
      products = Array.from(map.values());
    });
  }
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="wrapper">
  {#if products.length}
    <CheckoutList />
    <CheckoutForm />
  {:else}В пакете ничего нет{/if}

</div>
