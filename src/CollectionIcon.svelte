<script>
  export let title, images;
</script>

<style>
  li {
    flex-basis: 20vw;
    /* padding: 0.5rem 0.4rem 0 0.4rem ; */
    margin: 0 0 0.6rem 0;
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
    padding: 0.25rem 0.5rem 0 0.5rem;
    color: black;
  }

  li a figure {
    margin: 0;
    padding: 0;
  }

  li a figure figcaption {
    text-align: center;
    /* height: 2rem; */
  }

  li a figure picture img {
    width: calc(20vw - 0.5rem);
    height: calc(20vw - 0.5rem);
    object-fit: cover;
    /* Uncomment below to make round photos */
    border-radius: 50%;
    border: solid grey 2px;
    padding: 0.1rem;
  }
</style>

<li>
  <a href={title}>
    <figure>
      <picture>
        <img src={images.large_url} alt={title} />
      </picture>
      <figcaption>{title}</figcaption>
    </figure>
  </a>
</li>
