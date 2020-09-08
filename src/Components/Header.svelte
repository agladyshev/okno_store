<script>
  import { basket } from "../stores";
  let basketSize;
  basket.subscribe((basket) => {
    basketSize = Array.from(basket.values()).reduce((acc, { quantity }) => {
      return acc + quantity;
    }, 0);
  });
</script>

<style>
  a {
    text-decoration: none;
    font-size: 0;
  }
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

  header .logo span {
    border-right: solid black 0.14rem;
    position: absolute;
    height: 1.7rem;
    top: 1.3rem;
    /* 
    -webkit-animation-name: webkit-blink;
    -webkit-animation-duration: 2.5s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: steps(2, end); */
  }

  @media screen and (orientation: landscape) {
    header .logo span {
      animation-name: blink;
      animation-duration: 2.5s;
      animation-iteration-count: infinite;
      animation-timing-function: steps(2, end);
    }
    @keyframes blink {
      from {
        border-right: solid black 0.14rem;
      }
      to {
        border-right: 0;
      }
    }
  }

  /* @-webkit-keyframes webkit-blink {
    0% {
      border-right: solid black 0.14rem;
    }
    100% {
      border-right: 0;
    }
  } */

  .counter {
    height: 1.9rem;
    width: 1.9rem;
    margin-right: 0.6rem;
    background-image: url("/bag.png");
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .counter .text {
    padding-top: 0.5rem;
    color: #333;
    font-weight: 800;
    font-size: 0.75rem;
  }

  header .logo img {
    max-width: 1.5rem;
  }
</style>

<header>
  <a href="/#" class="logo">
    <img src="/search-grey.png" alt="magnifying glass icon" />
    <h1>окно</h1>
    <span />
  </a>
  <a href="#/checkout">
    <div class="counter">
      {#if basketSize}
        <div class="text">{basketSize}</div>
      {/if}
    </div>
    Корзина
  </a>
</header>
