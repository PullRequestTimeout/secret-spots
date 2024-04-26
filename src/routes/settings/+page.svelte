<script>
	// Components
	import PasswordInput from "$lib/components/PasswordInput.svelte";
	import DropDown from "$lib/components/DropDown.svelte";
	import IconButton from "$lib/components/IconButton.svelte";
	import Chalk from "./Chalk.svelte";

	// Stores
	import { authHandlers, authStore } from "$lib/stores/authStore.js";
	import { userPref, userSpots } from "$lib/stores/userDataStore.js";
	import { setAlertMessage } from "$lib/stores/uiStore.js";

	// Firebase
	import {
		getUserPrefs,
		updateUserPrefInDatabase,
		updateSpotsInDatabase,
		deleteUserData
	} from "$lib/firebase/db.js";

	// Svelte
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	// Utils
	import { clickOutside } from "$lib/utils/click_outside.js";

	// On mount, set the sort type and date format to the user's preferences in the db
	$: startingSort = $userPref.sort;
	$: startingDate = $userPref.date;
	$: startingMap = $userPref.map;

	onMount(() => {
		if ($userSpots.length < 1) {
			getUserPrefs();
		}
	});

	// Modal error message
	let errorMessage = "";

	// Clear all spots
	let clearSpotsModal = false;
	function clearAllSpots() {
		userSpots.set([]);
		updateSpotsInDatabase();
		handleCloseModals();
		setAlertMessage("All spots cleared.");
	}

	// Update display name
	let displayNameModal = false;
	let newDisplayName = "";
	function updateDisplayName(newName) {
		if (newName.length < 1) {
			errorMessage = "Display name can't be blank.";
			return;
		}
		authHandlers.updateDisplayName(newName);
		newDisplayName = "";
		handleCloseModals();
	}

	// Update password
	let updatePasswordModal = false;
	let currentPassword = "";
	let newPassword1 = "";
	let newPassword2 = "";
	function updatePassword(currPass, newPass1, newPass2) {
		if (newPass1 !== newPass2) {
			console.log("Passwords do not match");
			errorMessage = "Passwords do not match.";
			return;
		} else if (newPass1.length < 6) {
			console.log("password too short");
			errorMessage = "Password must be at least 6 characters long.";
			return;
		} else {
			authHandlers.updatePassword(currPass, newPass1);
			currentPassword = "";
			newPassword1 = "";
			newPassword2 = "";
			handleCloseModals();
		}
	}

	// Delete account
	let deleteAccountModal = false;
	function deleteAccount() {
		console.log("deleting account");
		deleteUserData();
		authHandlers.deleteAccount(currentPassword);
	}

	function handleCloseModals() {
		clearSpotsModal = false;
		displayNameModal = false;
		updatePasswordModal = false;
		deleteAccountModal = false;
		errorMessage = "";
	}

	let currentYear = new Date().getFullYear();

	let innerHeight = 0;
</script>

