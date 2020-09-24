<script>
  export let onclick = undefined,
    icon;
</script>

<style>
  button {
    font-size: 0.8rem;
    background: none;
    opacity: 70%;
    border: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-content: center;
  }
  img {
    width: 1rem;
    height: 1rem;
  }
</style>

<button on:click={onclick}> <img src={icon} alt={icon} /> </button>
