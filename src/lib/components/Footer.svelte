<script>
	import IconLink from "./IconLink.svelte";
</script>

<footer>
	<IconLink svg={"coffee"} innerText={"Donate"} url={"https://ko-fi.com/pullrequesttimeout"} />
	<IconLink svg={"mail"} innerText={"Contact"} url={"mailto:jacobedruery@gmail.com"} />
</footer>

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
</style>
