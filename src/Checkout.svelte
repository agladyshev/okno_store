<script>
  let BASE_URL = "http://localhost:3000";
  import { basket } from "./stores.js";
  import { onMount } from "svelte";

  const getDelivery = function() {
    return fetch(`${BASE_URL}/getDelivery`).then(res => {
      return res.json();
    });
    // .then(array => {
    // return arrayToObject(array, "id");
    // });
  };

  const getPayment = function() {
    return fetch(`${BASE_URL}/getPayment`).then(res => {
      return res.json();
    });
  };
  let deliveryVariant = [],
    paymentGateways = [];
  // $: {
  //   deliveryVariant = await getDelivery();
  //   paymentGateways = await getPayment();
  // }

  // console.log(deliveryVariant);
  // onMount(async () => {
  //   //   // Promise.all([getDelivery(), getPayment()]).then(res => {
  //   //   // [deliveryVariant, paymentGateways] = res;
  //   //   // });
  //   deliveryVariant = await getDelivery();
  //   paymentGateways = await getPayment();
  //   //   getDelivery().then(variants => {
  //   //     deliveryVariant = variants;
  //   //   });
  //   //   getPayment().then(gatweays => {
  //   //     paymentGateways = gatweays;
  //   //   });
  // });

  let products;
  basket.subscribe(values => {
    products = Array.from(values);
  });

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
  <input type="button" value="Заказать" on:click={addOrder} />
{:else}В пакете ничего нет{/if}
<form action="submit">
  {#each deliveryVariant as variant}
    <input type="radio" value={variant.title} />
  {/each}
</form>
