<script>
	import { authHandlers } from "$lib/stores/store";
	import { auth } from "../firebase/firebase";
	import { onMount } from "svelte";

	let email = "";
	let password = "";
	let confirmPassword = "";
	let error = false;
	let register = false;
	let authenticating = false;

	async function handleAuth() {
		if (authenticating) {
			return;
		}
		if (!email || !password || (register && !confirmPassword)) {
			error = true;
			return;
		}
		authenticating = true;

		try {
			if (!register) {
				await authHandlers.login(email, password);
			} else {
				await authHandlers.signup(email, password);
			}
		} catch (err) {
			console.log("There was an error with authentication", err);
			error = true;
		}
	}

	function handleRegister() {
		register = !register;
	}
</script>

<div class="authContainer">
	<form>
		<h3>{register ? "Register" : "Login"}</h3>
		{#if error}
			<p class="error">The information you have entered is not correct</p>
		{/if}
		<label>
			<input bind:value={email} type="email" placeholder="Email" />
		</label>
		<label>
			<input bind:value={password} type="password" placeholder="Password" />
		</label>
		{#if register}
			<label>
				<input bind:value={confirmPassword} type="password" placeholder="Confirm Password" />
			</label>
		{/if}

		<button on:click={handleAuth} type="submit">
			{#if authenticating}
				Loading...
			{:else}
				Submit
			{/if}
		</button>
	</form>
	<div class="options">
		{#if register}
			<div>
				<p>Already have an account?</p>
				<button on:click={handleRegister} on:keydown={() => {}}>Login</button>
			</div>
		{:else}
			<div>
				<p>Don't have an account?</p>
				<button on:click={handleRegister} on:keydown={() => {}}>Register</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.authContainer {
		border: 3px solid var(--clr-dark-green);
		padding: 2rem;
		border-radius: 0.5rem;
		background-color: var(--clr-cream);
		max-width: 20rem;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	form input {
		width: 100%;
		padding: 0.5rem;
		border: 2px solid var(--clr-black);
		border-radius: 0.5rem;
	}

	form input:focus {
		outline: solid var(--clr-red);
	}

	form h3 {
		font-size: 2em;
		color: var(--clr-dark-green);
	}

	form input,
	form button {
		font-size: 1.2rem;
	}

	form button {
		background-color: var(--clr-red);
		color: var(--clr-white);
		padding: 0.5rem 2rem;
		border-radius: 0.5rem;
		border: none;
	}

	form button:hover {
		cursor: pointer;
		background-color: var(--clr-dark-red);
	}

	.options div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
