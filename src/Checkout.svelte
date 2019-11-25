<script>
  let BASE_URL = "http://localhost:3000";
  import { basket } from "./stores.js";
  let basketSet;
  basket.subscribe(values => {
    basketSet = values;
  });
  function handleOrder() {
    console.log("here");
  }
  const addOrder = function() {
    return fetch(`${BASE_URL}/addOrder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
      // body: JSON.stringify(Array.from(basketSet))
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

{#if basketSet.size}
  {basketSet.values().next().value} here
  <input type="button" value="Заказать" on:click={addOrder} />
{:else}В пакете ничего нет{/if}
