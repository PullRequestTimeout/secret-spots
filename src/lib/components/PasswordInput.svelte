<script>
	import Icon from "$lib/components/Icon.svelte";

	export let password = "";
	export let placeholder = "Password";
	function passwordInput(e) {
		password = e.target.value;
	}

	let passwordVisibility = false;
	$: type = passwordVisibility ? "text" : "password";
</script>

<div class="password-input">
	<label>
		<input name="password" {type} {placeholder} on:input={passwordInput} class="txt-inp" />
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

<style>
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
</style>
