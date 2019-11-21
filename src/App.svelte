<script>
  import { onMount } from "svelte";

  // let collections = {};
  // let products = [];
  const BASE_URL = "http://localhost:3000";

  const arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {});

  const getCollections = function() {
    return fetch(`${BASE_URL}/getCollections`)
      .then(res => {
        return res.json();
      })
      .then(array => {
        console.log("got collections");
        return arrayToObject(array, "id");
      });
  };

  const getProducts = function() {
    return fetch(`${BASE_URL}/getProducts`).then(res => {
      console.log("got products");
      return res.json();
    });
  };

  const populateCollections = function(collections, products) {
    products.forEach(product => {
      product.collection_ids.forEach(id => {
        if (typeof collections.id.products === "undefined") {
          collections.id.products = [];
        }
        collections.id.products.push(product);
      });
    });
  };

  let collections = getCollections();
  let products = getProducts();

  console.log(collections);
  console.log(products);

  // Promise.all([collections, products]).then(res => console.log(res));

  onMount(async () => {
    Promise.all([collections, products]).then(res => console.log(res));
    // const res = await fetch(`${BASE_URL}/getCollections`);
    // const collectionsArray = await res.json();
    // collections = arrayToObject(collectionsArray, "id");
  });
  onMount(async () => {
    // const res = await fetch(`${BASE_URL}/getProducts`);
    // const products = await res.json();
  });
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

  header img {
    max-width: 2rem;
    padding-top: 0.2em;
  }

  section.promo {
    grid-area: promo;
    background-color: yellow;
    text-align: center;
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
  }
  main ul {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0.5rem 0 0 0;
    margin: 0;
  }
  main ul li {
    flex-basis: 40vw;
    height: 40vw;
    margin: 0.2rem 0;
    list-style: none;
    border: solid black 2px;
    border-radius: 50%;
    background-size: 40vw;
  }

  main ul li a {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    padding-top: 0.25rem;
  }

  main ul li a picture img {
    width: calc(40vw - 0.5rem);
    height: calc(40vw - 0.5rem);
    border-radius: 50%;
    border: solid grey 1px;
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
      {#each collections as { id, title }}
        <li>
          <a href="">
            <picture>

              <img src="collection.jpg" alt={title} />
            </picture>
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
