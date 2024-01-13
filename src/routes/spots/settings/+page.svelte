<script>
	import Toggle from "$lib/components/Toggle.svelte";
	import StarRating from "$lib/components/StarRating.svelte";
	import { sortByClosest, searchByName } from "$lib/stores/userDataStore.js";
	import { userSpots } from "$lib/stores/userDataStore.js";

	// All the following components should populate from the database and then store values in the userPrefs store

	// Search bar testing
	let searchTerm = "";
	$: searchTerm, searchByName($userSpots, searchTerm);

	function sortSpots() {
		sortByClosest($userSpots);
	}
</script>

<h2>Currently a component playground</h2>
<Toggle />
<StarRating />
<button on:click={sortSpots}>Closest</button>
<input type="text" bind:value={searchTerm} placeholder="Search..." />

<style>
	h2 {
		color: var(--clr-dark-green);
	}
</style>
