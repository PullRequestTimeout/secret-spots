<script>
	import IconButton from "$lib/components/IconButton.svelte";
	import { fade } from "svelte/transition";
	import { clickOutside } from "$lib/utils/click_outside.js";

	export let isOpen;

	let lat;
	let long;
	let err = false;
	function getLocation() {
		const success = (pos) => {
			lat = pos.coords.latitude;
			long = pos.coords.longitude;
			console.log(lat, long);
		};
		const error = () => {
			err = true;
		};
		navigator.geolocation.getCurrentPosition(success, error);
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
		<IconButton
			innerText={"Get Current Location"}
			svg={"/icons/location_icon.svg"}
			callback={getLocation}
			className={"btn-red"}
		/>
		{#if err}
			<p>Location is unavailable.</p>
		{/if}
		<p>Or</p>
		<form>
			<label>
				<input type="text" placeholder="Longtitude" bind:value={long} class="txt-inp" />
			</label>
			<label>
				<input type="text" placeholder="Latitude" bind:value={lat} class="txt-inp" />
			</label>
		</form>
	</div>
{/if}

<style>
	div {
		position: absolute;
		width: 20rem;
		max-width: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	div p {
		font-size: 1.2rem;
		font-weight: bold;
	}

	div form {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spc-gap);
	}
</style>
