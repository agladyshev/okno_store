<script>
  import { link } from "svelte-spa-router";
  export let title, images, permalink, highlight;
</script>

<style>
  li {
    padding: 0.5rem 0 0.5rem 0;
    /* margin: auto; */
    list-style: none;
  }

  li a {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    padding: 0 0.25rem 0 0.25rem;
    color: black;
    text-decoration: none;
  }

  li a figure {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  li a figure figcaption {
    text-align: center;
    font-size: 0.7rem;
    letter-spacing: 0.05rem;
    height: 1rem;
  }

  img {
    width: calc(3rem);
    height: calc(3rem);
    object-fit: cover;
    border-radius: 50%;
    border: solid grey 2px;
    padding: 0.1rem;
  }
  .highlight {
    border: dotted black 2px;
  }
  /* @media screen and (orientation: portrait) {
    li {
      margin: auto;
    }
  } */
</style>

<li>
  <a href="/collection/{permalink}" use:link>
    <figure>
      <picture>

        {#if highlight}
          <img src={images.medium_url} alt={title} class="highlight" />
        {:else}
          <img src={images.medium_url} alt={title} />
        {/if}

      </picture>
      <figcaption>{title.toLowerCase()}</figcaption>
    </figure>
  </a>
</li>
