<script>
	import { authStore, authHandlers } from "$lib/stores/store.js";
	import { fade } from "svelte/transition";
	import { clickOutside } from "$lib/utils/click_outside.js";

	let menuOpen = false;
	function handleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<header>
	<h1>Secret Spots</h1>
	<nav
		use:clickOutside
		on:outclick={() => {
			if (menuOpen == true) {
				handleMenu();
			}
		}}
	>
		<button aria-label="menu button" on:click={handleMenu} class="btn-green">
			<div class:active={menuOpen} />
		</button>
		{#if menuOpen}
			<ul transition:fade={{ duration: 200 }}>
				{#if $authStore.user == null}
					<li>
						<a on:click={handleMenu} href="/login"
							><img src="/icons/login-green_icon.svg" alt="Login icon" />Login</a
						>
					</li>
					<li>
						<a on:click={handleMenu} href="/register"
							><img src="/icons/register-green_icon.svg" alt="Register icon" />Register</a
						>
					</li>
				{:else if $authStore.user}
					<li>
						<a on:click={handleMenu} href="/account"
							><img src="/icons/person-green_icon.svg" alt="Account icon" />Account</a
						>
					</li>
					<li>
						<a on:click={handleMenu} href="/settings"
							><img src="/icons/settings-green_icon.svg" alt="Settings icon" />Settings</a
						>
					</li>
					<li>
						<a href="/" on:click={handleMenu} on:click={authHandlers.logout}
							><img src="/icons/logout-green_icon.svg" alt="Logout icon" />Logout</a
						>
					</li>
				{/if}
			</ul>
		{/if}
	</nav>
</header>

<style>
	header {
		position: fixed;
		z-index: 10;
		width: 100%;
		display: flex;
		background-color: var(--clr-dark-green);
		color: var(--clr-white);
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
	}

	header button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		border: none;
		border-radius: 50%;
		width: 3rem;
		aspect-ratio: 1;
	}

	header button:hover {
		cursor: pointer;
	}

	header nav button div {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 60%;
	}

	header nav button div,
	header nav button div::after,
	header nav button div::before {
		background-color: var(--clr-white);
		height: 3px;
		border-radius: 2px;
		transition-duration: 200ms;
	}

	header nav button div::after,
	header nav button div::before {
		content: "";
		position: absolute;
		width: 100%;
	}

	header nav button div::after {
		transform: translateY(-0.5rem);
	}

	header nav button div::before {
		transform: translateY(0.5rem);
	}

	header nav button div.active {
		background-color: transparent;
	}

	header nav button div.active::before,
	header nav button div.active::after {
		background-color: var(--clr-white);
		height: 3px;
	}

	header nav button div.active::before {
		transform: rotate(45deg);
	}

	header nav button div.active::after {
		transform: rotate(-45deg);
	}

	header nav ul {
		position: absolute;
		right: 2rem;
		top: 6rem;
		background-color: var(--clr-cream);
		color: var(--clr-dark-green);
		height: fit-content;
		padding: 2rem 2rem 2rem 1.5rem;
		border-radius: var(--spc-corner-radius);
		border: 2px solid var(--clr-dark-green);
		box-shadow: var(--bx-shdw);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	header nav a {
		font-size: 1.2rem;
		font-weight: bold;
		color: var(--clr-dark-green);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
	}

	header nav a img {
		width: 2rem;
	}

	header nav li {
		list-style: none;
	}
</style>
