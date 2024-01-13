<script>
	export let rating = 0;
	export let size = "30";
	export let inputColor = "var(--clr-dark-green)";

	function setRating(value) {
		rating = value;
	}

	const emptyStar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z"/></svg>`;
	const filledStar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" /></svg >`;
</script>

<div class="star-rating">
	{#each Array(5) as _, index}
		{#if index < rating}
			<button on:click={() => setRating(index + 1)}>{@html filledStar}</button>
		{:else}
			<button on:click={() => setRating(index + 1)}>{@html emptyStar}</button>
		{/if}
	{/each}
</div>

<style>
	.star-rating {
		width: fit-content;
	}

	.star-rating button {
		transition: none;
		border: none;
		background-color: transparent;
	}

	.star-rating button:active,
	.star-rating button:focus {
		outline: none;
	}
</style>
