<script context="module">
	import { writable } from "svelte/store";
	export const showIntro = writable(false);
</script>

<script>
	import { fade } from "svelte/transition";

	let introPage = 1;
	function closeIntro() {
		introPage = 1;
		showIntro.set(false);
	}
</script>

{#if $showIntro}
	<div class="overlay" transition:fade={{ duration: 200 }}>
		{#if introPage === 1}
			<div class="srfc intro" transition:fade={{ duration: 200 }}>
				<h2>Welcome to Secret Spots</h2>
				<p>
					Secret Spots is an app to keep track of your favourite places you've been while camping,
					hiking, eating out, or a whole range of other adventures.
				</p>
				<p>
					It's a great way to keep an organised logbook for yourself without advertising your spots
					to the public.
				</p>
				<button
					class="btn btn-red"
					on:click={() => {
						introPage = 2;
					}}>Next</button
				>
			</div>
		{:else if introPage === 2}
			<div class="srfc intro" transition:fade={{ duration: 200 }}>
				<h2>Install as a PWA</h2>
				<p>
					To make the most of Secret Spots, you can install it as a PWA (Progressive Web App) on
					your device.
				</p>
				<p>
					By installing it as a PWA, you can access it from your home screen, and some features will
					be available offline.
				</p>
				<p>
					To install it, click on the install button in the address bar of your browser or 'Add to
					Home Screen' in the browser menu.
				</p>
				<div class="button-group">
					<button
						class="btn btn-red"
						on:click={() => {
							introPage = 1;
						}}>Back</button
					>
					<button
						class="btn btn-red"
						on:click={() => {
							introPage = 3;
						}}>Next</button
					>
				</div>
			</div>
		{:else if introPage === 3}
			<div class="srfc intro" transition:fade={{ duration: 200 }}>
				<h2>Adding a Spot</h2>
				<p>
					To add a spot, click on the 'Add Spot' button in main dashboard. Or if you already have
					spots added, use the button with the plus icon in the top right corner.
				</p>
				<p>
					Add a name for the spot, a description, and select an icon to denote the spot catagory.
				</p>
				<p>
					Once you add more spots, you can use the sorting menu and search bar on the left to find
					the spot you're looking for.
				</p>
				<div class="button-group">
					<button
						class="btn btn-red"
						on:click={() => {
							introPage = 2;
						}}>Back</button
					>

					<button class="btn btn-red" on:click={closeIntro}>Ok, got it!</button>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.intro {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 30rem;
		max-width: 90%;
		padding: 1rem;
	}

	.intro h2 {
		color: var(--clr-dark-green);
	}

	.intro p,
	.intro h2 {
		text-align: center;
	}

	.button-group {
		display: flex;
		gap: 1rem;
	}
</style>
