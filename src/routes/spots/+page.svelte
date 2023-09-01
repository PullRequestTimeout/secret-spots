<script>
	import { auth } from "$lib/firebase/firebase";
	import { onMount } from "svelte";
	import Loading from "$lib/components/Loading.svelte";
	import IconButton from "$lib/components/IconButton.svelte";
	import NewSpot from "$lib/components/NewSpot.svelte";
	import { fade } from "svelte/transition";
	import Icon from "../../lib/components/Icon.svelte";

	// Returns new spot from the NewSpot component
	let addSpot;
	$: if (addSpot) {
		console.log(addSpot);
	}

	let loading = true;
	let displayName;

	onMount(() => {
		// Gets initial auth state and then sets an observer for changes
		auth.onAuthStateChanged(() => {
			console.log(auth.currentUser);
			displayName = auth.currentUser.displayName;
			loading = false;
		});
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
			<h2>Welcome, {displayName}!</h2>
			<p>Add a spot to get started</p>
			<IconButton
				svg={"/icons/add_icon.svg"}
				innerText={"Add Spot"}
				className={"btn-red"}
				callback={handleOpen}
			/>
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
</style>
