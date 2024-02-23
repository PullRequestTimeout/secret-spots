import { auth, db } from "$lib/firebase/firebase.js";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { userSpots, activeSpot, userPref } from "$lib/stores/userDataStore.js";
import { get } from "svelte/store";
import { loading } from "$lib/stores/uiStore.js";

//TODO: Refine this a little more. There's a lot of repeated variables.

export async function getUserData() {
	const user = auth.currentUser;
	const docRef = doc(db, "users", user.uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists() && docSnap.data().spots.length > 0) {
		// Load spots array into the UI
		userSpots.set(docSnap.data().spots);
		activeSpot.set(docSnap.data().spots[0].spotName);
		console.log("User spots loaded.");
	} else if (docSnap.exists() && docSnap.data().spots.length == 0) {
		console.log("This user has no spots saved!");
	} else {
		// docSnap.data() will be undefined in this case
		console.log("There doesn't seem to be a spots array.");
	}

	// Load user preferences into the UI
	if (docSnap.exists()) {
		userPref.set(docSnap.data().settings);
	}

	loading.set(false);
}

export async function checkUser() {
	const user = auth.currentUser;
	// docRef is a reference to the user document in the users collection
	const docRef = doc(db, "users", user.uid);
	// docSnap is a snapshot of the user document
	const docSnap = await getDoc(docRef);

	// If no user document, create one
	if (!docSnap.exists()) {
		console.log("Creating new user.");
		const userRef = doc(db, "users", user.uid);
		const defaultSettings = get(userPref);
		// Schema
		let userDataForDb = {
			email: user.email,
			displayName: user.displayName,
			spots: [],
			settings: defaultSettings
		};
		await setDoc(userRef, userDataForDb);

		// Should be the final loading state if no user, load ui
		loading.set(false);
	} else {
		console.log("Fetching user data.");
		getUserData();
	}
}

export async function updateUserPrefInDatabase() {
	const user = auth.currentUser;
	const currentSettings = get(userPref);
	// docRef is a reference to the user document in the users collection
	if (user) {
		const docRef = doc(db, "users", user.uid);
		await updateDoc(docRef, { settings: currentSettings });
	} else {
		console.log("No user signed in");
	}
}

export async function updateSpotsInDatabase() {
	const user = auth.currentUser;
	const currentUserSpots = get(userSpots);
	// docRef is a reference to the user document in the users collection
	if (user) {
		const docRef = doc(db, "users", user.uid);
		await updateDoc(docRef, { spots: currentUserSpots });
	} else {
		console.log("No user signed in");
	}
}

export async function deleteUserData() {
	const user = auth.currentUser;
	try {
		await deleteDoc(doc(db, "users", user.uid));
		console.log("Document successfully deleted!");
	} catch (error) {
		console.error(error);
	}
}
