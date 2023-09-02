<script>
	import IconButton from "$lib/components/IconButton.svelte";
	import Loading from "$lib/components/Loading.svelte";
	import { fade } from "svelte/transition";
	import { clickOutside } from "$lib/utils/click_outside.js";
	import IconSelector from "$lib/components/IconSelector.svelte";

	export let isOpen;
	export let spot = null;

	let lat = "";
	let long = "";
	let spotName = "";
	let spotDetails = "";
	let icon;

	let details = false;
	let loadLoc = false;
	let err = false;
	let errorMessage = "";

	function getLocation() {
		const success = (pos) => {
			lat = pos.coords.latitude;
			long = pos.coords.longitude;
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
			err = false;
		}
	}

	function handleClose() {
		isOpen = false;
		details = false;
		lat = "";
		long = "";
		errorMessage = "";
		spotName = "";
		spotDetails = "";
	}

	function createSpot() {
		if (!spotName || !spotDetails) {
			err = true;
			errorMessage = "Spots need both a name and details.";
			return;
		} else {
			err = false;
			spot = {
				lat: lat,
				long: long,
				spotName: spotName,
				icon: icon,
				spotDetails: spotDetails
			};
			handleClose();
		}
	}
</script>

{#if isOpen}
	<div
		class="srfc"
		transition:fade={{ duration: 200 }}
		use:clickOutside
		on:outclick={() => {
			isOpen = false;
		}}
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
				<IconSelector bind:currentIcon={icon} />
				<label>
					<textarea
						type="text"
						placeholder="Spot Details"
						bind:value={spotDetails}
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
</style>
