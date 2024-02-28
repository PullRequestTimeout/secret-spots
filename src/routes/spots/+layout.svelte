<script>
	import { userSpots } from "$lib/stores/userDataStore.js";
	import { updateSpotsInDatabase } from "$lib/firebase/db.js";

	// This is cursed magic and needs to be refactored
	$: if ($userSpots.length > 0) {
		updateSpotsInDatabase();
	}
</script>

<slot />
