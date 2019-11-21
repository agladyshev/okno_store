<script>
  import { onMount } from "svelte";

  let collections = {};
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
    return products.reduce((obj, product) => {
      // product.collections_ids.forEach(id => {
      //   if (typeof obj[id].products === "undefined") {
      //       obj[id].products = [];
      //     }
      //     obj[id].products.push(product);
      // });

      console.log(product.collections_ids[0]);
      console.log(collections[product.collections_ids[0]])
      let id = product.collections_ids[0];
      console.log(obj[id].products);
      console.log(typeof obj[id].products === "undefined");
      if (typeof obj[id].products === "undefined") {
        obj[id].products = [];
      }
      console.log(obj[id].products);
      obj[id].products.push(product);
      console.log(obj[id].products);

      if (obj[id].products.length) {
        return obj;
      }
    }, collections);

  };

  onMount(async () => {
    Promise.all([getCollections(), getProducts()]).then(res => {
      let [collections, products] = res;
      return populateCollections(collections, products);
    })
    .then((res) => {
      collections = res;
    });
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
    overflow-y: scroll;
  }
  main ul {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0.5rem 0 0 0;
    /* padding: 0; */
    margin: 0;
    /* background-color: grey; */
  }
  main ul li {
    flex-basis: 40vw;
    /* padding: 0.5rem 0.4rem 0 0.4rem ; */
    margin: 0 0 0.6rem 0;
    list-style: none;
    /* background-color: ivory; */
    /* border: solid black 1px; */
  }

  main ul li a {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    padding-top: 0.25rem;
  }

  main ul li a figure {
    margin: 0;
    padding: 0;
    
  }

  main ul li a figure figcaption {
    text-align: center;
    /* height: 2rem; */
  }

  main ul li a figure picture img {
    width: calc(40vw - 0.5rem);
    height: calc(40vw - 0.5rem);

    /* Uncomment below to make round photos */
    border-radius: 50%;
    border: solid grey 2px;
    padding: 0.1rem;
  } 

  footer {
    background-color: white;
    grid-area: footer;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
  footer a {
    text-align: center;
    padding: 0.25rem 0;
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
      {#each Object.values(collections) as { id, title, products }}
        <li>
          <a href="">
            <figure>
            <picture>
              <img src={products[0].images[0].large_url} alt={title} />
            </picture>
            <figcaption>{title}</figcaption>
            </figure>
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
