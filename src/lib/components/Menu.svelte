<script>
	import { authStore, authHandlers } from "$lib/stores/store.js";
	import { clickOutside } from "$lib/utils/click_outside.js";
	import { fade } from "svelte/transition";

	export let isOpen = false;
	function handleOpen() {
		isOpen = !isOpen;
	}

	let nav;
</script>

{#if isOpen}
	<nav
		transition:fade={{ duration: 200 }}
		bind:this={nav}
		use:clickOutside
		on:outclick={() => {
			isOpen = false;
		}}
	>
		{#if $authStore.user == null}
			<ul>
				<li>
					<a on:click={handleOpen} href="/login"
						><img src="/icons/login-green_icon.svg" alt="Login icon" />Login</a
					>
				</li>
			</ul>
		{:else if $authStore.user}
			<ul>
				<li>
					<a on:click={handleOpen} href="/account"
						><img src="/icons/person-green_icon.svg" alt="Account icon" />Account</a
					>
				</li>
				<li>
					<a on:click={handleOpen} href="/settings"
						><img src="/icons/settings-green_icon.svg" alt="Settings icon" />Settings</a
					>
				</li>
				<li>
					<a href="/" on:click={handleOpen} on:click={authHandlers.logout}
						><img src="/icons/logout-green_icon.svg" alt="Logout icon" />Logout</a
					>
				</li>
			</ul>
		{/if}
	</nav>
{/if}

<style>
	nav {
		position: absolute;
		right: 2rem;
		top: 6rem;
		background-color: var(--clr-cream);
		color: var(--clr-dark-green);
		height: fit-content;
		padding: 2rem 2rem 2rem 1.5rem;
		border-radius: var(--spc-corner-radius);
		border: 2px solid var(--clr-dark-green);
		box-shadow: 0 2px 0.2rem rgba(0, 0, 0, 0.5);
	}

	nav ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	nav a {
		font-size: 1.2rem;
		color: var(--clr-dark-green);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
	}

	nav a img {
		width: 2rem;
	}

	nav li {
		list-style: none;
	}
</style>
