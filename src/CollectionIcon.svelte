<script>
  import { link } from "svelte-spa-router";
  export let title, images, permalink, highlight;
</script>

<style>
  li {
    /* height: calc(14vh); */
    /* flex-basis: 15vw; */
    /* padding: 0.5rem 0.4rem 0 0.4rem ; */
    padding: 0.5rem 0 0.5rem 0;
    margin: 0;
    list-style: none;
    /* background-color: ivory; */
    /* border: solid black 1px; */
  }

  li a {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    padding: 0 0.25rem 0 0.25rem;
    color: black;
  }

  li a figure {
    margin: 0;
    padding: 0;
  }

  li a figure figcaption {
    text-align: center;
    font-size: 0.6rem;
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
</style>

<li>
  <a href="/collection/{permalink}" use:link>
    <figure>
      <picture>

        {#if highlight}
          <img src={images.large_url} alt={title} class="highlight" />
        {:else}
          <img src={images.large_url} alt={title} />
        {/if}

      </picture>
      <figcaption>{title}</figcaption>
    </figure>
  </a>
</li>
