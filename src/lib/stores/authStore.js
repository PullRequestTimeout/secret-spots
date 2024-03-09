import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	deleteUser,
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
	sendPasswordResetEmail,
	sendEmailVerification
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
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			let errorReason = err.toString();
			if (errorReason.includes("auth/user-not-found")) {
				setAlertMessage("There doesn't seem to be an account associated with this email.");
			} else if (errorReason.includes("auth/invalid-email")) {
				setAlertMessage("This doesn't seem to be a valid email.");
			} else if (errorReason.includes("auth/wrong-password")) {
				setAlertMessage("Your password is incorrect.");
			} else {
				setAlertMessage("Oops. Something went wrong.");
				console.error(err);
			}
		}
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

	resetPassword: (email) => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				setAlertMessage("Password reset email sent.");
			})
			.catch((error) => {
				console.error(error);
				setAlertMessage("There was an error sending the password reset email.");
			});
	},

	resendEmailVerification: () => {
		const user = auth.currentUser;
		sendEmailVerification(user)
			.then(() => {
				signOut(auth).then(() => {
					goto("/login");
					setAlertMessage("Please verify email to continue.", 5);
				});
			})
			.catch((error) => {
				console.error(error);
				setAlertMessage("There was an problem sending the email verification.");
			});
	},

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
