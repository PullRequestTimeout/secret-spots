<script>
	import { onMount } from "svelte";
	import { auth, db } from "../lib/firebase/firebase.js";
	import { doc, getDoc, setDoc } from "firebase/firestore";
	import { authStore } from "../stores/store.js";

	const nonAuthRoutes = ["/"];

	onMount(() => {
		// This function controls routing on auth state change, needs to be configured for more complex routing
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;

			// If user is not logged in and the current path is not a non-auth route, redirect to home
			if (!user && !nonAuthRoutes.includes(currentPath)) {
				console.log("Firing");
				window.location.href = "/";
				return;
			}

			// If user is logged in and the current path is a non-auth route, redirect to spots
			if (user && currentPath === "/") {
				window.location.href = "/spots";
				return;
			}

			// If there is no user, don't do anything
			if (!user) {
				return;
			}

			let dataToSetToStore;
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				console.log("Creating new user");
				const userRef = doc(db, "users", user.uid);
				dataToSetToStore = {
					email: user.email,
					spots: []
				};
				await setDoc(userRef, dataToSetToStore, { merge: true });
			} else {
				console.log("Fetching user data");
				const userData = docSnap.data();
				dataToSetToStore = userData;
				console.log(userData);
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

<div class="mainContainer">
	<slot />
</div>

<style>
	.mainContainer {
		background-color: var(--clr-white);
		color: var(--clr-black);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100%;
	}
</style>
