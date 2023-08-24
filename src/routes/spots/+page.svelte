<script>
	import { authHandlers } from "../../stores/store";
	import IconButton from "../../components/IconButton.svelte";
</script>

<!-- <button class="btn btn-red" on:click={authHandlers.logout}>Logout</button> -->

<IconButton
	className={"btn btn-red"}
	callback={authHandlers.logout}
	svg={"/icons/logout_icon.svg"}
	innerText={"logout"}
/>
