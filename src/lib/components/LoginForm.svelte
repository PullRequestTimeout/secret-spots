<script>
	import { authHandlers } from "$lib/stores/store";

	let email = "";
	let password = "";
	let error = false;
	let authenticating = false;
	let errorMessage = "";

	async function handleLogin() {
		if (authenticating) {
			return;
		}
		if (!email || !password) {
			error = true;
			errorMessage = "An email and password are required.";
			return;
		}
		authenticating = true;

		try {
			await authHandlers.login(email, password);
		} catch (err) {
			error = true;

			let errorReason = err.toString();
			if (errorReason.includes("auth/user-not-found")) {
				errorMessage = "There doesn't seem to be an account associated with this email.";
			} else if (errorReason.includes("auth/invalid-email")) {
				errorMessage = "This doesn't seem to be a valid email.";
			} else if (errorReason.includes("auth/wrong-password")) {
				errorMessage = "Your password is incorrect.";
			} else {
				errorMessage = "Oops. Something went wrong.";
				console.log(err.toString());
			}

			authenticating = false;
		}
	}
</script>

<div class="authContainer">
	<form>
		<h3>Login</h3>
		{#if error}
			<p class="error">{errorMessage}</p>
		{/if}
		<label>
			<input bind:value={email} name="email" type="email" placeholder="Email" autocomplete="off" />
		</label>
		<label>
			<input bind:value={password} name="password" type="password" placeholder="Password" />
		</label>

		<button on:click={handleLogin} class="btn btn-red">
			{#if authenticating}
				Loading...
			{:else}
				Submit
			{/if}
		</button>
		<p>Don't have an account? <a href="/register">Register</a></p>
	</form>
</div>

<style>
	.authContainer {
		border: 3px solid var(--clr-dark-green);
		padding: 2rem;
		border-radius: 0.5rem;
		background-color: var(--clr-cream);
		width: 20rem;
		max-width: 90%;
		box-shadow: var(--bx-shdw);
	}

	.authContainer p {
		text-align: center;
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
		border: 2px solid var(--clr-dark-green);
		border-radius: 0.5rem;
	}

	form input:focus {
		outline: solid var(--clr-dark-green);
	}

	form h3 {
		font-size: 2em;
		color: var(--clr-dark-green);
	}

	form input,
	form button {
		font-size: 1.2rem;
	}

	.authContainer a,
	.authContainer a:visited {
		color: var(--clr-red);
	}
</style>
