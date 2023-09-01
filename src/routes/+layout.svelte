<script>
	import { auth, db } from "$lib/firebase/firebase.js";
	import { authStore } from "$lib/stores/store.js";

	import { doc, getDoc, setDoc } from "firebase/firestore";

	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	import Nav from "$lib/components/Nav.svelte";
	import Footer from "$lib/components/Footer.svelte";

	export let data;
	const nonAuthRoutes = ["/", "/login", "/register"];
	onMount(() => {
		// This function controls routing on auth state change, needs to be configured for more complex routing
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)) {
				goto("/");
				return;
			}

			// If there is no user, don't do anything
			if (!user) {
				return;
			}

			// // If user verification has been sent but not verified
			// if (user && !user.emailVerified && currentPath === "/register") {
			// 	// window.location.href = "/login";
			// 	console.log("Check email address for verification");
			// 	return;
			// }

			// // if (user && user.emailVerified && currentPath === "/register") {
			// // 	window.location.href = "/spots";
			// // 	console.log("2");
			// // 	return;
			// // }

			// // If user is not logged in and the current path is not a non-auth route, redirect to home
			// if (!user && !nonAuthRoutes.includes(currentPath)) {
			// 	window.location.href = "/";
			// 	return;
			// }

			// // If user is logged in, email verified, and the current path is a non-auth route, redirect to spots
			// if (user && user.emailVerified && nonAuthRoutes.includes(currentPath)) {
			// 	window.location.href = "/spots";
			// 	return;
			// }

			// From here down, this adds the new user to the "users" collection in the db and allocates them a document
			// The creation of their new document should maybe be moved to register page

			let dataToSetToStore;
			// docRef is a reference to the user document in the users collection
			const docRef = doc(db, "users", user.uid);
			// docSnap is a snapshot of the user document
			const docSnap = await getDoc(docRef);
			//If no user document, create one
			if (!docSnap.exists()) {
				console.log("Creating new user");
				const userRef = doc(db, "users", user.uid);
				// Schema
				dataToSetToStore = {
					email: user.email,
					name: user.username,
					spots: []
				};

				await setDoc(userRef, dataToSetToStore, { merge: true });
				// If there is, take a snapshot and put it in the authStore
			} else {
				console.log("Fetching user data");
				const userData = docSnap.data();
				dataToSetToStore = userData;
			}

			authStore.update((curr) => {
				return {
					...curr,
					user,
					emailVerified: user.emailVerified,
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
