<script>
	import { clickOutside } from "$lib/utils/click_outside.js";
	import { fade } from "svelte/transition";
	import Icon from "./Icon.svelte";

	export let values = ["DMY", "YMD", "MDY"];
	export let currentVal = values[0];
	let dropdownOpen = false;

	function handleDropdownOpen() {
		dropdownOpen = !dropdownOpen;
	}
</script>

<div class="dropdown-wrapper">
	<div
		class="dropdown-input txt-inp"
		class:open={dropdownOpen}
		use:clickOutside
		on:outclick={() => {
			dropdownOpen = false;
		}}
	>
		<p>{currentVal}</p>
		<button class:open={dropdownOpen} on:click={handleDropdownOpen}
			><Icon name={"dropdown"} color={"--clr-dark-green"} /></button
		>
		{#if dropdownOpen}
			<div class="dropdown" transition:fade={{ duration: 200 }}>
				{#each values as value}
					<button
						on:click={() => {
							currentVal = value;
							dropdownOpen = false;
						}}>{value}</button
					>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.dropdown-wrapper {
		margin: 2rem;
	}

	.dropdown-input {
		width: fit-content;
		position: relative;
		display: flex;
		align-items: center;
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

	.dropdown-wrapper button:hover,
	.dropdown-wrapper button:focus,
	.dropdown-wrapper button:active {
		cursor: pointer;
		background-color: #38664134;
		outline: none;
	}

	.dropdown-wrapper button.open {
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
		scrollbar-width: thin;
		scrollbar-color: var(--clr-darker-green) var(--clr-off-white);
	}

	.dropdown button {
		font-size: 1.2rem;
		color: #000;
		background-color: transparent;
		border: none;
		text-align: left;
	}

	.dropdown::-webkit-scrollbar {
		width: 9px;
	}

	.dropdown::-webkit-scrollbar-track {
		background-color: var(--clr-off-white);
	}

	.dropdown::-webkit-scrollbar-thumb {
		background-color: var(--clr-darker-green);
	}
</style>
