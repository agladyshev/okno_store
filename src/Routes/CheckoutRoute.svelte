<script>
  let BASE_URL = "http://localhost:3000";
  import { basket, deliveryVariants, paymentGateways } from "../stores.js";
  import { push } from "svelte-spa-router";
  import DeleteButton from "../DeleteButton.svelte";
  let products, deliveryOptions, paymentOptions;

  let name = "",
    phone = "",
    deliveryOption,
    paymentOption;

  $: {
    deliveryVariants.subscribe(values => {
      deliveryOptions = values;
    });

    paymentGateways.subscribe(values => {
      paymentOptions = values;
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
    let ids = products.map(product => product.id);
    const body = {
      ids,
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
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.status == "missing_items") {
          let arr = products.map(p => {
            if (result.items.includes(p.id)) {
              p.is_hidden = true;
              console.log("true");
            }
            return p;
          });
          console.log(arr);
          basket.set(new Set(arr));
          //   result.items.forEach(item => {});
        }
        // push("/");
      });
    //   .catch(err => {
    // console.log(err.json());
    //   });
  };
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

  ul li.unavailable {
    border: solid red 1px;
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
      {#if product.is_hidden}Товар недоступен{/if}
      <li class:unavailable={product.is_hidden}>
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
        <DeleteButton {product} />
      </li>
    {/each}
  </ul>

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
