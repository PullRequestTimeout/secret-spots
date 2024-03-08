<script>
	import { authHandlers } from "$lib/stores/authStore";
	import IconLink from "$lib/components/IconLink.svelte";
	import { setAlertMessage } from "$lib/stores/uiStore.js";
	import { updateProfile, sendEmailVerification } from "firebase/auth";
	import { auth } from "$lib/firebase/firebase";

	let fname = "";
	let email = "";
	let password = "";
	let confirmPass = "";
	let authenticating = false;

	// Resend email verification
	$: resendEmail = false;
	// auth.currentUser.emailVerified
	// $: if (auth.currentUser && !auth.currentUser.emailVerified) {
	// 	resendEmail = true;
	// }

	// Shows sent email confirmation
	let emailSent = false;

	async function handleSignup() {
		if (authenticating) {
			return;
		}

		if (!fname) {
			setAlertMessage("A first name is required.", 2);
			return;
		}

		if (!email || !password) {
			setAlertMessage("An email and password are required.", 2);
			return;
		}

		if (confirmPass != password) {
			setAlertMessage("Your passwords do not match.", 2);
			return;
		}

		// Show loading ui and try to register user
		authenticating = true;
		try {
			// sign up
			await authHandlers.signup(email, password);
			await updateProfile(auth.currentUser, { displayName: fname });
			console.log("New sign up.");
			try {
				// send email verification
				await sendEmailVerification(auth.currentUser);
				console.log("email sent to " + email);
				emailSent = true;
			} catch (err) {
				setAlertMessage("There was a problem sending a verification email.");
				console.log(err.toString());
				authenticating = false;
			}
		} catch (err) {
			let errorReason = err.toString();
			if (errorReason.includes("auth/email-already-in-use")) {
				setAlertMessage("Email already in use.");
			} else {
				setAlertMessage("Oops. Something went wrong.");
				console.log(err.toString());
			}

			authenticating = false;
		}
	}

	// async function handleResendEmail() {
	// 	if (!!email) {
	// 		authenticating = true;
	// 		try {
	// 			// send email verification
	// 			await sendEmailVerification(auth.currentUser);
	// 			console.log("email sent to " + email);
	// 			emailSent = true;
	// 		} catch (err) {
	// 			setAlertMessage("There was a problem sending a verification email.", 2);
	// 			authenticating = false;
	// 		}
	// 	} else {
	// 		setAlertMessage("Please enter an email address.", 2);
	// 	}
	// }
</script>

<div class="registerContainer srfc">
	<form on:submit|preventDefault={handleSignup}>
		{#if !emailSent && !resendEmail}
			<h3>Register</h3>
			<label>
				<!-- svelte-ignore a11y-autofocus -->
				<input
					bind:value={fname}
					name="fname"
					type="text"
					minlength="3"
					maxlength="20"
					placeholder="First Name"
					autocomplete="off"
					autofocus
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

			<button type="submit" class="btn btn-red">
				{#if authenticating}
					Loading...
				{:else}
					Submit
				{/if}
			</button>
			<p>Already have an account? <a href="/login">Login</a></p>
			<p>Or</p>
			<p>
				<button
					on:click={() => {
						resendEmail = true;
						email = "";
					}}
					class="resend-email">Resend</button
				> verification email
			</p>
			<!-- {:else if resendEmail}
			<h3>Resend Email</h3>
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
			<div class="resend-buttons">
				<button on:click={handleResendEmail} class="btn btn-red">
					{#if authenticating}
						Loading...
					{:else}
						Submit
					{/if}
				</button>
				<button
					on:click={() => {
						resendEmail = false;
						email = "";
					}}
					class="resend-email">Cancel</button
				>
			</div> -->
		{:else if emailSent && email}
			<br />
			<p>A verification email has been sent to {email}</p>
			<br />
			<IconLink url={"/login"} svg={"login"} innerText={"Login"} className={"btn-red"} />
		{/if}
	</form>
</div>

<style>
	.registerContainer {
		width: 20rem;
		max-width: 90%;
	}

	.registerContainer p {
		text-align: center;
	}

	h3 {
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
	.registerContainer a:visited,
	.resend-email {
		color: var(--clr-red);
		font-weight: bold;
	}

	.resend-email {
		border: none;
		background: none;
		font-size: 1rem;
		padding: 0;
		margin: 0;
		text-decoration: underline;
	}

	/* .resend-buttons {
		display: flex;
		gap: 1rem;
	} */
</style>
