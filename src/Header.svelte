<script>
  import { basket } from "./stores";
  let basketSize;
  basket.subscribe(basket => {
    basketSize = basket.size;
  });
</script>

<style>
  header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header .logo {
    flex-grow: 1;
    text-align: center;
    margin: 0 0 0 1.5rem;
  }

  header .logo h1 {
    margin: 0;
    display: inline;
    font-size: 2rem;
    color: black;
    font-weight: 400;
    padding-left: 10px;
  }

  header a img {
    max-width: 2rem;
    margin: 0.2rem 0.6rem 0 0;
  }
  header .logo img {
    max-width: 1.5rem;
  }
  header .counter {
    color: #333;
    position: absolute;
    right: 0.4rem;
    padding: 1rem;
    font-size: 0.7rem;
    font-weight: 800;
    text-align: center;
  }
  header .counter.double {
    right: 0.25rem;
  }
</style>

<header>
  <a href="/#" class="logo">
    <img src="/search-grey.png" alt="magnifying glass icon" />
    <h1>окно</h1>
  </a>
  <a href="#/checkout">
    {#if basketSize}
      {#if basketSize < 10}
        <span class="counter">{basketSize}</span>
      {:else if basketSize < 100}
        <span class="counter double">{basketSize}</span>
      {:else}
        <span class="counter double" />
      {/if}
    {/if}
    <img src="/bag.png" alt="paper bag icon" />
  </a>
</header>
