<script>
	import Icon from "$lib/components/Icon.svelte";

	export let innerText = "";
	export let svg = "";
	export let url = "";
	export let className = "";
	export let responsive = false;
</script>

<a href={url} class={className + " btn"} class:responsive aria-label={innerText}>
	<Icon name={svg} />
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

	a.responsive {
		font-size: 0;
	}

	@media screen and (min-width: 768px) {
		a.responsive {
			font-size: unset;
		}
	}
</style>
