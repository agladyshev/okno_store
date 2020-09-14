<script>
  import { link } from "svelte-spa-router";
  export let title,
    images,
    permalink,
    highlight,
    cover = {};
</script>

<style>
  li {
    padding: 0.25rem 0 0.15rem 0;
    /* margin: auto; */
    list-style: none;
  }

  li a {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    /* padding: 0 0.25rem 0 0.25rem; */
    padding: 0;
    min-width: 3.8rem;
    /* margin: 0 0.25rem 0 0.25rem; */
    color: var(--baseFont);
    text-decoration: none;
  }

  li a figure {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  li a figure figcaption {
    text-align: center;
    font-size: 0.75rem;
    letter-spacing: 0.02rem;
    height: 1rem;
  }

  img {
    width: calc(3.35rem);
    height: calc(3.35rem);
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
          <img
            src={cover.original_url || images.medium_url}
            alt={title}
            class="highlight" />
        {:else}
          <img src={cover.original_url || images.medium_url} alt="" />
        {/if}
      </picture>
      <figcaption>{title.toLowerCase()}</figcaption>
    </figure>
  </a>
</li>
