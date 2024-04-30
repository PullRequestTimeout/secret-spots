<script>
	import IconLink from "./IconLink.svelte";
	import { page } from "$app/stores";
	import { fade } from "svelte/transition";
</script>

{#if $page.url.pathname !== "/"}
	<footer transition:fade={{ delay: 300, duration: 200 }}>
		<IconLink
			svg={"coffee"}
			innerText={"Donate"}
			url={"https://ko-fi.com/pullrequesttimeout"}
			className="btn-green"
			responsive
		/>
		<IconLink
			svg={"mail"}
			innerText={"Contact"}
			url={"mailto:jacobedruery@gmail.com"}
			className="btn-green"
			responsive
		/>
	</footer>
{/if}

<style>
	footer {
		background-color: var(--clr-dark-green);
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		display: flex;
		justify-content: space-between;
	}

	@media screen and (max-width: 768px) {
		footer {
			display: none;
		}
	}
</style>
