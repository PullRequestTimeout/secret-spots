<script>
	import { clickOutside } from "$lib/utils/click_outside.js";
	import { fade } from "svelte/transition";
	import Icon from "./Icon.svelte";

	export let startingValue = "";
	export let inputs = [{ display: "", value: "" }];
	export let callback = () => {};

	let currentVal = !!startingValue ? startingValue : inputs[0].value;
	let currentDisplay = inputs.find((input) => input.value === currentVal).display;

	let dropdownOpen = false;
	function handleDropdownOpen() {
		dropdownOpen = !dropdownOpen;
	}
</script>

<div
	class="dropdown-input txt-inp"
	class:open={dropdownOpen}
	use:clickOutside
	on:outclick={() => {
		dropdownOpen = false;
	}}
>
	<p>{currentDisplay}</p>
	<button class:open={dropdownOpen} on:click={handleDropdownOpen}
		><Icon name={"dropdown"} color={"--clr-dark-green"} /></button
	>
	{#if dropdownOpen}
		<div class="dropdown" transition:fade={{ duration: 200 }}>
			{#each inputs as input}
				<button
					on:click={() => {
						callback(input.value);
						currentVal = input.value;
						currentDisplay = input.display;
						dropdownOpen = false;
					}}>{input.display}</button
				>
			{/each}
		</div>
	{/if}
</div>

<style>
	.dropdown-input {
		width: fit-content;
		min-width: 10rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.25rem;
		background-color: var(--clr-white);
		gap: 0.25rem;
		border: 2.5px solid var(--clr-dark-green);
	}

	.dropdown-input p {
		min-width: 1.75rem;
	}

	.dropdown-input > button {
		background-color: transparent;
		width: 2rem;
		aspect-ratio: 1;
		border-radius: 50%;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		transition-duration: 200ms;
	}

	button:hover,
	.dropdown button:hover,
	button:focus,
	.dropdown button:focus,
	button:active {
		cursor: pointer;
		background-color: #38664134;
		outline: none;
	}

	button.open {
		transform: rotate(180deg);
	}

	.dropdown-input.open {
		border-radius: 0.5rem 0.5rem 0 0;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		max-height: 10rem;
		background-color: var(--clr-white);
		border-radius: 0 0 0.5rem 0.5rem;
		border-top: none;
		box-shadow: var(--bx-shdw), 0 0 0 2.5px var(--clr-dark-green);
		display: flex;
		flex-direction: column;
		padding: 0.25rem;
		z-index: 1;
		overflow: auto;
	}

	.dropdown button {
		font-size: 1.2rem;
		color: #000;
		background-color: transparent;
		border: none;
		text-align: left;
	}
</style>
