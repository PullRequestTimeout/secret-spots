<script>
	import { auth } from "$lib/firebase/firebase.js";
	import { authStore } from "$lib/stores/authStore.js";
	import { userSpots } from "$lib/stores/userDataStore.js";
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

	// Just used to grab the current url for the key
	export let data;

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

			if (user && auth.currentUser.emailVerified === false) {
				goto("/register");
				setAlertMessage("Please verify your email address to continue.");
			}

			if (user && auth.currentUser.emailVerified === true) {
				authStore.update(() => {
					return {
						uid: auth.currentUser.uid,
						displayName: auth.currentUser.displayName,
						email: auth.currentUser.email,
						emailVerified: auth.currentUser.emailVerified
					};
				});
				goto("/spots");
			}
		});
		return unsubscribe;
	});
</script>

<Alert />
<Nav />
{#key data.url}
	<div transition:fade={{ delay: 300, duration: 200 }} class="mainContainer">
		<slot />
	</div>
{/key}
<Footer />
<div class="cloudContainer">
	<CloudContainer />
</div>

<style>
	.mainContainer,
	.cloudContainer {
		position: fixed;
		top: var(--spc-header-height);
		height: calc(100vh - var(--spc-footer-height));
		width: 100%;
	}

	.cloudContainer {
		z-index: -1;
	}
</style>
