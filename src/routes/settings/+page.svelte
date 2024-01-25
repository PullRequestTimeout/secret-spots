<script>
	import Toggle from "$lib/components/Toggle.svelte";
	import DropDown from "$lib/components/DropDown.svelte";
	import IconButton from "$lib/components/IconButton.svelte";
	import Chalk from "./Chalk.svelte";
	import { authHandlers } from "$lib/stores/authStore.js";
	import { userPref } from "$lib/stores/userDataStore.js";
	import { getUserData, updateUserPrefInDatabase } from "$lib/firebase/db.js";
	import { auth } from "$lib/firebase/firebase.js";
	import { onMount } from "svelte";

	// On mount, set the sort type and date format to the user's preferences in the db
	$: startingSort = $userPref.sort;
	$: startingDate = $userPref.date;
	onMount(() => {
		getUserData();
	});

	let newDisplayName = "Jacob";
	function clearAllSpots() {
		// userSpots.set([]);
		console.log("clearing all spots");
	}

	function updateDisplayName(newName) {
		authHandlers.updateDisplayName(newName);
	}

	function updatePassword() {
		console.log("updating password");
	}

	function deleteAccount() {
		console.log("deleting account");
	}
</script>

<main>
	<h2>Welcome {auth.currentUser.displayName}</h2>
	<section>
		<div class="settings-heading">
			<h2>Settings</h2>
			<div class="chalk-wrapper"><Chalk /></div>
		</div>
		<!-- <Toggle /> -->
		<div class="settings-item">
			<p>Sorting:</p>
			<DropDown
				inputs={[
					{ display: "Default", value: "default" },
					{ display: "Recent", value: "recent" },
					{ display: "Alphabetical", value: "alphabetical" },
					{ display: "Icon", value: "icon" },
					{ display: "Highest Rated", value: "highRating" },
					{ display: "Lowest Rated", value: "lowRating" }
				]}
				startingValue={startingSort}
				callback={(val) => {
					userPref.update((prev) => ({ ...prev, sort: val }));
					updateUserPrefInDatabase();
				}}
			/>
		</div>
		<div class="settings-item">
			<p>Date:</p>
			<DropDown
				inputs={[
					{ display: "DMY", value: "dmy" },
					{ display: "YMD", value: "ymd" },
					{ display: "MDY", value: "mdy" }
				]}
				startingValue={startingDate}
				callback={(val) => {
					userPref.update((prev) => ({ ...prev, date: val }));
					updateUserPrefInDatabase();
				}}
			/>
		</div>
		<div class="settings-item">
			<p>Clear All Spots:</p>
			<IconButton
				svg={"trash"}
				innerText={"Clear"}
				className={"btn-red"}
				callback={clearAllSpots}
			/>
		</div>
	</section>
	<section>
		<div class="settings-heading">
			<h2>Account</h2>
			<div class="chalk-wrapper"><Chalk /></div>
		</div>
		<div class="settings-item">
			<p>Display Name:</p>
			<IconButton
				svg={"edit"}
				innerText={"Update"}
				className={"btn-green"}
				callback={() => updateDisplayName(newDisplayName)}
			/>
		</div>
		<div class="settings-item">
			<p>Password:</p>
			<IconButton
				svg={"edit"}
				innerText={"Update"}
				className={"btn-green"}
				callback={updatePassword}
			/>
		</div>
		<div class="settings-item">
			<p>Delete Account:</p>
			<IconButton
				svg={"trash"}
				innerText={"Delete"}
				className={"btn-red"}
				callback={deleteAccount}
			/>
		</div>
	</section>
</main>

<style>
	main {
		height: calc(100vh - var(--spc-footer-height));
		overflow: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--clr-darker-green) var(--clr-off-white);
	}

	main::-webkit-scrollbar {
		width: 9px;
	}

	main::-webkit-scrollbar-track {
		background-color: var(--clr-off-white);
	}

	main::-webkit-scrollbar-thumb {
		background-color: var(--clr-darker-green);
	}

	section {
		position: relative;
		padding: 2rem;
		min-width: 50%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.settings-heading {
		align-items: center;
		/* gap: 1rem; */
	}

	h2,
	p {
		color: var(--clr-dark-green);
	}

	p {
		font-size: 1.2rem;
		font-weight: bold;
	}

	.chalk-wrapper {
		width: 15rem;
		translate: 0 0.1rem;
	}

	.settings-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	@media screen and (min-width: 768px) {
		main {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		section {
			max-width: 50%;
		}

		.settings-heading {
			display: flex;
			justify-content: flex-start;
			gap: 1rem;
		}
	}
</style>
