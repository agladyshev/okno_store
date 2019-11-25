<script>
  let BASE_URL = "http://localhost:3000";
  import { onMount } from "svelte";
  import { basket, deliveryVariants, paymentGateways } from "./stores.js";

  let products, deliveryOptions, paymentOptions;

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
  const addOrder = function() {
    let orderLines = products.map(product => {
      // Rewrite for different variants and quantity
      return {
        variant_id: product.variants[0],
        quantity: 1
      };
    });
    console.log(orderLines);

    // return fetch(`${BASE_URL}/addOrder`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" }
    //   // body: JSON.stringify(Array.from(products))
    // })
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(result => {
    //     console.log(result);
    //   });
  };
  console.log(products);
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
  }
  ul li {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  ul li picture img {
    height: 5rem;
  }
  ul li div {
    /* flex-grow: 1; */
  }
</style>

{#if products.length}
  <ul>
    {#each products as product}
      <li>
        <picture>
          <source
            srcset={product.images[0].thumb_url}
            media="(min-width: 200px)" />
          <source
            srcset={product.images[0].compact_url}
            media="(min-width: 300px)" />
          <source
            srcset={product.images[0].medium_url}
            media="(min-width: 400px)" />
          <source
            srcset={product.images[0].large_url}
            media="(min-width: 600px)" />
          <img src={product.images[0].original_url} alt="logo" />
        </picture>
        <div>{product.title}</div>
      </li>
    {/each}
  </ul>
{:else}В пакете ничего нет{/if}
<!-- {deliveryOptions} -->
<form action="submit">
  <p>Доставка:</p>
  <div>
    {#each deliveryOptions as option}
      <label for={option.id}>{option.title}</label>
      <input name="delivery" type="radio" value={option.title} id={option.id} />
    {/each}
  </div>
  <p>Оплата:</p>
  <div>
    {#each paymentOptions as option}
      <label for={option.id}>{option.title}</label>
      <input name="payment" type="radio" value={option.title} />
    {/each}

  </div>

  <input type="submit" value="Заказать" on:click={addOrder} />
</form>
