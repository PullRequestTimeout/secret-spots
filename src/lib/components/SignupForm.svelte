<script>
	import PasswordInput from "$lib/components/PasswordInput.svelte";

	import { authHandlers } from "$lib/stores/authStore";
	import { setAlertMessage } from "$lib/stores/uiStore.js";

	let fname = "";
	let email = "";
	let password = "";
	let confirmPass = "";
	let authenticating = false;

	async function handleSignup() {
		if (authenticating) {
			return;
		}
		if (!fname) {
			setAlertMessage("A first name is required.");
			return;
		}
		if (!email || !password) {
			setAlertMessage("An email and password are required.");
			return;
		}
		if (confirmPass != password) {
			setAlertMessage("Your passwords do not match.");
			return;
		}
		if (fname.includes(" ") || email.includes(" ") || password.includes(" ")) {
			setAlertMessage("No spaces allowed in any field.");
			return;
		}
		// If fname contains any special characters, return
		if (/^[a-zA-Z'-]+$/.test(fname) === false) {
			setAlertMessage("No special characters allowed in first name.");
			return;
		}
		// Show loading ui and try to register user
		authenticating = true;
		await authHandlers.signup(email, password, fname);
		authenticating = false;
	}
</script>

<div class="registerContainer srfc">
	<form on:submit|preventDefault={handleSignup}>
		<h3>Register</h3>
		<label>
			<input
				bind:value={fname}
				name="fname"
				type="text"
				class="txt-inp"
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
				class="txt-inp"
				placeholder="Email"
				autocomplete="off"
				required
			/>
		</label>
		<PasswordInput bind:password />
		<PasswordInput bind:password={confirmPass} placeholder="Confirm Password" />
		<button type="submit" class="btn btn-red">
			{#if authenticating}
				Loading...
			{:else}
				Submit
			{/if}
		</button>
		<p>Already have an account? <a href="/login">Login</a></p>
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

	form h3 {
		font-size: 2em;
		color: var(--clr-dark-green);
	}

	form button {
		font-size: 1.2rem;
	}

	.registerContainer a,
	.registerContainer a:visited {
		color: var(--clr-red);
		font-weight: bold;
	}
</style>
