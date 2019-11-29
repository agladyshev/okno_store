<script>
  export let value, onclick, type;
</script>

<style>
  input {
    background-color: yellow;
    padding: 0.5rem 1.3rem;
    font-size: 0.9rem;
  }
</style>

<div>
  <input {type} {value} on:click={onclick} />
</div>
