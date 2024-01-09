<script>
	export let checked = false;
</script>

<label class:checked>
	<input type="checkbox" bind:checked />
</label>

<style>
	input[type="checkbox"] {
		display: none;
	}

	label {
		margin: 2rem;
		display: inline-block;
		width: 4rem;
		height: 2rem;
		background-color: var(--clr-white);
		border: 3px solid var(--clr-dark-green);
		border-radius: 1rem;
		position: relative;
		cursor: pointer;
	}

	label::after {
		content: "";
		position: absolute;
		top: 0.2rem;
		left: 0.25rem;
		width: 1.25rem;
		height: 1.25rem;
		background-color: var(--clr-dark-green);
		border-radius: 50%;
		transition: transform 0.2s ease-in-out;
	}

	label.checked {
		background-color: var(--clr-red);
	}

	label.checked::after {
		transform: translateX(2rem);
	}
</style>
