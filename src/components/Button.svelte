<script>
  export let value,
    onclick = undefined,
    type;
</script>

<style>
  input {
    -webkit-appearance: none;
    min-width: 5rem;
    padding: 0.2rem 0rem;
    background-color: var(--brandColor);
    color: var(--brandFont);
    border-radius: 2px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.05);
    border: none;
  }
</style>

<div><input {type} {value} on:click={onclick} /></div>
