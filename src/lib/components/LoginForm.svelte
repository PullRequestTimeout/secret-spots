<script>
	import { authHandlers } from "$lib/stores/authStore.js";
	import { goto } from "$app/navigation";
	import { auth } from "$lib/firebase/firebase";

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
			if (auth.currentUser.emailVerified) {
				console.log("Verified");
				// goto("/spots");
			} else {
				error = true;
				authenticating = false;
				errorMessage =
					"Please verify your email. Be sure to check your junk folder if you can't find it in your inbox.";
			}
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

<div class="loginContainer srfc">
	<form on:submit|preventDefault={handleLogin}>
		<h3>Login</h3>
		{#if error}
			<p class="error">{errorMessage}</p>
		{/if}
		<label>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				bind:value={email}
				name="email"
				type="email"
				placeholder="Email"
				autocomplete="off"
				autofocus
			/>
		</label>
		<label>
			<input bind:value={password} name="password" type="password" placeholder="Password" />
		</label>

		<button type="submit" class="btn btn-red">
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
	.loginContainer {
		width: 20rem;
		max-width: 90%;
	}

	.loginContainer p {
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

	.loginContainer a,
	.loginContainer a:visited {
		color: var(--clr-red);
		font-weight: bold;
	}
</style>
