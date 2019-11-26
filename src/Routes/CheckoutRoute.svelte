<script>
  let BASE_URL = "http://localhost:3000";
  import { basket, deliveryVariants, paymentGateways } from "../stores.js";

  let products, deliveryOptions, paymentOptions;

  let name = "",
    phone = "",
    deliveryOption,
    paymentOption;

  $: {
    deliveryVariants.subscribe(values => {
      deliveryOptions = values;
      console.log(values);
    });

    paymentGateways.subscribe(values => {
      paymentOptions = values;

      console.log(values);
    });

    basket.subscribe(values => {
      products = Array.from(values);
    });
  }

  const addOrder = function(event) {
    let orderLines = products.map(product => {
      // Rewrite for different variants and quantity
      return {
        variant_id: product.variants[0].id,
        quantity: 1
      };
    });
    const body = {
      products: orderLines,
      name,
      phone,
      deliveryOption,
      paymentOption
    };
    return fetch(`${BASE_URL}/addOrder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log(result);
      });
  };
</script>

<style>

</style>

{#if products.length}
  <form action="submit" on:submit|preventDefault={addOrder}>
    <label for="name">имя</label>
    <input id="name" type="text" bind:value={name} required />
    <label for="phone">телефон</label>
    <input id="phone" type="tel" bind:value={phone} required />
    <p>Доставка:</p>
    <div>
      {#each deliveryOptions as option}
        <label for={option.id}>{option.title}</label>
        <input
          bind:group={deliveryOption}
          name="delivery"
          type="radio"
          value={option.id}
          id={option.id}
          required />
      {/each}
    </div>
    <p>Оплата:</p>
    <div>
      {#each paymentOptions as option}
        <label for={option.id}>{option.title}</label>
        <input
          bind:group={paymentOption}
          name="payment"
          type="radio"
          value={option.id}
          required />
      {/each}
    </div>
    <input type="submit" value="Заказать" />
  </form>
{:else}В пакете ничего нет{/if}
