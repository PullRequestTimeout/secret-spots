<script>
	import { fade } from "svelte/transition";
	import { clickOutside } from "$lib/utils/click_outside.js";
	import Icon from "$lib/components/Icon.svelte";
	import { userPref, searchTerm } from "$lib/stores/userDataStore.js";

	let menuOpen = false;
	let sortOptions = false;
	let searchBar = false;
	const closeAll = () => {
		menuOpen = false;
		sortOptions = false;
		searchBar = false;
	};

	$: if (searchBar === false) {
		setTimeout(() => {
			searchTerm.set("");
		}, 200);
	}

	// Focuses on the search input when the search bar is opened
	let searchInput;
	$: if (searchBar) {
		searchInput.focus();
	}

	const sortTypes = [
		{ display: "Default", sort: "default" },
		{ display: "Recent", sort: "recent" },
		{ display: "Alphabetical", sort: "alphabetical" },
		{ display: "Icon", sort: "icon" },
		// { display: "Closest To Me", sort: "closest" },
		{ display: "Highest Rated", sort: "highRating" },
		{ display: "Lowest Rated", sort: "lowRating" }
	];

	// Sort type button updates userPref "sort" value to the sort type
	function sortTypeButton(sortType) {
		userPref.update((pref) => {
			return { ...pref, sort: sortType };
		});
	}
</script>

<div use:clickOutside on:outclick={closeAll}>
	<div class="more-menu" class:open={menuOpen}>
		<div class="more-menu__slider">
			<button
				class="btn btn-red btn-rnd"
				on:click={() => {
					sortOptions = !sortOptions;
					if (searchBar) {
						searchBar = false;
					}
				}}><Icon name="sort" size="30" /></button
			>
			<button
				class="btn btn-red btn-rnd"
				on:click={() => {
					searchBar = !searchBar;
					if (sortOptions) {
						sortOptions = false;
					}
				}}><Icon name="search" size="30" /></button
			>
		</div>
		<button
			class="btn btn-red more-button"
			on:click={() => {
				menuOpen = !menuOpen;
				if (sortOptions || searchBar) {
					closeAll();
				}
			}}
		>
			<div class="more-menu__dots" />
		</button>
	</div>
	<div class="srfc sort-options" class:open={sortOptions} transition:fade={{ duration: 200 }}>
		{#each sortTypes as sortType}
			<button
				class="btn btn-green"
				on:click={() => {
					closeAll();
					sortTypeButton(sortType.sort);
				}}>{sortType.display}</button
			>
		{/each}
	</div>
	<div class="srfc search-bar" class:open={searchBar} transition:fade={{ duration: 200 }}>
		<input
			type="text"
			class="txt-inp"
			bind:this={searchInput}
			bind:value={$searchTerm}
			placeholder="Search..."
		/>
	</div>
</div>

<style>
	.more-menu,
	.more-menu__slider {
		position: fixed;
		z-index: 50;
		left: 0;
		bottom: 4rem;
	}

	.more-menu__slider {
		position: absolute;
		width: 10rem;
		height: 4.5rem;
		left: -10rem;
		bottom: 0;
		background-color: var(--clr-cream);
		border: 3px solid var(--clr-dark-green);
		border-left: none;
		border-right: none;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5);
	}

	.more-menu__slider button {
		padding: 0.5rem;
		box-shadow: var(--bx-shdw);
	}

	.more-menu.open {
		translate: 10rem 0;
	}

	.more-button {
		position: relative;
		z-index: 101;
		padding: 2rem 0.75rem;
		border-radius: 0 0.75rem 0.75rem 0;
		border-left: none;
		box-shadow: 2px 0 0.25rem rgba(0, 0, 0, 0.5);
	}

	.more-button:focus,
	.more-button:active,
	.more-menu__slider button:hover,
	.more-menu__slider button:focus {
		background-color: var(--clr-dark-red);
		outline: none;
	}

	.more-menu__dots,
	.more-menu__dots::after,
	.more-menu__dots::before {
		position: relative;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background-color: var(--clr-white);
	}

	.more-menu__dots::after,
	.more-menu__dots::before {
		content: "";
		position: absolute;
	}

	.more-menu__dots::after {
		translate: -0.25rem -1rem;
	}

	.more-menu__dots::before {
		translate: -0.25rem 1rem;
	}

	.sort-options {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.sort-options button {
		width: 100%;
	}

	.sort-options,
	.search-bar {
		position: absolute;
		z-index: 100;
		left: -100%;
		bottom: 6.5rem;
		padding: 1rem;
		border-left: none;
		border-radius: 0 0.75rem 0.75rem 0;
		transition: 0.5s;
	}

	.sort-options.open,
	.search-bar.open {
		left: 0;
	}

	@media screen and (max-width: 768px) {
		.more-button {
			padding: 2rem 0.5rem;
		}

		.more-menu {
			bottom: 11rem;
		}

		.sort-options,
		.search-bar {
			bottom: 13.5rem;
		}
	}
</style>
