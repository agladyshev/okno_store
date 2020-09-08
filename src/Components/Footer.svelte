<script>
  import { getContacts } from "../api.js";
  import { onMount } from "svelte";
  let contacts = {};
  onMount(async () => {
    getContacts().then((res) => {
      contacts = res;
    });
  });
</script>

<style>
  footer {
    background-color: white;
    grid-area: footer;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
  footer a {
    font-size: 0;
    text-align: center;
    flex: 1;
    margin: 0;
    text-decoration: none;
  }
  footer a img {
    height: 1.5rem;
    width: 1.5rem;
  }
</style>

<footer>
  <a href="tel:{contacts.phone}">
    <img src="/phone.png" alt="phone icon" />Позвонить нам</a>
  <a href={contacts.address}>
    <img src="/google-maps.png" alt="google maps icon" />Найти нас на карте
  </a>
  <a href="https://www.instagram.com/{contacts.instagram}/">
    <img src="/instagram.png" alt="instagram icon" />Наш инстаграм
  </a>
  <a href="https://www.facebook.com/{contacts.facebook}/">
    <img src="/facebook-alt.png" alt="facebook icon" />Наш фейсбук
  </a>
</footer>
