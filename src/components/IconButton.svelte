<script>
	export let innerText = "";
	export let svg = "";
</script>

<button>
	<img src={svg} alt="button icon" />
	{innerText}
</button>

<style>
	button {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		align-items: center;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
	}

	button:hover {
		cursor: pointer;
	}

	button img {
		width: 2rem;
	}
</style>
