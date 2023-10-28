<script>
	import { authStore, authHandlers } from "$lib/stores/authStore.js";
	import { fade } from "svelte/transition";
	import { clickOutside } from "$lib/utils/click_outside.js";
	import Icon from "$lib/components/Icon.svelte";

	let menuOpen = false;
	function handleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<header>
	<div class="logo">
		<Icon name={"logo"} size={24} />
		<h1>Secret Spots</h1>
	</div>
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
			<ul class="srfc" transition:fade={{ duration: 200 }}>
				{#if !$authStore.user || $authStore.emailVerified == false}
					<li>
						<a on:click={handleMenu} href="/login"
							><Icon name={"login"} color={"--clr-dark-green"} />Login</a
						>
					</li>
					<li>
						<a on:click={handleMenu} href="/register"
							><Icon name={"register"} color={"--clr-dark-green"} />Register</a
						>
					</li>
				{:else if $authStore.user}
					<li>
						<a href="/spots" on:click={handleMenu}
							><Icon name={"secret"} color={"--clr-dark-green"} />Spots</a
						>
					</li>
					<li>
						<a on:click={handleMenu} href="/account"
							><Icon name={"person"} color={"--clr-dark-green"} />Account</a
						>
					</li>
					<li>
						<a on:click={handleMenu} href="/settings"
							><Icon name={"settings"} color={"--clr-dark-green"} />Settings</a
						>
					</li>
					<li>
						<a href="/" on:click={handleMenu} on:click={authHandlers.logout}
							><Icon name={"logout"} color={"--clr-dark-green"} />Logout</a
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

	header .logo {
		user-select: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
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
		padding: 2rem 2rem 2rem 1.5rem;
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

	header nav li {
		list-style: none;
	}
</style>
