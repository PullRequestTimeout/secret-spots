import { auth, db } from "$lib/firebase/firebase.js";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { userSpots, sortedUserSpots, activeSpot, userPref } from "$lib/stores/userDataStore.js";
import { get } from "svelte/store";

//TODO: Refine this a little more. There's a lot of repeated variables.

export async function getUserData() {
	console.log("Fetching user data.");
	const user = auth.currentUser;
	const docRef = doc(db, "users", user.uid);
	const docSnap = await getDoc(docRef);

	// Load user preferences into the UI
	if (docSnap.exists()) {
		userPref.set(docSnap.data().settings);
	}

	// Load user spots into the UI
	if (docSnap.exists() && docSnap.data().spots.length > 0) {
		// Load spots array into the UI
		userSpots.set(docSnap.data().spots);

		// On load, set the active spot to the first spot by user
		const sortedSpots = get(sortedUserSpots);
		if (sortedSpots.length > 0) {
			activeSpot.set(sortedSpots[0].spotName);
		} else {
			activeSpot.set(docSnap.data().spots[0].spotName); // Just in case 🤷‍♂️
		}
	}
}

export async function checkUser() {
	const user = auth.currentUser;
	const docRef = doc(db, "users", user.uid);
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
	} else {
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
