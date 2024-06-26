<script>
	// Components
	import IconButton from "$lib/components/IconButton.svelte";
	import Loader from "$lib/components/Loader.svelte";
	import IconSelector from "$lib/components/IconSelector.svelte";
	import Tooltip from "$lib/components/Tooltip.svelte";

	// Svelte
	import { fade } from "svelte/transition";

	// Stores
	import { userSpots, activeSpot } from "$lib/stores/userDataStore.js";
	import { setAlertMessage } from "$lib/stores/uiStore.js";

	// Utils
	import { clickOutside } from "$lib/utils/click_outside.js";

	// Props
	export let isOpen;
	export let spot = null;

	let lat = "";
	let long = "";
	let coords = "";
	let spotName = "";
	let description = "";
	let iconName;
	let starRating = 0;

	let details = false;
	let loadLoc = false;
	let err = false;
	let errorMessage = "";

	// Moves modal to centre of spots display
	let translate = false;
	$: if ($userSpots.length > 0) {
		translate = true;
	} else {
		translate = false;
	}

	function getLocation() {
		err = false;
		errorMessage = "";
		const success = (pos) => {
			lat = pos.coords.latitude;
			long = pos.coords.longitude;
			coords = `${lat}, ${long}`;
			clearError();
			loadLoc = false;
		};
		const error = () => {
			err = true;
			errorMessage = "Location unavailable, make sure privileges are enabled.";
			loadLoc = false;
		};
		loadLoc = true;
		navigator.geolocation.getCurrentPosition(success, error);
	}

	function handleDetails() {
		if (!lat || !long || !coords) {
			err = true;
			errorMessage = "Spots need a set of coordinates.";
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
		coords = "";
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
			if (isSpotNameInUse(spotName)) {
				err = true;
				errorMessage = "Spot name already in use.";
				return;
			}
			// Schema for spot in the DB
			spot = {
				lat: Number(lat),
				long: Number(long),
				spotName: spotName,
				iconName: iconName,
				starRating: starRating,
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
			setAlertMessage("New spot added.");
		}

		// Updates active spot store so the most recently added spot is active after adding.
		function updateActiveSpot() {
			activeSpot.set(spotName);
		}
	}

	// Spot names are used in all updating functions so should be unique
	function isSpotNameInUse(desiredName) {
		let inUse = false;
		$userSpots.forEach((spot) => {
			if (spot.spotName.toLowerCase() === desiredName.toLowerCase()) {
				inUse = true;
			}
		});
		return inUse;
	}

	function handleCoordsInput(coordsString) {
		if (isValidCoordinates(coordsString)) {
			const parsed = parseCoordinates(coordsString);
			lat = parsed.lat;
			long = parsed.long;
			clearError();
		} else {
			err = true;
			errorMessage = "Invalid coordinates";
		}
	}

	function isValidCoordinates(coordinates) {
		const regex =
			/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
		return regex.test(coordinates.replace(/[() ]/g, ""));
	}

	// A function to parse a string of coordinates into a lat and long, stripping parentheses and spaces
	function parseCoordinates(coordinates) {
		const parsed = coordinates.replace(/[() ]/g, "").split(",");
		return {
			lat: parsed[0],
			long: parsed[1]
		};
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
			<div class="coords">
				<form>
					<label>
						<input
							type="text"
							placeholder="Coords: eg. 49.19,-118.99"
							bind:value={coords}
							class="txt-inp"
							on:input={() => handleCoordsInput(coords)}
						/>
					</label>
				</form>
				<Tooltip
					text="Google Maps is a great source of coordinates, however input coordinates must be in the format '49.19, -118.99' for example. Alternate methods to input spots coming soon!"
				/>
			</div>
			{#if loadLoc}
				<Loader />
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
				<IconSelector bind:currentIcon={iconName} />
				<label>
					<!-- svelte-ignore a11y-autocomplete-valid -->
					<input
						type="text"
						placeholder="Spot Name"
						bind:value={spotName}
						class="txt-inp"
						name="/"
						autocomplete="new-password"
					/>
				</label>
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

	div.srfc div.coords {
		align-items: center;
		gap: 0.25rem;
		margin-top: 0;
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
