<script>
  import CheckoutForm from "../CheckoutForm.svelte";
  import CheckoutList from "../CheckoutList.svelte";
  import { basket } from "../stores.js";
  import Button from "../Button.svelte";
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
  div.empty {
    flex-grow: 1;
    text-align: center;
    font-size: 0.9rem;
    margin-top: 1rem;
    /* display: flex; */
    /* text-align: center; */
    /* flex-direction: column; */
  }

  div.empty .button {
    margin-top: 1rem;
  }
</style>

<div class="wrapper">
  {#if products.length}
    <CheckoutList />
    <CheckoutForm />
  {:else}
    <div class="empty">
      В пакете пока ничего нет
      <div class="button" />
      <a href="#/">
        <Button value="добавить" type="button" />
      </a>

    </div>
  {/if}

</div>
