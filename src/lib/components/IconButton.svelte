<script>
	import Icon from "$lib/components/Icon.svelte";

	export let innerText = "";
	export let svg = "";
	export let callback = () => {};
	export let className = "";
	export let iconColor = "--clr-white";
	export let iconSize = "32";
</script>

<button on:click={callback} class={className + " btn"}>
	<Icon name={svg} color={iconColor} size={iconSize} />
	{innerText}
</button>

<style>
	button {
		user-select: none;
	}

	button:hover {
		cursor: pointer;
	}

	/* button img {
		width: 2rem;
		filter: invert(1);
	} */
</style>
