<script>
	import Icon from "$lib/components/Icon.svelte";

	import { authHandlers } from "$lib/stores/authStore";
	import { setAlertMessage } from "$lib/stores/uiStore.js";

	let fname = "";
	let email = "";
	let password = "";
	let confirmPass = "";
	let authenticating = false;

	// Control password visibility
	let passwordVisibility = false;
	$: type = passwordVisibility ? "text" : "password";

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
		<div class="password-input">
			<label>
				<input
					on:input={(e) => (password = e.target.value)}
					name="password"
					{type}
					placeholder="Password"
					required
				/>
			</label>
			{#if password.length > 0}
				<button
					class="password-visibility-button"
					type="button"
					tabindex="-1"
					on:click={() => (passwordVisibility = !passwordVisibility)}
				>
					{#if passwordVisibility}
						<Icon name="hidden" color="--clr-dark-green" size="24" />
					{:else}
						<Icon name="visible" color="--clr-dark-green" size="24" />
					{/if}
				</button>
			{/if}
		</div>
		<div class="password-input">
			<label>
				<input
					on:input={(e) => (confirmPass = e.target.value)}
					{type}
					placeholder="Confirm Password"
					autocomplete="off"
					required
				/>
			</label>
			{#if confirmPass.length > 0}
				<button
					class="password-visibility-button"
					type="button"
					tabindex="-1"
					on:click={() => (passwordVisibility = !passwordVisibility)}
				>
					{#if passwordVisibility}
						<Icon name="hidden" color="--clr-dark-green" size="24" />
					{:else}
						<Icon name="visible" color="--clr-dark-green" size="24" />
					{/if}
				</button>
			{/if}
		</div>
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

	div.password-input {
		position: relative;
	}

	button.password-visibility-button {
		position: absolute;
		right: 0.5rem;
		top: 0.55rem;
		background: none;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button.password-visibility-button:focus,
	button.password-visibility-button:active {
		outline: none;
	}

	.registerContainer a,
	.registerContainer a:visited {
		color: var(--clr-red);
		font-weight: bold;
	}
</style>
