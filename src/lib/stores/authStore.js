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
import { auth, db } from "$lib/firebase/firebase";
import { goto } from "$app/navigation";
import { setAlertMessage } from "$lib/stores/uiStore.js";

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

	logout: async () => {
		await signOut(auth);
	},

	// Need to implement reset password route
	// resetPassword: async (email) => {
	//     await sendPasswordResetEmail(auth, email);
	// }

	updateDisplayName: async (displayName) => {
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
				setAlertMessage(error.message);
			});
	},

	updatePassword: async (currPass, newPass) => {
		const user = auth.currentUser;
		const credential = EmailAuthProvider.credential(user.email, currPass);
		reauthenticateWithCredential(user, credential)
			.then(() => {
				updatePassword(user, newPass)
					.then(() => {
						setAlertMessage("Password updated!");
					})
					.catch((error) => {
						setAlertMessage(error.message);
					});
			})
			.catch((error) => {
				console.error(error);
			});
	},

	deleteAccount: async (currPass) => {
		const user = auth.currentUser;
		const credential = EmailAuthProvider.credential(user.email, currPass);
		reauthenticateWithCredential(user, credential)
			.then(() => {
				deleteUser(user)
					.then(() => {
						goto("/");
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch((error) => {
				console.error(error);
			});
	}
};
