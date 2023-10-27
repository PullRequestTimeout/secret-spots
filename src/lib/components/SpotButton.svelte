<script>
	import Icon from "$lib/components/Icon.svelte";
	export let iconName;
	export let spotName;
	export let active = false;
</script>

<button on:click={() => (active = !active)} class="spot-button" class:active>
	<Icon name={iconName} />
	<span>{spotName}</span>
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
		min-width: 4rem;
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
		z-index: 10;
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

	.spot-button span {
		display: none;
	}

	@media screen and (min-width: 768px) {
		.spot-button {
			min-height: 4rem;
			height: 4rem;
		}

		.spot-button span {
			display: block;
			font-size: 1.2rem;
			color: var(--clr-white);
			font-weight: bold;
			margin-left: 1rem;
		}

		.spot-button:before {
			rotate: 90deg;
			top: -2px;
			left: unset;
			right: -32px;
		}
	}
</style>
