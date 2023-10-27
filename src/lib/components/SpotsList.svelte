<script>
	import SpotButton from "$lib/components/SpotButton.svelte";
	// export let currentSpot;
</script>

<div class="list-container">
	<div class="list-slider">
		<SpotButton
			spotName="That swimming hole on the way to Kelowna"
			iconName="camping"
			active={true}
		/>
		<SpotButton spotName="Chimo Cabin" iconName="cabin" />
		<SpotButton spotName="Good Dog Walk" iconName="paw" />
		<SpotButton spotName="Trail Up to Old Glory" iconName="mountain" />
		<SpotButton spotName="Culvert near Patterson" iconName="swimming" />
		<SpotButton spotName="Snowshoe Loop at WH20" iconName="snowshoe" />
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
