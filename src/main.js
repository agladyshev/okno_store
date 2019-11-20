import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		BASE_URL: "http://localhost:3000"
	}
});

export default app;