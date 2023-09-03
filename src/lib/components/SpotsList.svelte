<script>
	// export let currentSpot;
</script>

<div class="listContainer" />

<style>
	div.listContainer {
		position: relative;
		background-color: var(--clr-cream);
		width: 100%;
		height: 15vh;
		border-top: solid 3px var(--clr-dark-green);
	}

	@media screen and (min-width: 768px) {
		div.listContainer {
			border-top: none;
			border-right: solid 3px var(--clr-dark-green);
			width: 20vw;
			height: 100%;
		}
	}
</style>
