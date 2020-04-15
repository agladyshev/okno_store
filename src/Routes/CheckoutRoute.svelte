<script>
  import CheckoutForm from "../CheckoutForm.svelte";

  import { basket } from "../stores.js";
  import Button from "../Button.svelte";
  import { addToBasket } from "../storeHelpers.js";
  import { fade } from "svelte/transition";
  export let params;

  let directFailure = false;

  if (params.productId) {
    // adding product by direct link
    let result = addToBasket(params.productId);
    if (result === null) {
      directFailure = true;
      setTimeout(function() {
        directFailure = false;
      }, 4 * 1000);
    }
  }

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
  div.message {
    flex-basis: 100%;
    margin: 0 0 0.5rem 0;
    text-align: center;
    font-size: 0.8rem;
    background-color: #333;
    color: ivory;
  }
</style>

{#if directFailure}
  <div class="message" transition:fade>товар по ссылке уже кто-то купил</div>
{/if}
<div class="wrapper">
  {#if products.length}
    <CheckoutForm />
  {:else}
    <div class="empty">
      {#if directFailure}
        <div>товар по ссылке уже кто-то купил</div>
      {/if}
      В пакете пока ничего нет
      <div class="button" />
      <a href="#/">
        <Button value="добавить" type="button" />
      </a>
    </div>
  {/if}

</div>
