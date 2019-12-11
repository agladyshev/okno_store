# okno

This is a simple web platform for a vintage clothing store.
The goal of the project was to build a lightweight, mobile-first single page application with progressive web app features.

## How does it work

The back-end is a CMS which provides a database and order management system. API security is problematic, therefore I’ve used a middleware Express server.
Middleware sanitizes and transforms data from CMS and makes it available to the front-end via simple JSON API.
Express also serves the web page itself.

## Front-end

I’ve built the web page with [Svelte](https://svelte.dev/), used a hash-based routing from [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router).
The app manages state using Svelte’s store system and localStorage. I’ve built all the components with basic HTML/CSS without boilerplate code.