<main>
	{#if $authStore.displayName}
		<h2 class="main-title">Welcome, {$authStore.displayName}</h2>
	{:else}
		<h2 class="main-title">Welcome to Secret Spots!</h2>
	{/if}
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
					setAlertMessage("Preferences updated.");
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
					setAlertMessage("Preferences updated.");
				}}
			/>
		</div>
		<div class="settings-item">
			<p>Map Style:</p>
			<DropDown
				inputs={[
					{ display: "Default", value: "default" },
					{ display: "Retro", value: "retro" }
				]}
				startingValue={startingMap}
				callback={(val) => {
					userPref.update((prev) => ({ ...prev, map: val }));
					updateUserPrefInDatabase();
					setAlertMessage("Preferences updated.");
				}}
			/>
		</div>
		<div class="settings-item">
			<p>Clear All Spots:</p>
			<IconButton
				svg={"trash"}
				innerText={"Clear"}
				className={"btn-red"}
				callback={() => (clearSpotsModal = true)}
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
				callback={() => (displayNameModal = true)}
			/>
		</div>
		<div class="settings-item">
			<p>Password:</p>
			<IconButton
				svg={"edit"}
				innerText={"Update"}
				className={"btn-green"}
				callback={() => (updatePasswordModal = true)}
			/>
		</div>
		<div class="settings-item">
			<p>Delete Account:</p>
			<IconButton
				svg={"trash"}
				innerText={"Delete"}
				className={"btn-red"}
				callback={() => (deleteAccountModal = true)}
			/>
		</div>
	</section>
	<section class="credit">
		<p>Made with ❤️ & ☕</p>
		<p>© {currentYear} <a href="https://github.com/PullRequestTimeout">Jacob Druery</a></p>
	</section>
	{#if clearSpotsModal || displayNameModal || updatePasswordModal || deleteAccountModal}
		<div class="modal-container">
			<div
				class="modal srfc"
				use:clickOutside
				on:outclick={handleCloseModals}
				transition:fade={{ duration: 200 }}
			>
				{#if clearSpotsModal}
					<h3>Clear All Spots?</h3>
					<p>This action cannot be undone.</p>
					<div>
						<IconButton
							svg={"trash"}
							innerText={"Clear"}
							className={"btn-red"}
							callback={clearAllSpots}
						/>
						<button on:click={handleCloseModals}>Cancel</button>
					</div>
				{/if}
				{#if displayNameModal}
					<h3>Update Display Name</h3>
					<p>Enter a new display name:</p>
					<input
						type="text"
						class="txt-inp"
						bind:value={newDisplayName}
						placeholder="New Display Name"
					/>
					<div>
						<IconButton
							svg={"edit"}
							innerText={"Update"}
							className={"btn-green"}
							callback={() => updateDisplayName(newDisplayName)}
						/>
						<button on:click={handleCloseModals}>Cancel</button>
					</div>
				{/if}
				{#if updatePasswordModal}
					<h3>Update Password</h3>
					<p>Enter a new password:</p>
					<PasswordInput bind:password={currentPassword} placeholder="Current Password" />
					<PasswordInput bind:password={newPassword1} placeholder="New Password" />
					<PasswordInput bind:password={newPassword2} placeholder="Confirm New Password" />
					<div>
						<IconButton
							svg={"edit"}
							innerText={"Update"}
							className={"btn-green"}
							callback={() => updatePassword(currentPassword, newPassword1, newPassword2)}
						/>
						<button
							on:click={() => {
								handleCloseModals();
								currentPassword = "";
								newPassword1 = "";
								newPassword2 = "";
							}}>Cancel</button
						>
					</div>
				{/if}
				{#if deleteAccountModal}
					<h3>Delete Account</h3>
					<p>This action cannot be undone.</p>
					<p>Input password to confirm:</p>
					<PasswordInput bind:password={currentPassword} />
					<div>
						<IconButton
							svg={"trash"}
							innerText={"Delete"}
							className={"btn-red"}
							callback={deleteAccount}
						/>
						<button on:click={handleCloseModals}>Cancel</button>
					</div>
				{/if}
				{#if errorMessage}
					<p class="error">{errorMessage}</p>
				{/if}
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		background-color: #eaeaeaad;
		height: calc(100vh - var(--spc-footer-height));
		height: calc(var(--window-height) - var(--spc-footer-height));
		overflow: auto;
	}

	main .main-title {
		margin-top: 2rem;
		text-align: center;
	}

	section {
		position: relative;
		padding: 1rem 2rem;
		min-width: 50%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.settings-heading {
		align-items: center;
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

	/* Modal */

	div.modal-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div.modal {
		position: absolute;
		z-index: 100;
		width: 20rem;
		max-width: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--spc-gap);
	}

	div.modal h3 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
		color: var(--clr-dark-green);
	}

	div.modal p,
	div.modal h3 {
		text-align: center;
	}

	div.modal p.error {
		font-size: 1rem;
		font-weight: 400;
		color: var(--clr-red);
	}

	div.modal div {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	div.modal div button {
		font-size: 1rem;
		font-weight: bold;
		height: fit-content;
		border: none;
		padding: 0;
		margin: 0;
		background-color: transparent;
		color: var(--clr-red);
		text-decoration: underline;
	}

	div.modal div button:hover {
		cursor: pointer;
	}

	section.credit {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	section.credit a,
	section.credit a:visited {
		color: var(--clr-dark-green);
		font-weight: bold;
	}

	@media screen and (min-width: 768px) {
		main {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		section {
			max-width: 50%;
			padding: 2rem;
		}

		.settings-heading {
			display: flex;
			justify-content: flex-start;
			gap: 1rem;
		}
	}
</style>
