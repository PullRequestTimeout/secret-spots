<script>
	import { fly } from "svelte/transition";
	import { alertMessage } from "$lib/stores/uiStore.js";
	import { clickOutside } from "$lib/utils/click_outside.js";

	function closeAlert() {
		alertMessage.set("");
	}
</script>

{#if !!$alertMessage}
	<div
		transition:fly={{ duration: 400, y: 10 }}
		use:clickOutside
		on:outclick={closeAlert}
		class="srfc alert"
	>
		<p>{$alertMessage}</p>
	</div>
{/if}

<style>
	div.alert {
		width: clamp(15rem, 20rem, 90%);
		text-align: center;
		position: absolute;
		z-index: 10000;
		top: 2rem;
		left: 50%;
		transform: translateX(-50%);
		padding: 1rem;
	}

	div.alert p {
		color: var(--clr-dark-green);
		font-size: 1.2rem;
		font-weight: bold;
	}

	@media screen and (min-width: 736px) {
		div.alert {
			top: unset;
			left: unset;
			transform: unset;
			bottom: 4rem;
			right: 4rem;
		}
	}
</style>
