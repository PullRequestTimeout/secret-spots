<script>
	import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
	import { onMount } from "svelte";
	import { auth, db } from "$lib/firebase/firebase.js";
	import { onAuthStateChanged } from "firebase/auth";
	import { userSpots, activeSpot, userPref } from "$lib/stores/userDataStore.js";
	import { goto } from "$app/navigation";

	//TODO: Refine this a little more. There's a lot of repeated variables.

	async function getUserData() {
		const user = auth.currentUser;
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists() && docSnap.data().spots.length > 0) {
			// Load spots array into the UI
			userSpots.set(docSnap.data().spots);
			// sortedUserSpots.set(docSnap.data().spots); //Derived store should make this redundant
			activeSpot.set(docSnap.data().spots[0].spotName);
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
	}

	async function checkUser() {
		const user = auth.currentUser;
		// docRef is a reference to the user document in the users collection
		const docRef = doc(db, "users", user.uid);
		// docSnap is a snapshot of the user document
		const docSnap = await getDoc(docRef);

		// If no user document, create one
		if (!docSnap.exists()) {
			console.log("Creating new user");
			const userRef = doc(db, "users", user.uid);
			// Schema
			let userDataForDb = {
				email: user.email,
				displayName: user.displayName,
				spots: [],
				settings: { $userPref }
			};
			console.log(userDataForDb);
			await setDoc(userRef, userDataForDb);
		} else {
			console.log("Fetching user data");
			const userData = docSnap.data();
			console.log(userData);
			getUserData();
		}
	}

	//Update user preferences in the database
	async function updateUserPrefInDatabase() {
		const user = auth.currentUser;
		// docRef is a reference to the user document in the users collection
		if (user) {
			const docRef = doc(db, "users", user.uid);
			await updateDoc(docRef, { settings: $userPref });
		} else {
			console.log("No user signed in");
		}
	}

	// Every time userPref store changes, update the DB
	$: $userPref, updateUserPrefInDatabase();

	async function updateSpotsInDatabase() {
		const user = auth.currentUser;
		// docRef is a reference to the user document in the users collection
		const docRef = doc(db, "users", user.uid);
		await updateDoc(docRef, { spots: $userSpots });
	}

	// Every time spots store changes, update the DB
	// This be an issue when deleting spots and you remove the last one
	// This could be resolved with something like;

	// let intentionalDelete = false
	// $: if ($userSpots.length > 0 || intentionalDelete === true) {
	// 	updateSpotsInDatabase()
	// 	intentionalDelete = false
	// }

	// Then change intentionalDelete to true when $userSpots.length == 1 and a remove spot function is triggered

	$: if ($userSpots.length > 0) {
		updateSpotsInDatabase();
	}

	onMount(() =>
		onAuthStateChanged(auth, (user) => {
			if (user) {
				checkUser();
			}
		})
	);
</script>

<slot />
