<script>
	import SpotButton from "$lib/components/SpotButton.svelte";
	import { userSpots, activeSpot } from "$lib/stores/userDataStore.js";

	$: activeButton = Array($userSpots.length).fill(false);
	$: $activeSpot, updateActiveButton();

	function updateActiveButton() {
		const activeSpotObj = $userSpots.find((obj) => obj.spotName === $activeSpot);
		if (activeSpotObj) {
			activeButton = activeButton.map((value, index) =>
				index === $userSpots.indexOf(activeSpotObj) ? true : false
			);
		} else {
			// If no object is found, reset all boolean values to false
			activeButton = activeButton.map((value) => false);
		}
	}

	// TODO: This function needs to be joined with updateActiveButton,
	// but I'm sick of working on them at the moment. Both functions are altering activeButton array.
	// Deactivate other buttons
	function handleActiveSpot(index, isActive) {
		activeButton = activeButton.map((_, i) => (i === index ? isActive : false));
	}
</script>

<div class="list-container">
	<div class="list-slider">
		{#each $userSpots as spot, index}
			<SpotButton
				spotName={spot.spotName}
				iconName={spot.iconName}
				on:deactivateButtons={(event) => handleActiveSpot(index, event.detail)}
				active={activeButton[index]}
			/>
		{/each}
	</div>
</div>

<style>
	div.list-container {
		position: absolute;
		z-index: 1;
		bottom: 0;
		width: 100%;
		height: calc(5rem + 2.5rem);
		overflow: auto;
		overscroll-behavior-x: none;
		touch-action: none;
	}

	div.list-slider {
		display: flex;
		height: 5rem;
		position: absolute;
		bottom: 0;
		background-color: var(--clr-cream);
		border-top: solid 3px var(--clr-dark-green);
		touch-action: auto;
		pointer-events: auto;
		min-width: 100%;
	}

	@media screen and (min-width: 768px) {
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
