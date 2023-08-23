<script>
	import IconLink from "./IconLink.svelte";
</script>

<footer>
	<IconLink svg={"/icons/coffee_icon.svg"} innerText={"Donate"} url={"/spots"} />
	<IconLink
		svg={"/icons/mail_icon.svg"}
		innerText={"Contact"}
		url={"mailto:jacobedruery@gmail.com"}
	/>
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
