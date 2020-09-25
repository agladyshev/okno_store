<script>
  export let params = {};
  import CheckoutForm from "../components/CheckoutForm.svelte";
  import Button from "../components/Button.svelte";
  import { basket } from "../stores.js";
  import { addOne } from "../storeHelpers.js";
  import { fade } from "svelte/transition";
  let directFailure = false;

  if (params.productId) {
    // adding product by direct link
    let result = addOne(params.productId);
    if (result === null) {
      directFailure = true;
      setTimeout(function () {
        directFailure = false;
      }, 4 * 1000);
    }
  }
  $: products = Array.from($basket.values());
</script>

<style>
  .wrapper {
    height: 98%;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  div.empty {
    flex-grow: 1;
    text-align: center;
    font-size: 0.9rem;
    margin-top: 1rem;
  }

  div.empty .button {
    margin-top: 1rem;
  }
  div.message {
    flex-basis: 100%;
    margin: 0 0 0.5rem 0;
    text-align: center;
    font-size: 0.8rem;
    background-color: var(--brandFont);
    color: var(--brandColor);
  }
  main {
    grid-area: main;
    scrollbar-width: none;
  }
</style>

<main transition:fade>
  {#if directFailure}
    <div class="message">товар по ссылке уже кто-то купил</div>
  {/if}
  <div class="wrapper">
    {#if products.length}
      <CheckoutForm />
    {:else}
      <div class="empty">
        {#if directFailure}
          <div>товар по ссылке уже кто-то купил</div>
        {/if} В пакете пока ничего нет
        <div class="button" />
        <a href="/">
          <Button value="добавить" type="button" />
        </a>
      </div>
    {/if}
  </div>
</main>
