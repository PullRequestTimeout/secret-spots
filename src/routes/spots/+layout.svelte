<script>
	import { onMount } from "svelte";
	import { auth } from "$lib/firebase/firebase.js";
	import { onAuthStateChanged } from "firebase/auth";
	import { userSpots, userPref } from "$lib/stores/userDataStore.js";
	import { checkUser, updateSpotsInDatabase, updateUserPrefInDatabase } from "$lib/firebase/db.js";

	// Every time userPref store changes, update the DB
	$: $userPref, updateUserPrefInDatabase();

	// Every time spots store changes, update the DB
	// This be an issue when deleting spots and you remove the last one
	// This could be resolved with something like;

	// let intentionalDelete = false
	// $: if ($userSpots.length > 0 || intentionalDelete === true) {
	// 	updateSpotsInDatabase()
	// 	intentionalDelete = false
	// }

	// Then change intentionalDelete to true when $userSpots.length == 1 and a remove spot function is triggered

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
