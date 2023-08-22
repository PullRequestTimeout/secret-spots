<script>
	import { onMount } from "svelte";
	import { auth, db } from "../lib/firebase/firebase.js";
</script>

<header>
	<h1>Secret Spots</h1>
	<button aria-label="menu" />
</header>

<style>
	header {
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
		background-color: transparent;
		border: none;
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
	}

	header button:hover {
		cursor: pointer;
	}

	header button:hover,
	header button:active {
		background-color: var(--clr-red);
	}

	header button::after,
	header button::before {
		content: "";
		position: absolute;
		background-color: var(--clr-white);
		width: 75%;
		height: 3px;
		border-radius: 2px;
	}

	header button::after {
		transform: translateY(-0.4rem);
	}

	header button::before {
		transform: translateY(0.4rem);
	}
</style>
