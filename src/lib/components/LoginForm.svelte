<script>
	import { authHandlers } from "$lib/stores/authStore.js";
	import { setAlertMessage } from "$lib/stores/uiStore.js";
	import Icon from "$lib/components/Icon.svelte";
	import PasswordInput from "$lib/components/PasswordInput.svelte";

	let email = "";
	let password = "";
	let error = false;
	let authenticating = false;
	let errorMessage = "";

	let forgotPassword = false;

	async function handleLogin() {
		if (authenticating) {
			return;
		}
		if (!email || !password) {
			setAlertMessage("An email and password are required.");
			return;
		}
		authenticating = true;
		await authHandlers.login(email, password);
		authenticating = false;
	}
</script>

{#if !forgotPassword}
	<div class="login-container srfc">
		<form on:submit|preventDefault={handleLogin}>
			<h3>Login</h3>
			{#if error}
				<p class="error">{errorMessage}</p>
			{/if}
			<label>
				<input
					bind:value={email}
					name="email"
					type="email"
					placeholder="Email"
					autocomplete="off"
				/>
			</label>
			<PasswordInput bind:password />
			<button type="submit" class="btn btn-red">
				{#if authenticating}
					Loading...
				{:else}
					Submit
				{/if}
			</button>
		</form>
		<div class="links">
			<p>Don't have an account? <a href="/register">Register</a></p>
			<button
				on:click={() => {
					forgotPassword = true;
				}}
				class="forgot-password">Forgot your password?</button
			>
		</div>
	</div>
{:else}
	<div class="login-container srfc">
		<form
			on:submit|preventDefault={() => {
				authHandlers.resetPassword(email);
				email = "";
				forgotPassword = false;
			}}
		>
			<h3>Forgot Password</h3>
			{#if error}
				<p class="error">{errorMessage}</p>
			{/if}
			<label>
				<input
					bind:value={email}
					name="email"
					type="email"
					placeholder="Email"
					autocomplete="off"
				/>
			</label>
			<button type="submit" class="btn btn-red">
				{#if authenticating}
					Loading...
				{:else}
					Submit
				{/if}
			</button>
		</form>
		<div class="links">
			<p>
				Remember your password? <button
					on:click={() => (forgotPassword = false)}
					class="forgot-password">Login</button
				>
			</p>
		</div>
	</div>
{/if}

<style>
	.login-container {
		width: 20rem;
		max-width: 90%;
	}

	.login-container p {
		text-align: center;
	}

	form,
	.links {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	form {
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	form input {
		width: 100%;
		padding: 0.5rem;
		border: 2px solid var(--clr-dark-green);
		border-radius: 0.5rem;
	}

	form input:focus {
		outline: solid var(--clr-dark-green);
	}

	form h3 {
		font-size: 2em;
		color: var(--clr-dark-green);
		text-align: center;
	}

	form input,
	form button {
		font-size: 1.2rem;
	}

	button.forgot-password {
		background: none;
		border: none;
		text-decoration: underline;
	}

	.login-container a,
	.login-container a:visited,
	.forgot-password {
		color: var(--clr-red);
		font-weight: bold;
		font-size: 1rem;
	}
</style>
