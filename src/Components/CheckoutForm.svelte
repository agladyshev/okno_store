<script>
  import {
    basket,
    deliveryVariants,
    paymentGateways,
    productsRaw,
    orders
  } from "../stores.js";
  import { push } from "svelte-spa-router";
  import Button from "./Button.svelte";
  import CheckoutList from "./CheckoutList.svelte";
  import { addOrder, checkDiscount } from "../api.js";
  import { productById } from "../storeHelpers.js";
  let products, productsMap, deliveryOptions, paymentOptions, discountsEnabled;

  let name = "",
    phone = "",
    discountCode = "",
    deliveryOption,
    paymentOption,
    address = "",
    message = {};

  let discount = {
    status: "",
    discount: 0,
    type_id: 2,
    code: "",
    min_price: 0
  };

  $: {
    deliveryVariants.subscribe(values => {
      deliveryOptions = values;
    });
    paymentGateways.subscribe(values => {
      paymentOptions = values;
    });
    checkDiscount().then(res => {
      discountsEnabled = res;
    });
  }

  $: deliverySelected = deliveryOptions.find(d => d.id == deliveryOption) || {};

  $: deliveryPrice = Math.round(deliverySelected.price) || 0;

  $: {
    basket.subscribe(map => {
      productsMap = map;
      products = Array.from(map.values()).filter(variant => {
        variant.product = productById(variant.productId);
        if (variant.product) {
          return variant;
        }
      });
    });
  }

  $: totalSum = products.reduce((sum, entry) => {
    let { product, variantId, quantity } = entry;
    let price = product.variants.find(v => (v.id = variantId)).price;
    return sum + Number(price) * quantity;
  }, 0);

  $: discountedSum =
    discount.type_id == 1
      ? Math.floor(totalSum * (1 - discount.discount / 100))
      : Math.max(totalSum - discount.discount, 0);

  const validatePhoneNumber = function() {
    return /\+?[0-9]{11,20}/.test(phone);
  };

  const validateDiscount = function() {
    if (discountCode) {
      checkDiscount({ code: discountCode, orderSum: totalSum }).then(res => {
        (discount.discount = res.discount || 0),
          (discount.status = res.status),
          (discount.type_id = res.type_id || 2),
          (discount.code = res.code || ""),
          (discount.min_price = res.min_price);
        switch (res.status) {
          case "not_found":
            message.text = "сертификат не найден";
            break;
          case "expired":
            message.text = "истёк срок действия";
            break;
          case "disabled":
            message.text = "сертификат больше не действителен";
            break;
          case "low_sum":
            message.text = `минимальная сумма заказа ${Math.round(
              res.min_price
            )}р`;
            break;
          default:
            message.text = "";
        }
      });
    }
  };

  const constructOrderBody = function() {
    // let orderLines = products.map(product => {
    // Rewrite for different variants and quantity
    // return {
    // variant_id: product.variants[0].id,
    // quantity: 1
    // };
    // });
    // let ids = products.map(product => product.id);
    return {
      ids: products.map(p => {
        return {
          variant_id: p.variantId,
          quantity: p.quantity,
          id: p.productId
        };
      }),
      products: products.map(p => {
        return {
          variant_id: p.variantId,
          quantity: p.quantity
        };
      }),
      name,
      phone,
      address,
      deliveryOption,
      paymentOption: paymentOptions[0].id,
      coupon: discount.status == "success" ? discount.code : ""
    };
  };
  const handleMissingProducts = function(items) {
    items.forEach(item => {
      let p = productsMap.get(item.variant_id);
      p.is_hidden = true;
      productsMap.set(p.variantId, p);
    });
    return basket.set(new Map(productsMap));
  };
  const handleOrderSuccess = function(number) {
    // Delete products from available products, empty basket, store new order
    productsRaw.update(store => {
      // rewrite for different variants
      return store.filter(item => !productsMap.has(item.variants[0].id));
    });
    basket.set(new Map());
    orders.update(o => o.set(number, new Date()));
  };

  const handleSubmit = function(event) {
    if (!validatePhoneNumber()) {
      return (message = { type: "error", text: "Некорректный номер телефона" });
    }
    if (
      (discountCode && discount.status != "success") ||
      totalSum < discount.min_price
    ) {
      return validateDiscount();
    }
    return addOrder(constructOrderBody())
      .then(result => {
        if (result.status == "missing_products") {
          return handleMissingProducts(result.products);
        }
        if (result.number) {
          handleOrderSuccess(result.number);
          alert(`Заказ №${result.number} оформлен. Скоро мы свяжемся с тобой`);
          return push("/");
        }
        alert(`Что-то сломалось, позвоните нам, мы оформим заказ`);
      })
      .catch(err => {
        console.log(err);
      });
  };
