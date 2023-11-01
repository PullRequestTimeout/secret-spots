<script>
	import IconButton from "$lib/components/IconButton.svelte";
	import Loading from "$lib/components/Loading.svelte";
	import { fade } from "svelte/transition";
	import { clickOutside } from "$lib/utils/click_outside.js";
	import IconSelector from "$lib/components/IconSelector.svelte";
	import { userSpots, activeSpot } from "$lib/stores/userDataStore.js";

	export let isOpen;
	export let spot = null;

	let lat = "";
	let long = "";
	let spotName = "";
	let description = "";
	let iconName;

	let details = false;
	let loadLoc = false;
	let err = false;
	let errorMessage = "";

	let translate = false;
	$: if ($userSpots.length > 0) {
		translate = true;
	}

	function getLocation() {
		err = false;
		errorMessage = "";
		const success = (pos) => {
			lat = pos.coords.latitude;
			long = pos.coords.longitude;
			clearError();
			loadLoc = false;
		};
		const error = () => {
			err = true;
			errorMessage = "Location is unavailable.";
			loadLoc = false;
		};
		loadLoc = true;
		navigator.geolocation.getCurrentPosition(success, error);
	}

	function handleDetails() {
		if (!lat || !long) {
			err = true;
			errorMessage = "Spots need both a latitude and longitude.";
		} else {
			details = true;
			clearError();
		}
	}

	function handleClose() {
		clearError();
		isOpen = false;
		details = false;
		lat = "";
		long = "";
		spotName = "";
		description = "";
		iconName = "secret";
	}

	function clearError() {
		errorMessage = "";
		err = false;
	}

	function createSpot() {
		if (!spotName || !description) {
			err = true;
			errorMessage = "Spots need both a name and details.";
			return;
		} else {
			spot = {
				lat: lat,
				long: long,
				spotName: spotName,
				iconName: iconName,
				description: description,
				journalEntries: []
			};
			clearError();
			updateActiveSpot();
			addSpotToStore();
			handleClose();
		}

		function addSpotToStore() {
			userSpots.update((objects) => {
				return [...objects, spot];
			});
		}

		function updateActiveSpot() {
			activeSpot.set(spotName);
		}
	}
</script>

{#if isOpen}
	<div
		class="srfc"
		class:translate
		transition:fade={{ duration: 200 }}
		use:clickOutside
		on:outclick={handleClose}
	>
		{#if !details}
			<h3>Add New Spot</h3>
			<IconButton
				innerText={"Get Current Location"}
				svg={"location"}
				callback={getLocation}
				className={"btn-red"}
			/>

			<p>Or</p>
			<form>
				<label>
					<input type="text" placeholder="Longtitude" bind:value={long} class="txt-inp" />
				</label>
				<label>
					<input type="text" placeholder="Latitude" bind:value={lat} class="txt-inp" />
				</label>
			</form>
			{#if loadLoc}
				<Loading />
			{:else}
				<div>
					<IconButton
						svg={"add"}
						innerText={"Add Spot"}
						className={"btn-green"}
						callback={handleDetails}
					/>
					<button on:click={handleClose}>Cancel</button>
				</div>
			{/if}
		{:else if details}
			<h3>Add Spot Details</h3>
			<form>
				<label>
					<input type="text" placeholder="Spot Name" bind:value={spotName} class="txt-inp" />
				</label>
				<IconSelector bind:currentIcon={iconName} />
				<label>
					<textarea
						type="text"
						placeholder="Spot Details"
						bind:value={description}
						class="txt-inp"
					/>
				</label>
			</form>
			<div>
				<IconButton
					svg={"add"}
					innerText={"Add Spot"}
					className={"btn-green"}
					callback={createSpot}
				/>
				<button on:click={handleClose}>Cancel</button>
			</div>
		{/if}
		{#if err}
			<p transition:fade={{ duration: 200 }} class="error">{errorMessage}</p>
		{/if}
	</div>
{/if}

<style>
	div.srfc {
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

	div.srfc textarea {
		max-width: 100%;
		max-height: 15rem;
	}

	div.srfc p,
	div.srfc h3 {
		text-align: center;
	}

	div.srfc p {
		font-size: 1.2rem;
		font-weight: bold;
	}

	div.srfc p.error {
		font-size: 1rem;
		font-weight: 400;
		color: var(--clr-red);
	}

	div.srfc h3 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
		color: var(--clr-dark-green);
	}

	div.srfc form {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spc-gap);
	}

	div.srfc div {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	div.srfc div button {
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

	div.srfc div button:hover {
		cursor: pointer;
	}

	@media screen and (min-width: 768px) {
		.translate {
			translate: 10vw;
		}
	}
</style>
