<script>
	import { userSpots, activeSpot, userPref } from "$lib/stores/userDataStore.js";
	import { fade } from "svelte/transition";
	import { clickOutside } from "$lib/utils/click_outside.js";
	import Icon from "$lib/components/Icon.svelte";
	import IconButton from "$lib/components/IconButton.svelte";
	import Loading from "$lib/components/Loading.svelte";
	import DatePicker from "$lib/components/DatePicker.svelte";

	let description = "";
	let journalEntries = [];
	$: if ($userSpots.length > 0 && $activeSpot) {
		description = $userSpots.find((x) => x.spotName === $activeSpot).description;
		journalEntries = $userSpots.find((x) => x.spotName === $activeSpot).journalEntries;
	}

	// Recieves the date from the DatePicker component
	let d;
	let m;
	let y;
	$: dateObj = { d, m, y };
	// $: console.log(dateObj);

	let map = true;
	let error = "";

	let editDescriptionModal = false;
	let newDescription = "";
	function handleCloseDescription() {
		editDescriptionModal = false;
		newDescription = "";
	}

	function editDescription(spotName, newDescription) {
		if (newDescription.length < 1) {
			error = "Spot description cannot be blank.";
		} else {
			error = "";
			userSpots.update((spotList) => {
				// Find the spot with the activeSpot store value and update its description
				const updatedSpotList = spotList.map((spot) => {
					if (spot.spotName === spotName) {
						return { ...spot, description: newDescription };
					}
					return spot;
				});
				return updatedSpotList;
			});
		}
		handleCloseDescription();
	}

	let newJournalEntryModal = false;
	let newJournalEntry = "";
	$: newJournalEntryDate = { d, m, y };
	function handleCloseJournal() {
		error = "";
		newJournalEntryModal = false;
		newJournalEntry = "";
	}

	function addJournalEntry(spotName, date, newJournalEntry) {
		if (newJournalEntry.length < 1) {
			error = "Journal entries cannot be blank.";
		} else {
			error = "";
			userSpots.update((spotList) => {
				// Find the spot with the activeSpot store value and add the new dated journal entry
				const updatedSpotList = spotList.map((spot) => {
					if (spot.spotName === spotName) {
						return {
							...spot,
							journalEntries: [...journalEntries, { date: date, journalEntry: newJournalEntry }]
						};
					}
					return spot;
				});
				return updatedSpotList;
			});
			handleCloseJournal();
		}
	}

	function displayDate(d, m, y) {
		// Get user pref store value
		const datePref = $userPref.date;

		if (datePref === "dmy") {
			// Display day, month, year
			return `${d} ${m} ${y}`;
		} else if (datePref === "mdy") {
			// Display month, day, year
			return `${m} ${d} ${y}`;
		} else if (datePref === "ymd") {
			// Display year, month, day
			return `${y} ${m} ${d}`;
		}
	}
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
				<button class="btn btn-rnd btn-red" on:click={() => (editDescriptionModal = true)}
					><Icon name="edit" size="16" /></button
				>
			</div>
			{#if description === undefined || null}
				<p>There doesn't seem to be a description for this spot. Add one with the pencil icon.</p>
			{:else}
				<p>{description}</p>
			{/if}

			<div class="display-info__heading">
				<h3>Journal Entries</h3>
				<button class="btn btn-rnd btn-red" on:click={() => (newJournalEntryModal = true)}
					><Icon name="add" size="16" /></button
				>
			</div>
			{#if journalEntries.length < 1}
				<p>Add your first journal entry.</p>
			{:else}
				{#each journalEntries as entry}
					<div class="journal-entry">
						<p>— {displayDate(entry.date.d, entry.date.m, entry.date.y)}</p>
						<p>{entry.journalEntry}</p>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
	<div class="modal-container">
		{#if editDescriptionModal}
			<div
				transition:fade={{ duration: 200 }}
				class="srfc modal"
				use:clickOutside
				on:outclick={handleCloseDescription}
			>
				<h3>Update Description</h3>
				<textarea
					type="text"
					placeholder="New Description"
					bind:value={newDescription}
					class="txt-inp"
				/>
				<div>
					<IconButton
						svg={"edit"}
						innerText={"Update"}
						className={"btn-green"}
						callback={() => editDescription($activeSpot, newDescription)}
					/>
					<button on:click={handleCloseDescription}>Cancel</button>
				</div>
				{#if error}
					<p class="error">{error}</p>
				{/if}
			</div>
		{/if}
		{#if newJournalEntryModal}
			<div
				transition:fade={{ duration: 200 }}
				class="srfc modal"
				use:clickOutside
				on:outclick={handleCloseJournal}
			>
				<h3>New Journal Entry</h3>
				<!-- <input type="text" placeholder="Date" bind:value={newJournalEntryDate} class="txt-inp" /> -->
				<DatePicker bind:d bind:m bind:y />
				<textarea
					type="text"
					placeholder="Journal Entry"
					bind:value={newJournalEntry}
					class="txt-inp"
				/>
				<div>
					<IconButton
						svg={"add"}
						innerText={"Add Entry"}
						className={"btn-green"}
						callback={() => addJournalEntry($activeSpot, newJournalEntryDate, newJournalEntry)}
					/>
					<button on:click={handleCloseJournal}>Cancel</button>
				</div>
				{#if error}
					<p class="error">{error}</p>
				{/if}
			</div>
		{/if}
	</div>
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

	div.modal-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div.modal {
		position: absolute;
		z-index: 100;
		width: 20rem;
		max-width: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--spc-gap);
	}

	div.modal h3 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
		color: var(--clr-dark-green);
	}

	div.modal p,
	div.modal h3 {
		text-align: center;
	}

	div.modal p.error {
		font-size: 1rem;
		font-weight: 400;
		color: var(--clr-red);
	}

	div.modal textarea {
		max-width: 100%;
		max-height: 15rem;
	}

	div.modal div {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	div.modal div button {
		font-size: 1rem;
		font-weight: bold;
		height: fit-content;
		border: none;
		padding: 0;
		margin: 0;
		background-color: transparent;
		color: var(--clr-red);
		text-decoration: underline;
	}

	div.modal div button:hover {
		cursor: pointer;
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
