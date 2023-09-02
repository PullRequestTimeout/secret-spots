<script>
	import { clickOutside } from "$lib/utils/click_outside.js";
	import { fade } from "svelte/transition";
	import Icon from "$lib/components/Icon.svelte";

	export let currentIcon = "secret";

	let options = [
		"secret",
		"camping",
		"cabin",
		"skiing",
		"forest",
		"hiking",
		"fire",
		"foraging",
		"fishing",
		"camera",
		"snowshoe",
		"beer",
		"view",
		"swimming",
		"mountain",
		"paw"
	];

	let isOpen = false;
	function handleOpen() {
		isOpen = !isOpen;
	}

	function handleIcon(icon) {
		currentIcon = icon;
	}
</script>

<div
	class="dropdown txt-inp"
	use:clickOutside
	on:outclick={() => {
		isOpen = false;
	}}
>
	{#key currentIcon}
		<Icon name={currentIcon} color={"--clr-dark-green"} />
	{/key}
	<button class:open={isOpen} on:click={handleOpen}
		><Icon name={"dropdown"} color={"--clr-dark-green"} /></button
	>
	{#if isOpen}
		<div transition:fade={{ duration: 200 }} class="srfc selection">
			{#each options as option}
				<button
					aria-label={option + " icon"}
					on:click={() => {
						handleIcon(option);
					}}
				>
					<Icon name={option} color={"--clr-dark-green"} />
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.dropdown {
		margin: 5rem;
		position: absolute;
		height: fit-content;
		width: fit-content;
		display: flex;
		gap: var(--spc-gap);
	}

	.dropdown button {
		background-color: transparent;
		width: 2.5rem;
		aspect-ratio: 1;
		border-radius: 50%;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		transition-duration: 200ms;
	}

	.dropdown button.open {
		transform: rotate(-180deg);
	}

	.dropdown button:hover,
	.dropdown button:focus,
	.dropdown button:active {
		cursor: pointer;
		background-color: #38664134;
		outline: none;
	}

	div.selection {
		position: absolute;
		top: 4rem;
		left: 0;
		display: grid;
		gap: var(--spc-gap);
		grid-template-columns: repeat(4, 1fr);
		border: 2px solid var(--clr-dark-green);
	}
</style>
