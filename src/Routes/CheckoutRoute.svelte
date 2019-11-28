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
    height: 98%;
    width: 100%;
    display: flex;
    /* align-items: stretch; */
    flex-direction: row;
    flex-wrap: wrap;
  }
  div {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
</style>

<div class="wrapper">
  {#if products.length}
    <CheckoutList />
    <CheckoutForm />
  {:else}
    <div>В пакете пока ничего нет</div>
  {/if}

</div>
