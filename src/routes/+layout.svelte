<script>
	import { auth } from "$lib/firebase/firebase.js";
	import { authStore, authHandlers } from "$lib/stores/authStore.js";
	import { userSpots } from "$lib/stores/userDataStore.js";
	import { loading, finishLoading, setAlertMessage } from "$lib/stores/uiStore.js";

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

	let innerHeight = 0;

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
				finishLoading();
			}

			// Route protection for auth routes. Needs to be more robust. Move to load function?
			const currentPath = window.location.pathname;
			if (!user && !nonAuthRoutes.includes(currentPath)) {
				goto("/");
				finishLoading();
				return;
			}

			// If user is not verified, resend verification email and redirect to login
			if (user && auth.currentUser.emailVerified === false) {
				// redirect to login and setAlertMessage occurs in resendEmailVerification
				authHandlers.resendEmailVerification();
				finishLoading();
				return;
			}

			// If user is verified, set user data in store and redirect to spots
			if (user && auth.currentUser.emailVerified === true) {
				authStore.update(() => {
					return {
						uid: auth.currentUser.uid,
						displayName: auth.currentUser.displayName,
						email: auth.currentUser.email,
						emailVerified: auth.currentUser.emailVerified
					};
				});
				// Welcome message
				if (auth.currentUser.displayName) {
					setAlertMessage(`Welcome back, ${auth.currentUser.displayName}!`);
				}
				// Loading state is set to false in spots/+page.svelte with finishLoading()
				goto("/spots");
			}
		});
		return unsubscribe;
	});
</script>

<svelte:window bind:innerHeight />

<Alert />
<Nav />
{#key data.url}
	<div
		transition:fade={{ delay: 300, duration: 200 }}
		class="mainContainer"
		style="--window-height: {innerHeight}px"
	>
		{#if $loading}
			<Loader />
		{/if}
		<slot />
	</div>
{/key}
<Footer />
<div class="cloudContainer" style="--window-height: {innerHeight}px">
	<CloudContainer />
</div>

<style>
	/* If this BS doesn't work to fix webkit's issues, fuck it, we're doing javascript for height */

	.mainContainer,
	.cloudContainer {
		position: fixed;
		top: var(--spc-header-height);
		height: calc(100vh - var(--spc-footer-height));
		height: calc(var(--window-height) - var(--spc-footer-height));
		width: 100%;
	}

	.cloudContainer {
		z-index: -1;
	}
</style>
