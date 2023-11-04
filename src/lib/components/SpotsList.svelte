<script>
	import SpotButton from "$lib/components/SpotButton.svelte";
	import { userSpots, activeSpot } from "$lib/stores/userDataStore.js";

	let activeButton = [];
	$: $activeSpot, (activeButton = $userSpots.map((spot) => spot.spotName === $activeSpot));
</script>

<div class="list-container">
	<div class="list-slider">
		{#each $userSpots as spot, index}
			<SpotButton spotName={spot.spotName} iconName={spot.iconName} active={activeButton[index]} />
		{/each}
	</div>
</div>
<div class="backing" />

<style>
	div.backing {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 5rem;
		background-color: var(--clr-green);
		border-top: solid 3px var(--clr-dark-green);
	}

	div.list-container {
		/* visibility: hidden; */
		position: absolute;
		z-index: 1;
		bottom: 0;
		width: 100%;
		height: calc(5rem + 2.5rem);
		overflow-x: auto;
		overscroll-behavior: none;
	}

	div.list-slider {
		display: flex;
		height: 5rem;
		position: absolute;
		z-index: 2;
		bottom: 0;
		background-color: var(--clr-cream);
		border-top: solid 3px var(--clr-dark-green);
		touch-action: auto;
		pointer-events: auto;
		overscroll-behavior: none;
		min-width: 100%;
	}

	@media screen and (min-width: 768px) {
		div.backing {
			display: none;
		}

		div.list-container {
			height: 100%;
			width: calc(20vw + 2.5rem);
			overflow-x: none;
			overscroll-behavior-y: none;
			top: 0;
			direction: rtl;
			scrollbar-width: thin;
			scrollbar-color: var(--clr-darker-green) var(--clr-off-white);
		}

		div.list-container::-webkit-scrollbar {
			width: 9px;
		}

		div.list-container::-webkit-scrollbar-track {
			background-color: var(--clr-off-white);
		}

		div.list-container::-webkit-scrollbar-thumb {
			background-color: var(--clr-darker-green);
		}

		div.list-slider {
			top: 0;
			border-top: none;
			flex-direction: column;
			border-right: solid 3px var(--clr-dark-green);
			width: 20vw;
			min-width: unset;
			height: fit-content;
			min-height: 100%;
			left: 0;
		}
	}
</style>
