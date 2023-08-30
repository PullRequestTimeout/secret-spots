<script>
	import { authHandlers } from "$lib/stores/store";
	import IconButton from "$lib/components/IconButton.svelte";
</script>

<!-- <button class="btn btn-red" on:click={authHandlers.logout}>Logout</button> -->

<IconButton
	className={"btn-red"}
	callback={authHandlers.logout}
	svg={"/icons/logout_icon.svg"}
	innerText={"Logout"}
/>
