<script>
	import LoginForm from "$lib/components/LoginForm.svelte";
</script>

<main>
	<LoginForm />
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
