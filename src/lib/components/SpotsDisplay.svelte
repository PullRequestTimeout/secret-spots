<script>
	import { userSpots, activeSpot } from "$lib/stores/userDataStore.js";
	import { fade } from "svelte/transition";
	import Icon from "$lib/components/Icon.svelte";
	import Loading from "$lib/components/Loading.svelte";

	$: description = $userSpots.find((x) => x.spotName === $activeSpot).description;
	$: journalEntries = $userSpots.find((x) => x.spotName === $activeSpot).journalEntries;

	let map = true;
</script>

<div class="display-container">
	<div class="display-switch srfc">
		<button
			class:opacity={!map}
			class="btn btn-red"
			on:click={() => {
				map = true;
			}}>Map</button
		>
		<button
			class:opacity={map}
			class="btn btn-red"
			on:click={() => {
				map = false;
			}}>Info</button
		>
	</div>
	<h3 class="spot-name">{$activeSpot}</h3>
	{#if map}
		<div transition:fade={{ duration: 200 }} class="display-map">
			<img src="/map.jpg" alt="Map" />
		</div>
	{/if}
	{#if !map}
		<div transition:fade={{ duration: 200 }} class="display-info">
			<div class="display-info__heading">
				<h3>Description</h3>
				<button class="btn btn-rnd btn-red"><Icon name="edit" size="16" /></button>
			</div>
			{#if description === undefined || null}
				<p>There doesn't seem to be a description for this spot. Add one with the pencil icon.</p>
			{:else}
				<p>{description}</p>
			{/if}

			<div class="display-info__heading">
				<h3>Journal Entries</h3>
				<button class="btn btn-rnd btn-red"><Icon name="add" size="16" /></button>
			</div>
			{#if journalEntries.length < 1}
				<p>Add your first journal entry.</p>
			{:else}
				{#each journalEntries as entry}
					<div class="journal-entry">
						<p>— {entry.date}</p>
						<p>{entry.text}</p>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	div.display-container {
		position: absolute;
		top: 0;
		height: calc(100% - 5rem);
		width: 100%;
	}

	div.display-switch {
		position: absolute;
		z-index: 10;
		left: 50%;
		margin-top: 0.5rem;
		transform: translateX(-50%);
		width: fit-content;
		border-radius: calc(var(--spc-corner-radius) * 2);
		padding: var(--spc-gap);
		display: flex;
		gap: var(--spc-gap);
	}

	div.display-switch button:active {
		opacity: 1;
	}

	div.display-switch button.opacity {
		opacity: 0.5;
	}

	div.display-switch button:focus {
		outline: none;
	}

	div.display-switch button:active {
		opacity: 1;
	}

	h3.spot-name {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 4rem;
		color: var(--clr-dark-green);
		z-index: 10;
	}

	div.display-map {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: var(--clr-off-white);
	}

	/* Test for dev */
	div.display-map img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	div.display-info {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		background-color: #eaeaeaad;
		overflow-y: auto;
		scroll-behavior: smooth;
		padding: 7rem 2rem 4rem 2rem;
		scrollbar-width: thin;
		scrollbar-color: var(--clr-darker-green) var(--clr-off-white);
	}

	div.display-info::-webkit-scrollbar {
		width: 9px;
	}

	div.display-info::-webkit-scrollbar-track {
		background-color: var(--clr-off-white);
	}

	div.display-info::-webkit-scrollbar-thumb {
		background-color: var(--clr-darker-green);
	}

	div.display-info button.btn-rnd {
		padding: 0.25rem;
		height: 1.5rem;
	}

	div.display-info .display-info__heading {
		width: fit-content;
		height: fit-content;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	div.display-info h3,
	div.display-info p {
		color: var(--clr-dark-green);
	}

	div.display-info p {
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	@media screen and (min-width: 768px) {
		div.display-container {
			height: 100%;
			max-height: 100%;
			width: calc(100% - 20vw);
			translate: 20vw;
		}

		div.display-info h3,
		h3.spot-name {
			font-size: 1.4em;
		}
		div.display-info p {
			font-size: 1.2em;
		}
	}
</style>
