<script>
  import { querystring } from "svelte-spa-router";
  import { orders } from "./stores.js";
  let lastOrder;
  let secondsSinceLastOrder;
  orders.subscribe(value => {
    lastOrder = Array.from(value.keys()).slice(-1)[0];
    let lastOrderTime = value.get(lastOrder);
    secondsSinceLastOrder = (new Date() - new Date(lastOrderTime)) / 1000;
  });
</script>

<style>
  section.promo {
    grid-area: promo;
    background-color: yellow;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  section.promo span {
    text-align: center;
    font-size: 0.7rem;
  }

  section.promo span .order {
    font-size: 0.8rem;
  }
</style>

<section class="promo">
  {#if secondsSinceLastOrder < 10}
    <span class="order">
      Заказ №{lastOrder} принят! Мы позвоним вам в ближайшее время.
    </span>
  {:else}
    <span>Бесплатная доставка по Москве</span>
  {/if}
</section>
