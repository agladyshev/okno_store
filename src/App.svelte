<script>
  import { onMount } from "svelte";

  let collections = [];
  let products = [];

  onMount(async () => {
    const res = await fetch(`${BASE_URL}/getCollections`);
    collections = await res.json();
  });
  onMount(async () => {
    const res = await fetch(`${BASE_URL}/getProducts`);
    products = await res.json();
  });

  export let BASE_URL;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <ul>
    {#each collections as { id, title }}
      <li>{title}</li>
    {/each}
    {#each products as { id, title }}
      <li>{title}</li>
    {/each}
  </ul>
</main>
