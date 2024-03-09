<script>
	import { authHandlers } from "$lib/stores/authStore.js";
	// import { goto } from "$app/navigation";
	import { auth } from "$lib/firebase/firebase";

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

{#if !forgotPassword}
	<div class="login-container srfc">
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
