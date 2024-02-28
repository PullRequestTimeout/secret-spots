<script>
	import { auth } from "$lib/firebase/firebase.js";
	import { authStore } from "$lib/stores/authStore.js";
	import { userSpots } from "$lib/stores/userDataStore.js";
	import { loading } from "$lib/stores/uiStore.js";
	import { setAlertMessage } from "$lib/stores/uiStore.js";

	// Svelte methods
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	// Components
	import Alert from "$lib/components/Alert.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import CloudContainer from "$lib/components/CloudContainer.svelte";
	import Loader from "$lib/components/Loader.svelte";

	// Just used to grab the current url for the key
	export let data;

	// Loading state
	loading.set(true);

	// The only routes that don't require auth, add more to array if necessary
	const nonAuthRoutes = ["/", "/login", "/register"];
	onMount(() => {
		// This function controls routing on auth state change, and sets user data in store
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			// Make sure if there is no user, dump data
			if (!user) {
				authStore.update(() => {
					return {
						uid: null,
						displayName: null,
						email: null,
						emailVerified: false
					};
				});
				userSpots.set([]);
			}

			// Route protection for auth routes. Needs to be more robust. Move to load function?
			const currentPath = window.location.pathname;
			if (!user && !nonAuthRoutes.includes(currentPath)) {
				goto("/");
				return;
			}

			// if (user && auth.currentUser.emailVerified === false) {
			// 	goto("/register");
			// 	setAlertMessage("Verification email has been re-sent. Please verify your email address to be able to login.", 10);
			// }

			// if (user && auth.currentUser.emailVerified === true) {
			if (user) {
				authStore.update(() => {
					return {
						uid: auth.currentUser.uid,
						displayName: auth.currentUser.displayName,
						email: auth.currentUser.email,
						emailVerified: auth.currentUser.emailVerified
					};
				});
				goto("/spots");
				setAlertMessage(`Welcome back, ${auth.currentUser.displayName}!`);
				console.log("User is logged in");
			}
		});
		loading.set(false);
		return unsubscribe;
	});
</script>

<Alert />
<Nav />
{#key data.url}
	<div transition:fade={{ delay: 300, duration: 200 }} class="mainContainer">
		{#if $loading}
			<Loader />
		{/if}
		<slot />
	</div>
{/key}
<Footer />
<div class="cloudContainer">
	<CloudContainer />
</div>

<style>
	/* If this BS doesn't work to fix webkit's issues, fuck it, we're doing javascript for height */

	.mainContainer,
	.cloudContainer {
		position: fixed;
		top: var(--spc-header-height);
		height: calc(100vh - var(--spc-footer-height));
		height: calc(100dvh - var(--spc-footer-height));
		height: calc(100vmin - var(--spc-footer-height));
		height: -webkit-fill-available;
		width: 100%;
	}

	.cloudContainer {
		z-index: -1;
	}
</style>
