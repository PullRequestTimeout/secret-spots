<script>
	import { auth } from "$lib/firebase/firebase.js";
	import { authStore } from "$lib/stores/authStore.js";

	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	import Nav from "$lib/components/Nav.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import CloudContainer from "$lib/components/CloudContainer.svelte";

	export let data;
	// The only routes that don't require auth, add more to array if necessary
	const nonAuthRoutes = ["/", "/login", "/register"];
	onMount(() => {
		// This function controls routing on auth state change, and sets user data in store
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			// Route protection for auth routes. Needs to be more robust. Move to load function?
			const currentPath = window.location.pathname;
			if (!user && !nonAuthRoutes.includes(currentPath)) {
				goto("/");
				return;
			}

			if (!user) {
				authStore.update(() => {
					return {
						uid: null,
						displayName: null,
						email: null,
						emailVerified: false
					};
				});
				return;
			} else {
				authStore.update(() => {
					return {
						uid: auth.currentUser.uid,
						displayName: auth.currentUser.displayName,
						email: auth.currentUser.email,
						emailVerified: auth.currentUser.emailVerified
					};
				});
				goto("/spots");
				return;
			}
		});
		return unsubscribe;
	});
</script>

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
