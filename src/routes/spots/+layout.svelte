<script>
	import { onMount } from "svelte";
	import { auth } from "$lib/firebase/firebase.js";
	import { onAuthStateChanged } from "firebase/auth";
	import { userSpots } from "$lib/stores/userDataStore.js";
	import { checkUser, updateSpotsInDatabase } from "$lib/firebase/db.js";

	$: if ($userSpots.length > 0) {
		updateSpotsInDatabase();
	}

	onMount(() =>
		onAuthStateChanged(auth, (user) => {
			if (user) {
				checkUser();
			}
		})
	);
</script>

<slot />
