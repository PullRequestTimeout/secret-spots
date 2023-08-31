<script>
	import { authStore } from "$lib/stores/store.js";
	import { authHandlers } from "$lib/stores/store";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import IconLink from "./IconLink.svelte";

	export let isOpen = false;
</script>

{#if isOpen}
	<nav transition:fade={{ duration: 200 }}>
		{#if !$authStore.user}
			<ul>
				<li>
					<a href="/login"><img src="/icons/login-green_icon.svg" alt="Login icon" />Login</a>
				</li>
			</ul>
		{:else if $authStore.user}
			<ul>
				<li>
					<a href="/account"><img src="/icons/person-green_icon.svg" alt="Account icon" />Account</a
					>
				</li>
				<li>
					<a href="/settings"
						><img src="/icons/settings-green_icon.svg" alt="Settings icon" />Settings</a
					>
				</li>
				<li>
					<a href="/" on:click={authHandlers.logout}
						><img src="/icons/logout-green_icon.svg" alt="Logout icon" />Logout</a
					>
				</li>
			</ul>
		{/if}
	</nav>
{/if}

<style>
	nav {
		/* display: none; */
		position: absolute;
		right: 2rem;
		top: 6rem;
		background-color: var(--clr-cream);
		color: var(--clr-dark-green);
		height: fit-content;
		padding: 2rem;
		border-radius: var(--spc-corner-radius);
		border: 2px solid var(--clr-dark-green);
		box-shadow: 0 2px 0.2rem rgba(0, 0, 0, 0.5);
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
