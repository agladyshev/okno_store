<script>
  import { getContacts } from "../api.js";
  import { onMount } from "svelte";
  let contacts = {};
  onMount(async () => {
    getContacts().then(res => {
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
    <img src="icons/phone.png" alt="" />
    Позвонить
  </a>
  <a href={contacts.address}>
    <img src="icons/google-maps.png" alt="" />
    Адрес
  </a>
  <a href="https://www.instagram.com/{contacts.instagram}/">
    <img src="icons/instagram.png" alt="" />
    Инстаграм
  </a>
  <a href="https://www.facebook.com/{contacts.facebook}/">
    <img src="icons/facebook-alt.png" alt="" />
    Фейсбук
  </a>
</footer>
