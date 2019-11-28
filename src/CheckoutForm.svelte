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
      paymentOption
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

</style>

<form action="submit" on:submit|preventDefault={addOrder}>
  {#if message.text}
    <span class={message.type}>{message.text}</span>
  {/if}
  <label for="name">имя</label>
  <input id="name" type="text" bind:value={name} required />
  <label for="phone">телефон</label>

  <input
    type="tel"
    id="phone"
    name="phone"
    placeholder="+79774879349"
    bind:value={phone}
    required />

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
