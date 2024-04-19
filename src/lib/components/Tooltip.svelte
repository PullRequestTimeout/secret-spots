<script>
	import Icon from "$lib/components/Icon.svelte";
	import { clickOutside } from "$lib/utils/click_outside.js";
	import { fade } from "svelte/transition";

	export let text = "";
	let open = false;
	function handleOpen() {
		open = !open;
	}
</script>

<div
	class="tooltip"
	use:clickOutside
	on:outclick={() => {
		open = false;
	}}
>
	<button class="tooltip-button btn" on:click={handleOpen}>
		<Icon name={"help"} color="--clr-dark-green" size="24" />
	</button>
	{#if open}
		<div class="srfc tooltip-popup" transition:fade={{ duration: 200 }}>
			<p>{text}</p>
		</div>
	{/if}
</div>

<style>
	.tooltip {
		position: relative;
	}

	.tooltip-button {
		border: none;
		border-radius: 50%;
		background-color: transparent;
		width: fit-content;
		padding: 0;
	}

	.tooltip-button:focus,
	.tooltip-button:active {
		outline: none;
		background-color: #38664134;
	}

	.tooltip-popup {
		position: absolute;
		top: calc(100% + 1rem);
		right: 0;
		padding: 1rem;
		min-width: 15rem;
		width: fit-content;
		max-width: 90%;
	}

	.tooltip-popup p {
		color: var(--clr-dark-green);
	}

	@media (hover: hover) {
		.tooltip-button:hover {
			cursor: pointer;
			background-color: #38664134;
		}
	}
</style>
