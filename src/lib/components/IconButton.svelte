<script>
	export let innerText = "";
	export let svg = "";
	export let callback = () => {};
	export let className = "";
</script>

<button on:click={callback} class={className + " btn"}>
	<img src={svg} alt="button icon" />
	{innerText}
</button>

<style>
	button {
		user-select: none;
	}

	button:hover {
		cursor: pointer;
	}

	button img {
		width: 2rem;
		filter: invert(1);
	}
</style>
