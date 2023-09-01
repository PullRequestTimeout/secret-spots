<script>
	import { authHandlers } from "$lib/stores/store";
	import IconLink from "$lib/components/IconLink.svelte";
	import { updateProfile, sendEmailVerification } from "firebase/auth";
	import { auth } from "$lib/firebase/firebase";

	let fname = "";
	let email = "";
	let password = "";
	let confirmPass = "";
	let error = false;
	let authenticating = false;
	let errorMessage = "";

	let emailSent = false;

	async function handleSignup() {
		if (authenticating) {
			return;
		}

		if (!fname) {
			error = true;
			errorMessage = "A first name is required.";
			return;
		}

		if (!email || !password) {
			error = true;
			errorMessage = "An email and password are required.";
			return;
		}

		if (confirmPass != password) {
			error = true;
			errorMessage = "Your passwords do not match.";
			return;
		}

		// Show loading ui and try to register user
		authenticating = true;
		try {
			// sign up
			await authHandlers.signup(email, password);
			await updateProfile(auth.currentUser, { displayName: fname });
			console.log("Sign up.");
			try {
				// send email verification
				await sendEmailVerification(auth.currentUser);
				console.log("email sent to " + email);
				emailSent = true;
			} catch (err) {
				error = true;
				errorMessage = "There was a problem sending a verification email.";
				console.log(err.toString());
				authenticating = false;
			}
		} catch (err) {
			error = true;

			let errorReason = err.toString();
			if (errorReason.includes("auth/email-already-in-use")) {
				errorMessage = "Email already in use.";
			} else {
				errorMessage = "Oops. Something went wrong.";
				console.log(err.toString());
			}

			authenticating = false;
		}
	}
</script>

<div class="registerContainer">
	<form>
		<h3>Register</h3>
		{#if error}
			<p class="error">{errorMessage}</p>
		{/if}
		{#if !emailSent}
			<label>
				<input
					bind:value={fname}
					name="fname"
					type="text"
					minlength="3"
					maxlength="20"
					placeholder="First Name"
					autocomplete="off"
					required
				/>
			</label>
			<label>
				<input
					bind:value={email}
					name="email"
					type="email"
					placeholder="Email"
					autocomplete="off"
					required
				/>
			</label>
			<label>
				<input
					bind:value={password}
					name="password"
					type="password"
					placeholder="Password"
					required
				/>
			</label>
			<label>
				<input
					bind:value={confirmPass}
					type="password"
					placeholder="Confirm Password"
					autocomplete="off"
					required
				/>
			</label>

			<button on:click={handleSignup} class="btn btn-red">
				{#if authenticating}
					Loading...
				{:else}
					Submit
				{/if}
			</button>
			<p>Already have an account? <a href="/login">Login</a></p>
		{:else if emailSent && email}
			<br />
			<p>A verification email has been sent to {email}</p>
			<br />
			<IconLink
				url={"/login"}
				svg={"/icons/login_icon.svg"}
				innerText={"Login"}
				className={"btn-red"}
			/>
		{/if}
	</form>
</div>

<style>
	.registerContainer {
		border: 3px solid var(--clr-dark-green);
		padding: 2rem;
		border-radius: 0.5rem;
		background-color: var(--clr-cream);
		width: 20rem;
		max-width: 90%;
		box-shadow: var(--bx-shdw);
	}

	.registerContainer p {
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

	.registerContainer a,
	.registerContainer a:visited {
		color: var(--clr-red);
	}
</style>
