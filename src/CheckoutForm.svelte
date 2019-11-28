<script>
  let BASE_URL = "http://localhost:3000";
  import {
    basket,
    deliveryVariants,
    paymentGateways,
    productsRaw,
    orders
  } from "./stores.js";
  import { push } from "svelte-spa-router";
  let products, productsMap, deliveryOptions, paymentOptions;

  let name = "",
    phone = "",
    deliveryOption,
    paymentOption,
    message = {};

  $: {
    deliveryVariants.subscribe(values => {
      deliveryOptions = values;
    });

    paymentGateways.subscribe(values => {
      paymentOptions = values;
    });

    basket.subscribe(map => {
      products = Array.from(map.values());
      productsMap = map;
    });
  }

  const validatePhoneNumber = function() {
    return /\+?[0-9]{11,20}/.test(phone);
  };

  const addOrder = function(event) {
    if (!validatePhoneNumber()) {
      return (message = { type: "error", text: "Некорректный номер телефона" });
    }
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
      paymentOption: paymentOptions[0].id
    };
    return fetch(`${BASE_URL}/addOrder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(result => {
        if (result.status == "missing_items") {
          result.items.forEach(id => {
            let p = productsMap.get(id);
            p.is_hidden = true;
            productsMap.set(id, p);
          });
          return basket.set(new Map(productsMap));
        }
        if (result.number) {
          productsRaw.update(store => {
            return store.filter(item => !productsMap.has(item.id));
          });
          basket.set(new Map());
          orders.update(o => o.set(result.number, new Date()));
          alert(
            `Заказ №${result.number} оформлен. Мы позвоним вам в ближайшее время.`
          );
          return push("/");
        }
        console.log(result);
        alert(
          `Что-то пошло не так, позвонитеvalidatePhone нам, мы оформим заказ`
        );
      })
      .catch(err => {
        console.log(err.json());
      });
  };
</script>

<style>
  form {
    align-self: flex-end;
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin: 0 1rem;
    padding: 0.5rem 0.5rem;
    border-radius: 1rem;
  }
  form div {
    margin-bottom: 1rem;
  }

  .message {
    flex-basis: 100%;
    margin: 0;
  }
  .message span {
    background-color: yellow;
  }

  form .contact {
    flex-basis: 100%;
    display: flex;
  }

  form .delivery {
    flex-basis: 100%;
    display: flex;
  }
  form .payment {
    flex-basis: 100%;
    display: flex;
  }

  form label {
    margin-right: 1rem;
  }

  form input[type="submit"] {
    background-color: yellow;
    border-radius: 0.3rem;
    align-self: flex-end;
    padding: 0.5rem 1rem;
  }

  label,
  input {
    display: inline-block;
  }

  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border-radius: 50%;
    width: 16px;
    height: 16px;

    border: 2px solid #999;
    margin-right: 5px;

    position: relative;
    margin: 0.2rem 0.5rem 0.2rem 0;
  }
  input:checked {
    border: 2px solid black;
  }
  input:required {
    box-shadow: none;
  }
  input:invalid {
    box-shadow: 0 0 3px #fcd116;
  }
  .invisible {
    visibility: hidden;
  }
</style>

<form action="submit" on:submit|preventDefault={addOrder}>
  <!-- <label for="name">имя</label> -->
  <div class:invisible={!message.text} class="message">
    <span>{message.text}</span>
  </div>
  <div class="contact">
    <input
      id="name"
      type="text"
      bind:value={name}
      required
      size="11"
      placeholder="имя" />
    <!-- <label for="phone">телефон</label> -->
  </div>
  <div class="contact">
    <input
      type="tel"
      id="phone"
      name="phone"
      placeholder="+79774879349"
      bind:value={phone}
      size="11"
      required />

  </div>

  <div class="delivery">
    {#each deliveryOptions as option}
      <!-- <div> -->
      <input
        bind:group={deliveryOption}
        name="delivery"
        type="radio"
        value={option.id}
        id={option.id}
        required />
      <label for={option.id}>{option.title}</label>
      <!-- </div> -->
    {/each}
  </div>

  <!-- <div class="payment">
    {#each paymentOptions as option}
      <input
        bind:group={paymentOption}
        name="payment"
        type="radio"
        id={option.id}
        value={option.id}
        required />
      <label for={option.id}>{option.title}</label>
    {/each}
  </div> -->

  <input type="submit" value="Могу" />
</form>
