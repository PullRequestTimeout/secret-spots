<script>
	import { fade } from "svelte/transition";
	import { clickOutside } from "$lib/utils/click_outside.js";
	import { onMount } from "svelte";
	import Icon from "./Icon.svelte";

	export let d = "1";
	export let m = "Jan";
	export let y = "2023";
	onMount(() => {
		const date = new Date();
		const day = date.getDate();
		const month = monthName(date.getMonth());
		const year = date.getFullYear();

		d = day;
		m = month;
		y = year;
	});

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];

	const yearsSinceAppLaunch = years();
	// returns an array of all years since the app launch year
	function years() {
		const date = new Date();
		const currentYear = date.getFullYear();
		const years = [];
		for (let i = currentYear; i >= 2023; i--) {
			years.push(i);
		}
		return years;
	}

	// returns number of days in a month
	function daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	let daysInSelectedMonth;
	$: y, (daysInSelectedMonth = daysInCurrentMonth(m));
	// returns the number of days in the current month based on the month syntax "Jan", "Feb", etc.
	function daysInCurrentMonth(month) {
		let year = parseInt(y);
		return daysInMonth(months.indexOf(month) + 1, year);
	}

	let dayIsOpen = false;
	let monthIsOpen = false;
	let yearIsOpen = false;

	function handleDayIsOpen() {
		dayIsOpen = !dayIsOpen;
	}

	function handleMonthIsOpen() {
		monthIsOpen = !monthIsOpen;
	}

	function handleYearIsOpen() {
		yearIsOpen = !yearIsOpen;
	}

	function monthName(month) {
		switch (month) {
			case 0:
				return "Jan";
			case 1:
				return "Feb";
			case 2:
				return "Mar";
			case 3:
				return "Apr";
			case 4:
				return "May";
			case 5:
				return "Jun";
			case 6:
				return "Jul";
			case 7:
				return "Aug";
			case 8:
				return "Sep";
			case 9:
				return "Oct";
			case 10:
				return "Nov";
			case 11:
				return "Dec";
		}
	}
</script>

<div class="date-picker">
	<!-- day -->
	<div
		class="date-input txt-inp"
		class:open={dayIsOpen}
		use:clickOutside
		on:outclick={() => {
			dayIsOpen = false;
		}}
	>
		<p>{d}</p>
		<button class:open={dayIsOpen} on:click={handleDayIsOpen}
			><Icon name={"dropdown"} color={"--clr-dark-green"} /></button
		>
		{#if dayIsOpen}
			<div class="date-input__dropdown" transition:fade={{ duration: 200 }}>
				{#each { length: daysInSelectedMonth } as _, i}
					<button
						on:click={() => {
							d = i + 1;
							dayIsOpen = false;
						}}>{i + 1}</button
					>
				{/each}
			</div>
		{/if}
	</div>
	<!-- month -->
	<div
		class="date-input txt-inp"
		class:open={monthIsOpen}
		use:clickOutside
		on:outclick={() => {
			monthIsOpen = false;
		}}
	>
		<p>{m}</p>
		<button class:open={monthIsOpen} on:click={handleMonthIsOpen}
			><Icon name={"dropdown"} color={"--clr-dark-green"} /></button
		>
		{#if monthIsOpen}
			<div class="date-input__dropdown" transition:fade={{ duration: 200 }}>
				{#each months as month}
					<button
						on:click={() => {
							d = 1;
							m = month;
							monthIsOpen = false;
						}}>{month}</button
					>
				{/each}
			</div>
		{/if}
	</div>
	<!-- year -->
	<div
		class="date-input txt-inp"
		class:open={yearIsOpen}
		use:clickOutside
		on:outclick={() => {
			yearIsOpen = false;
		}}
	>
		<p>{y}</p>
		<button class:open={yearIsOpen} on:click={handleYearIsOpen}
			><Icon name={"dropdown"} color={"--clr-dark-green"} /></button
		>
		{#if yearIsOpen}
			<div class="date-input__dropdown" transition:fade={{ duration: 200 }}>
				{#each yearsSinceAppLaunch as year}
					<button
						on:click={() => {
							y = year;
							yearIsOpen = false;
						}}>{year}</button
					>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.date-picker {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
	}

	.date-picker .date-input {
		width: fit-content;
		position: relative;
		display: flex;
		align-items: center;
		padding: 0.25rem;
		background-color: var(--clr-white);
		gap: 0.25rem;
	}

	.date-input p {
		min-width: 1.75rem;
	}

	.date-picker .date-input > button {
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

	.date-picker button:hover,
	.date-picker button:focus,
	.date-picker button:active {
		cursor: pointer;
		background-color: #38664134;
		outline: none;
	}

	.date-picker button.open {
		transform: rotate(180deg);
	}

	.date-input.open {
		border-radius: 0.5rem 0.5rem 0 0;
	}

	.date-input__dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		max-height: 10rem;
		background-color: var(--clr-white);
		border-radius: 0 0 0.5rem 0.5rem;
		outline: 2px solid var(--clr-dark-green);
		border-top: none;
		box-shadow: var(--bx-shdw);
		display: flex;
		flex-direction: column;
		padding: 0.25rem;
		z-index: 1;
		overflow: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--clr-darker-green) var(--clr-off-white);
	}

	.date-input__dropdown button {
		font-size: 1.2rem;
		background-color: transparent;
		border: none;
		text-align: left;
	}

	.date-input__dropdown::-webkit-scrollbar {
		width: 9px;
	}

	.date-input__dropdown::-webkit-scrollbar-track {
		background-color: var(--clr-off-white);
	}

	.date-input__dropdown::-webkit-scrollbar-thumb {
		background-color: var(--clr-darker-green);
	}
</style>
