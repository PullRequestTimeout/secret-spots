<script>
	import Icon from "$lib/components/Icon.svelte";

	export let innerText = "";
	export let svg = "";
	export let url = "";
	export let className = "";
</script>

<a href={url} class={className + " btn"}>
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
</style>
