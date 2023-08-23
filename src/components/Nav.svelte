<script>
	import { onMount } from "svelte";
	import { auth, db } from "../lib/firebase/firebase.js";

	let menuOpen = false;
	function handleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<header>
	<h1>Secret Spots</h1>
	<button aria-label="menu button" on:click={handleMenu} class="btn-green">
		<div class:active={menuOpen} />
	</button>
</header>

<style>
	header {
		position: relative;
		display: flex;
		background-color: var(--clr-dark-green);
		color: var(--clr-white);
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
	}

	header button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		border: none;
		border-radius: 50%;
		width: 3rem;
		aspect-ratio: 1;
	}

	header button:hover {
		cursor: pointer;
	}

	button div {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 60%;
	}

	button div,
	button div::after,
	button div::before {
		background-color: var(--clr-white);
		height: 3px;
		border-radius: 2px;
		transition-duration: 200ms;
	}

	button div::after,
	button div::before {
		content: "";
		position: absolute;
		width: 100%;
	}

	button div::after {
		transform: translateY(-0.5rem);
	}

	button div::before {
		transform: translateY(0.5rem);
	}

	button div.active {
		background-color: transparent;
	}

	button div.active::before,
	button div.active::after {
		background-color: var(--clr-white);
		height: 3px;
	}

	button div.active::before {
		transform: rotate(45deg);
	}

	button div.active::after {
		transform: rotate(-45deg);
	}
</style>
