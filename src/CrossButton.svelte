<script>
  export let onclick = undefined,
    icon;
</script>

<style>
  button {
    /* padding: 0rem 0.5rem 0.5rem 0.5rem; */
    font-size: 0.8rem;
    background: none;
    opacity: 70%;
    border: none;
    /* line-height: 0.8rem; */
    width: 1rem;
    /* margin: 0.2rem 0 0 0; */
    margin: 0;
    padding: 0;
    display: flex;
    align-content: center;
  }
</style>

<button on:click={onclick}>
  <img src={icon} alt={icon} />
</button>
