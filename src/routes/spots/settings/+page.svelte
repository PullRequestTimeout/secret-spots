<script>
	import Toggle from "$lib/components/Toggle.svelte";
	import DropDown from "$lib/components/DropDown.svelte";
	import Chalk from "./Chalk.svelte";
	import { userSpots } from "$lib/stores/userDataStore.js";
</script>

<main>
	<section>
		<div class="settings-heading">
			<h2>Currently a component playground</h2>
			<div class="chalk-wrapper"><Chalk /></div>
		</div>
	</section>
</main>
<Toggle />
<DropDown />

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* section{} */

	.settings-heading {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	h2 {
		color: var(--clr-dark-green);
	}

	.chalk-wrapper {
		width: 15rem;
		translate: 0 0.1rem;
	}
</style>
