<script>
	import Icon from "$lib/components/Icon.svelte";
	export let iconName;
	let active = false;
</script>

<button on:click={() => (active = !active)} class="spot-button" class:active>
	<Icon name={iconName} />
</button>

<style>
	.spot-button {
		border: none;
		background: var(--clr-green);
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		position: relative;
		width: 4rem;
		transition-duration: 200ms;
	}

	.spot-button:focus {
		outline: none;
	}

	.spot-button:before {
		border-bottom: 35px solid var(--clr-green);
		border-left: 2rem solid transparent;
		border-right: 2rem solid transparent;
		content: "";
		height: 0;
		left: 0;
		position: absolute;
		top: -34px;
		width: 0;
		transition-duration: 200ms;
		transform: scaleY(0);
		transform-origin: bottom;
	}

	.spot-button.active {
		background: var(--clr-red);
	}

	.spot-button.active:before {
		border-bottom: 35px solid var(--clr-red);
		transform: scaleY(1);
	}
</style>
