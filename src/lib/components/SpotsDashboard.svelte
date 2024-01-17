<!-- This is the whole dashboard on the spots route, minus nav and footer -->

<script>
	import SpotsList from "$lib/components/SpotsList.svelte";
	import SpotsDisplay from "$lib/components/SpotsDisplay.svelte";
	import SortMenu from "$lib/components/SortMenu.svelte";

	let currentSpot;
</script>

<div class="dashboard-container">
	<SpotsList bind:currentSpot />
	<SpotsDisplay />
	<SortMenu />
</div>

<style>
	.dashboard-container {
		display: flex;
		flex-direction: column-reverse;
		position: relative;
		width: 100%;
		height: 100%;
	}

	@media screen and (min-width: 768px) {
		.dashboard-container {
			flex-direction: row;
		}
	}
</style>
