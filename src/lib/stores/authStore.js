import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	deleteUser,
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword
} from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "$lib/firebase/firebase.js";
import { goto } from "$app/navigation";
import { setAlertMessage } from "$lib/stores/uiStore.js";
import { userSpots } from "$lib/stores/userDataStore.js";
import { deleteUserData } from "$lib/firebase/db.js";
import { loading } from "$lib/stores/uiStore.js";

export const authStore = writable({
	uid: null,
	displayName: null,
	email: null,
	emailVerified: false
});

// API reference
// https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth

export const authHandlers = {
	signup: async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},

	login: async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	},

	logout: () => {
		loading.set(true);

		signOut(auth)
			.then(() => {
				authStore.update((store) => {
					store.uid = null;
					store.displayName = null;
					store.email = null;
					store.emailVerified = false;
					return store;
				});
				userSpots.set([]);
				loading.set(false);
			})
			.catch((error) => {
				console.error(error);
				setAlertMessage("There was an error logging out. Try again.");
				loading.set(false);
			});
	},

	// Need to implement reset password route
	// resetPassword: async (email) => {
	//     await sendPasswordResetEmail(auth, email);
	// }

	updateDisplayName: (displayName) => {
		const user = auth.currentUser;
		updateProfile(user, { displayName: displayName })
			.then(() => {
				setAlertMessage("Display name updated!");
				// Update the authStore ui
				authStore.update((store) => {
					store.displayName = displayName;
					return store;
				});
			})
			.catch((error) => {
				console.error(error);
				setAlertMessage("There was an error updating your display name.");
			});
	},

	updatePassword: (currPass, newPass) => {
		const user = auth.currentUser;
		const credential = EmailAuthProvider.credential(user.email, currPass);
		reauthenticateWithCredential(user, credential)
			.then(() => {
				updatePassword(user, newPass)
					.then(() => {
						setAlertMessage("Password updated!");
					})
					.catch((error) => {
						console.error(error);
						setAlertMessage("There was an error updating your password.");
					});
			})
			.catch((error) => {
				setAlertMessage("There was an error reauthenticating your account.");
				console.error(error);
			});
	},

	deleteAccount: (currPass) => {
		const user = auth.currentUser;
		const credential = EmailAuthProvider.credential(user.email, currPass);
		reauthenticateWithCredential(user, credential)
			.then(() => {
				deleteUserData()
					.then(() => {
						deleteUser(user)
							.then(() => {
								setAlertMessage("Account and user data deleted.");
								goto("/");
							})
							.catch((error) => {
								console.error(error);
								setAlertMessage("There was an error deleting your account.");
							});
					})
					.catch((error) => {
						console.error(error);
						setAlertMessage("There was an error deleting your user data.");
					});
			})
			.catch((error) => {
				console.error(error);
				setAlertMessage("There was an error reauthenticating your account.");
			});
	}
};
