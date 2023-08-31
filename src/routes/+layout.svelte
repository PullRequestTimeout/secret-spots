<script>
	import { onMount } from "svelte";
	import { auth, db } from "$lib/firebase/firebase.js";
	import { doc, getDoc, setDoc } from "firebase/firestore";
	import { authStore } from "$lib/stores/store.js";
	import Nav from "$lib/components/Nav.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { fade } from "svelte/transition";

	const nonAuthRoutes = ["/", "/login", "/register"];

	export let data;

	onMount(() => {
		// This function controls routing on auth state change, needs to be configured for more complex routing
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;

			// If user is not logged in and the current path is not a non-auth route, redirect to home
			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = "/";
				return;
			}

			// If user is logged in and the current path is a non-auth route, redirect to spots
			if (
				user &&
				(currentPath === "/" || currentPath === "/login" || currentPath === "/register")
			) {
				window.location.href = "/spots";
				return;
			}

			// If there is no user, don't do anything
			if (!user) {
				return;
			}

			let dataToSetToStore;
			// docRef is a reference to the user document in the users collection
			const docRef = doc(db, "users", user.uid);
			// docSnap is a snapshot of the user document
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				console.log("Creating new user");
				const userRef = doc(db, "users", user.uid);

				// Schema
				dataToSetToStore = {
					email: user.email,
					emailVerified: user.emailVerified,
					spots: []
				};

				await setDoc(userRef, dataToSetToStore, { merge: true });
			} else {
				console.log("Fetching user data");
				const userData = docSnap.data();
				dataToSetToStore = userData;
			}

			authStore.update((curr) => {
				return {
					...curr,
					user,
					data: dataToSetToStore,
					loading: false
				};
			});
		});
		return unsubscribe;
	});
</script>

{#key data.url}
	<Nav />
	<div transition:fade={{ delay: 300, duration: 200 }} class="mainContainer">
		<slot />
	</div>
	<Footer />
{/key}

<style>
	.mainContainer {
		position: fixed;
		top: var(--spc-header-height);
		height: calc(100vh - var(--spc-footer-height));
		width: 100%;
	}
</style>
