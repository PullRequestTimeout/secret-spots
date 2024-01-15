<script>
	import Toggle from "$lib/components/Toggle.svelte";
	import StarRating from "$lib/components/StarRating.svelte";
	import DropDown from "$lib/components/DropDown.svelte";
	import {
		sortByClosest,
		searchByName,
		sortByAlphabetical,
		sortByRecentlyAdded,
		sortByIcon,
		sortByHighestRating
	} from "$lib/stores/userDataStore.js";
	import { userSpots } from "$lib/stores/userDataStore.js";

	// All the following components should populate from the database and then store values in the userPrefs store

	// Search bar testing
	let searchTerm = "";
	$: if (searchTerm.length > 0) {
		searchByName($userSpots, searchTerm);
	}

	function sortSpots() {
		sortByHighestRating($userSpots);
	}
</script>

<h2>Currently a component playground</h2>
<Toggle />
<DropDown />
<button on:click={sortSpots}>Icon</button>

<!-- Move to search bar component -->
<input class="txt-inp" type="text" bind:value={searchTerm} placeholder="Search..." />

<style>
	h2 {
		color: var(--clr-dark-green);
	}
</style>
