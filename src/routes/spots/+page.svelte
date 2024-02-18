<script>
	import { onMount } from "svelte";
	import Loading from "$lib/components/Loading.svelte";
	import IconButton from "$lib/components/IconButton.svelte";
	import NewSpot from "$lib/components/NewSpot.svelte";
	import { fade } from "svelte/transition";
	import SpotsDashboard from "$lib/components/SpotsDashboard.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import { userSpots } from "$lib/stores/userDataStore.js";
	import { authStore } from "$lib/stores/authStore.js";

	// Returns new spot from the NewSpot component
	let addSpot;
	$: if (addSpot) {
		console.log(addSpot);
	}

	// Needs to be refactored out into the loading component and loading store
	let loading = true;
	$: displayName = $authStore.displayName;

	onMount(() => {
		loading = false;
	});

	let isOpen = false;
	function handleOpen() {
		isOpen = !isOpen;
	}
</script>

<main>
	{#if loading}
		<!-- Loading animation -->
		<Loading />
	{:else if !loading}
		<div transition:fade={{ duration: 200 }}>
			{#if $userSpots.length > 0}
				<SpotsDashboard />
				<button on:click={handleOpen} class="small-add-spot btn btn-rnd btn-red">
					<Icon name="add" size="32" />
				</button>
			{:else}
				{#if displayName}
					<h2>Welcome, {displayName}!</h2>
				{/if}
				<p>Add a spot to get started</p>
				<IconButton
					svg={"add"}
					innerText={"Add Spot"}
					className={"btn-red"}
					callback={handleOpen}
				/>
			{/if}
			<NewSpot bind:isOpen bind:spot={addSpot} />
		</div>
	{/if}
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
