<script>
  import { querystring } from "svelte-spa-router";
  import { orders } from "../stores.js";
  import { getPromo } from "../api.js";
  import { onMount } from "svelte";
  let promo = "";
  $: lastOrder = Array.from($orders.keys()).slice(-1)[0];
  $: lastOrderTime = $orders.get(lastOrder);
  $: secondsSinceLastOrder = (new Date() - new Date(lastOrderTime)) / 1000;
  onMount(async () => {
    getPromo().then((value) => {
      promo = value.content.replace(/<[^>]*>?/gm, "");
    });
  });
</script>

<style>
  section.promo {
    min-height: 1.5rem;
    grid-area: promo;
    background-color: var(--brandColor);
    color: var(--brandFont);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  section.promo span {
    text-align: center;
    font-size: 0.75rem;
  }

  section.promo span .order {
    font-size: 0.8rem;
  }
</style>

<section class="promo">
  {#if secondsSinceLastOrder < 20}
    <span class="order">
      заказ №{lastOrder} принят - скоро мы свяжемся с тобой
    </span>
  {:else}
    <span>
      {@html promo.toLowerCase()}
    </span>
  {/if}
</section>
