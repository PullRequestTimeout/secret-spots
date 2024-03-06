<script>
	// Auth
	import { auth } from "$lib/firebase/firebase.js";
	import { onAuthStateChanged } from "firebase/auth";

	// DB
	import { checkUser } from "$lib/firebase/db.js";

	// Stores
	import { userSpots } from "$lib/stores/userDataStore.js";
	import { authStore } from "$lib/stores/authStore.js";
	import { loading } from "$lib/stores/uiStore.js";

	// Svelte
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	// Components
	import IconButton from "$lib/components/IconButton.svelte";
	import NewSpot from "$lib/components/NewSpot.svelte";
	import SpotsDashboard from "$lib/components/SpotsDashboard.svelte";
	import Icon from "$lib/components/Icon.svelte";

	// NewSpot state
	let isOpen = false;
	function handleOpen() {
		isOpen = !isOpen;
	}

	onMount(() =>
		onAuthStateChanged(auth, (user) => {
			if (user) {
				checkUser();
			}
		})
	);
</script>

<main>
	<div transition:fade={{ duration: 200 }}>
		{#if $userSpots.length > 0}
			<SpotsDashboard />
			<button on:click={handleOpen} class="small-add-spot btn btn-rnd btn-red">
				<Icon name="add" size="32" />
			</button>
		{:else}
			{#if $authStore.displayName}
				<h2>Welcome, {$authStore.displayName}!</h2>
			{/if}
			<p>Add a spot to get started</p>
			<IconButton svg={"add"} innerText={"Add Spot"} className={"btn-red"} callback={handleOpen} />
		{/if}
		<NewSpot bind:isOpen />
	</div>
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	main div {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
	}

	main h2 {
		font-size: 2rem;
		line-height: 1;
	}

	main h2,
	main p {
		color: var(--clr-dark-green);
		text-align: center;
	}

	button.small-add-spot {
		position: fixed;
		top: 5rem;
		right: 1.25rem;
		width: 2.5rem;
		box-shadow: var(--bx-shdw);
	}
</style>
