<script>
	export let innerText = "";
	export let svg = "";
	export let url = "";
	export let className = "";
</script>

<a href={url} class={className + " btn"}>
	<img src={svg} alt="button icon" />
	{innerText}
</a>

<style>
	a {
		text-decoration: none;
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
