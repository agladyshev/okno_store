<script>
  import { basket } from "./stores";
  let basketSize;
  basket.subscribe(basket => {
    basketSize = basket.size;
    console.log(basketSize);
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
    margin: 0.2rem 0.5rem 0 0;
  }
  header .logo img {
    max-width: 1.5rem;
  }
  header .counter {
    color: #333;
    position: absolute;
    right: 1.4rem;
    top: 1.6rem;
    font-size: 0.7rem;
    font-weight: 800;
  }
  header .counter.double {
    right: 1.2rem;
    top: 1.7rem;
  }
  header .counter.emoji {
    right: 1.25rem;
    top: 1.6rem;
  }
</style>

<header>
  <div class="logo">
    <img src="/search.png" alt="magnifying glass icon" />
    <h1>окно</h1>
  </div>
  <a href="">
    {#if basketSize}
      {#if basketSize < 10}
        <span class="counter">{basketSize}</span>
      {:else if basketSize < 100}
        <span class="counter double">{basketSize}</span>
      {:else}
        <span class="counter emoji">&#128521;</span>
      {/if}
    {/if}
    <img src="/paper-bag-1.png" alt="paper bag icon" />
  </a>
</header>
