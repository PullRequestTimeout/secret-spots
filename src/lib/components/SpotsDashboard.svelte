<script>
	import SpotsList from "$lib/components/SpotsList.svelte";
	import SpotsDisplay from "$lib/components/SpotsDisplay.svelte";

	let currentSpot;

	let dummySpots = [
		{
			lat: "49.0777476",
			long: "-117.79972",
			spotName: "Cabin",
			icon: "cabin",
			spotDetails: "A cabin in the woods."
		},
		{
			lat: "49.0777476",
			long: "-117.79972",
			spotName: "Camping",
			icon: "camping",
			spotDetails: "A great spot to go camping."
		}
	];
</script>

<div class="dashboardContainer">
	<SpotsList spotsArray={dummySpots} bind:currentSpot />
	<SpotsDisplay {currentSpot} />
</div>

<style>
	.dashboardContainer {
		display: flex;
		flex-direction: column-reverse;
		position: relative;
		width: 100%;
		height: 100%;
	}

	@media screen and (min-width: 768px) {
		.dashboardContainer {
			flex-direction: row;
		}
	}
</style>