</script>

<style>
  .flex {
    display: flex;
  }
  ul {
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 0.5rem;
    padding: 0;
  }
  ul li {
    flex-basis: 100vw;
    margin: 0 0 0.5rem 0;
    padding: 0.5rem;
    border-radius: 3px;
    list-style: none;
  }
  ul li.total {
    text-align: right;
  }
  ul li.total span {
    background-color: yellow;
    color: #333;
    /* padding: 0.2rem 1rem; */
    /* background-color: yellow; */
    border-radius: 2px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.05);
    border: none;
    font-size: 0.8rem;
  }

  ul li.total span.old {
    box-shadow: none;
    background: none;
  }

  form {
    align-self: flex-end;
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin: 0 1rem 1rem 1rem;
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
  form div {
    flex-basis: 100%;
  }
  form .contact {
    display: flex;
  }

  form .delivery {
    display: flex;
    font-size: 0.8rem;
  }
  form .payment {
    /* flex-basis: 100%; */
    display: flex;
  }
  form .discount {
    display: flex;
    font-size: 0.8rem;
    height: 2rem;
  }
  form .discount [type="text"] {
    -webkit-appearance: none;
    /* margin: 0; */
    border: none;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  }
  form .discount [type="image"] {
    width: 2rem;
    padding: 0.4rem 0.5rem 0.1rem 0.5rem;
    margin-bottom: 0.5rem;
    border: none;
  }

  form .submit {
    text-align: right;
  }

  form label {
    margin-right: 1rem;
  }

  form input[type="submit"] {
    -webkit-appearance: none;
    padding: 0.2rem 1.3rem;
    background-color: yellow;
    border-radius: 2px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.05);
    border: none;
    letter-spacing: 0.05rem;
  }

  label,
  input {
    display: inline-block;
  }

  input[type="radio"] {
    margin: 0.1rem 0.5rem 0.2rem 0;
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
  @media screen and (max-width: 400px) {
    form input[type="submit"] {
      font-size: 0.8rem;
      padding: 0.2rem 0.4rem;
    }
  }
</style>

<CheckoutList {products} />
<ul>
  {#if discountedSum < totalSum}
    <li class="total">
      <span class="old">
        <s>{totalSum + deliveryPrice}</s>
      </span>
      <span>{discountedSum + deliveryPrice}р</span>
    </li>
  {:else}
    <li class="total">
      <span>{totalSum + deliveryPrice}р</span>
    </li>
  {/if}
</ul>
<form action="submit" on:submit|preventDefault={handleSubmit}>
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
  </div>
  <div class="contact">
    <input
      type="tel"
      id="phone"
      name="phone"
      placeholder="+79251507164"
      bind:value={phone}
      size="11"
      required />
  </div>
  <div class="delivery">
    {#each deliveryOptions as option}
      <input
        bind:group={deliveryOption}
        name="delivery"
        type="radio"
        value={option.id}
        id={option.id}
        required />
      <label for={option.id}>{option.title}</label>
    {/each}
  </div>
  {#if deliveryOptions.find(d => d.id == deliveryOption)}
    {#if deliveryOptions.find(d => d.id == deliveryOption).type == 'DeliveryVariant::Fixed'}
      <div class="address">
        <input
          id="address"
          type="text"
          bind:value={address}
          required
          size="20"
          placeholder="адрес доставки" />
      </div>
    {/if}
    {#if deliveryOptions.find(d => d.id == deliveryOption).title == 'Самовывоз'}
      <div>
        {deliveryOptions
          .find(d => d.id == deliveryOption)
          .description.replace(/<\/?[^>]+(>|$)/g, '')}
      </div>
    {/if}
  {/if}
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
  <div class="flex">
    {#if discountsEnabled}
      <div class="discount">
        <input
          class="discount-input"
          type="text"
          id="discount"
          name="discount"
          placeholder="сертификат"
          bind:value={discountCode}
          size="10" />
        <input
          class="discount-button"
          type="image"
          src="/search-grey.png"
          alt="magnifying glass icon"
          on:click|preventDefault={validateDiscount} />
      </div>
    {/if}
    <div class="submit">
      <input type="submit" value="могу себе позволить" />
    </div>
  </div>
</form>
