<script>
	export let innerText = "";
	export let svg = "";
	export let url = "";
	export let className = "";
</script>

<a href={url} class={className}>
	<img src={svg} alt="button icon" />
	{innerText}
</a>

<style>
	a {
		text-decoration: none;
		font-weight: bold;
		width: fit-content;
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		align-items: center;
		padding: 0.5rem 1rem;
		color: white;
	}

	a,
	a:visited {
		color: var(--clr-white, white);
	}

	a img {
		width: 2rem;
		filter: invert(1);
	}
</style>
