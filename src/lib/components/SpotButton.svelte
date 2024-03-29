<script>
	import { createEventDispatcher } from "svelte";
	import { activeSpot } from "$lib/stores/userDataStore.js";
	import Icon from "$lib/components/Icon.svelte";

	export let iconName;
	export let spotName;
	export let active = false;

	const handleActive = () => {
		if (!active) {
			active = true;
		}
	};

	$: if (active) {
		updateActiveSpot();
	}

	// Char limit of spotName to prevent overflow
	const maxLength = 20;
	function truncateString(str, maxLength) {
		if (str.length > maxLength) {
			return str.slice(0, maxLength - 3) + "...";
		}
		return str;
	}

	// Deactivate other buttons
	const dispatch = createEventDispatcher();
	const deactivateButtons = () => {
		if (active) {
			dispatch("deactivateButtons", active);
		}
	};

	function updateActiveSpot() {
		$activeSpot = spotName;
	}
</script>

<button
	title={spotName}
	on:click={handleActive}
	on:click={deactivateButtons}
	on:click={updateActiveSpot}
	class="spot-button"
	class:active
>
	<Icon name={iconName} />
	<span>{truncateString(spotName, maxLength)}</span>
</button>

<style>
	.spot-button {
		border: none;
		background-color: var(--clr-green);
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		position: relative;
		min-width: 4rem;
		transition-duration: 200ms;
		direction: ltr;
	}

	.spot-button:focus {
		outline: none;
		background-color: var(--clr-dark-red);
	}

	.spot-button:before {
		border-bottom: 35px solid var(--clr-green);
		border-left: 2rem solid transparent;
		border-right: 2rem solid transparent;
		content: "";
		height: 0;
		left: 0;
		position: absolute;
		z-index: 10;
		top: -34px;
		width: 0;
		transition-duration: 200ms;
		transform: scaleY(0);
		transform-origin: bottom;
	}

	.spot-button.active {
		background-color: var(--clr-red);
	}

	.spot-button.active:before {
		border-bottom: 35px solid var(--clr-red);
		transform: scaleY(1);
	}

	.spot-button span {
		display: none;
	}

	@media screen and (min-width: 768px) {
		.spot-button {
			min-height: 4rem;
			height: 4rem;
			display: grid;
			grid-template-columns: 1fr 5fr;
			padding-left: 2rem;
		}

		.spot-button span {
			display: block;
			text-align: left;
			font-size: 1.2rem;
			color: var(--clr-white);
			font-weight: bold;
			margin-left: 1rem;
		}

		.spot-button:before {
			rotate: 90deg;
			top: -2px;
			left: unset;
			right: -32px;
		}
	}

	@media (hover: hover) {
		.spot-button:hover {
			background-color: var(--clr-red);
		}
	}
</style>
