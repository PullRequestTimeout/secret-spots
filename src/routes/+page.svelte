<!-- Home page -->

<script>
	import { getContext } from "svelte";
	import IconLink from "$lib/components/IconLink.svelte";
	function offset() {
		if (getContext("offset") == null) {
			return 200;
		} else {
			return getContext("offset");
		}
	}
</script>

<div class="welcomeContainer" style="--offset: {`${offset}px`}">
	<h2>Welcome to Secret Spots!</h2>
	<p>Log in to get started</p>
	<div>
		<IconLink url={"/login"} svg={"login"} innerText={"Login"} className={"btn-red"} />
		<IconLink url={"/register"} svg={"register"} innerText={"Register"} className="btn-red" />
	</div>
</div>

<style>
	.welcomeContainer {
		position: relative;
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		height: 100%;
		overflow: hidden;
	}

	.welcomeContainer h2 {
		line-height: 1;
		font-size: 2em;
		text-align: center;
	}

	.welcomeContainer p {
		font-weight: bold;
	}

	.welcomeContainer p,
	.welcomeContainer h2 {
		color: var(--clr-dark-green);
	}

	.welcomeContainer div {
		display: flex;
		gap: 1rem;
	}
</style>
