<script>
	import SignupForm from "$lib/components/SignupForm.svelte";
</script>

<main>
	<SignupForm />
</main>

<style>
	main {
		height: calc(var(--window-height) - var(--spc-footer-height));
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
