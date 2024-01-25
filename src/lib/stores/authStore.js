import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile
} from "firebase/auth";
import { writable } from "svelte/store";
import { auth, db } from "$lib/firebase/firebase";

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
		await updateProfile(user, { displayName: displayName });
		// Update the authStore?
		authStore.update((store) => {
			store.displayName = displayName;
			return store;
		});
	}
};
