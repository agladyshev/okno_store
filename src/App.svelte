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
  .wrapper {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 4rem 1.5rem calc(100vh - 7.5rem) 2rem;
    grid-template-areas:
      "header"
      "promo"
      "main"
      "footer";
    /* justify-content: stretch; */
  }
  header {
    /* grid-area: header; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    /* height: 4rem; */
    /* flex-wrap: wrap; */
    /* grid-area: header; */
    /* padding-bottom: 0.2em; */
    /* border-bottom: 1px solid ivory; */
  }

  header h1 {
    font-size: 2rem;
    /* text-transform: uppercase; */
    font-weight: 400;
    margin: 0 0 0 2rem;
    text-align: center;
    flex-grow: 1;
    /* text-align: left; */
  }

  /* header a {
    width: 2rem;
  } */

  header img {
    max-width: 2rem;
    padding-top: 0.2em;
  }

  section.promo {
    grid-area: promo;
    background-color: yellow;
    text-align: center;
    /* margin: 0.1em 0; */
    border: dotted black 1px;
  }

  .marquee {
    overflow: hidden;
    position: relative;
  }

  .marquee div {
    display: block;
    width: 200%;
    position: absolute;
    overflow: hidden;
    animation: marquee 8s linear infinite;
  }

  .marquee span {
    float: left;
    width: 50%;
  }
  main {
    grid-area: main;
    /* text-align: center; */
    /* padding: 1em; */
    /* max-width: 240px; */
    /* margin: 0 auto; */
  }
  main ul {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }
  main ul li {
    flex-basis: 48vw;
    height: 48vw;
    margin: 0.2rem 0;
    list-style: none;
    border: solid black 1px;
    border-radius: 50%;
  }

  main ul li a {
    /* width: 100%; */
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }

  main ul li a img {
    max-width: 5rem;
    max-height: 5rem;
    /* padding: auto; */
  }
  footer {
    grid-area: footer;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
  footer a {
    text-align: center;
    flex: 1;
    margin: 0;
    font-size: 1.2rem;
    /* width: 2rem; */
  }
  footer img {
    width: 1.5rem;
  }

  @keyframes marquee {
    0% {
      left: 0;
    }
    100% {
      left: -100%;
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<div class="wrapper">
  <header>
    <!-- <img src="/favicon.png" alt="magnifying glass icon" /> -->
    <h1>окно</h1>
    <a href="">
      <img src="/paper-bag-1.png" alt="paper bag icon" />
    </a>
  </header>
  <section class="promo marquee">
    <div>
      <span>Бесплатная доставка по Москве</span>
      <span>Бесплатная доставка по Москве</span>
    </div>
  </section>
  <main>
    <ul>
      {#each collections as { id, title, image }}
        <li>
          <a href="">
            <img src={image.original_url} alt={title} />
          </a>
        </li>
      {/each}

      <!-- {#each products as { id, title }}
        <li>{title}</li>
      {/each} -->
    </ul>
  </main>
  <footer>
    <!-- <button> -->
    <a href="tel:+79774879349">&#128222;</a>
    <!-- </button> -->

    <!-- <button> -->
    <a href="https://www.instagram.com/winxdow/">
      <img src="/instagram.png" alt="instagram icon" />
    </a>
    <!-- </button> -->
  </footer>
</div>
