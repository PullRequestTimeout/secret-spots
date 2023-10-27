<script>
	import { fade } from "svelte/transition";
	import Icon from "./Icon.svelte";

	// export let currentSpot = {};

	let map = true;
	let journals = true;
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
	<h3 class="spot-name">Swimming Spot</h3>
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
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet sapiente a ducimus
				asperiores aperiam odio recusandae neque, in ullam magni! Impedit, mollitia cumque.
				Asperiores saepe suscipit corporis dolorem consequuntur impedit.
			</p>
			{#if journals}
				<div class="display-info__heading">
					<h3>Journal Entries</h3>
					<button class="btn btn-rnd btn-red"><Icon name="add" size="16" /></button>
				</div>
				<div>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi praesentium ipsam fugiat
						quod ratione non magnam, omnis nostrum iste at.
					</p>
				</div>

				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi praesentium ipsam fugiat
					quod ratione non magnam, omnis nostrum iste at.
				</p>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi praesentium ipsam fugiat
					quod ratione non magnam, omnis nostrum iste at.
				</p>
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
		background-color: var(--clr-cream);
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

		div.display-info h3 {
			font-size: 1.4em;
		}
		div.display-info p {
			font-size: 1.2em;
		}
	}
</style>
