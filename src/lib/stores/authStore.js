import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "$lib/firebase/firebase";

export const authStore = writable({
	user: null,
	emailVerified: false,
	loading: true,
	data: {}
});

export const authHandlers = {
	signup: async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	login: async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
		// Removes user from store
		authStore.update((curr) => {
			return {
				...curr,
				user: null,
				emailVerified: false,
				loading: true,
				data: {}
			};
		});
	}
	// Need to implement reset password route
	// resetPassword: async (email) => {
	//     await sendPasswordResetEmail(auth, email);
	// }
};
