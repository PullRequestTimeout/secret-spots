<script>
	import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
	import { onMount } from "svelte";
	import { auth, db } from "$lib/firebase/firebase.js";
	import { onAuthStateChanged } from "firebase/auth";
	import { userSpots, activeSpot } from "$lib/stores/userDataStore.js";
	import { goto } from "$app/navigation";

	//TODO: Refine this a little more. There's a lot of repeated variables.

	async function getUserData() {
		const user = auth.currentUser;
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists() && docSnap.data().spots.length > 0) {
			// Load spots array into the UI
			userSpots.set(docSnap.data().spots);
			activeSpot.set(docSnap.data().spots[0].spotName);
		} else if (docSnap.exists() && docSnap.data().spots.length == 0) {
			console.log("This user has no spots saved!");
		} else {
			// docSnap.data() will be undefined in this case
			console.log("There doesn't seem to be a spots array.");
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
				settings: {}
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

	async function updateSpotsInDatabase() {
		const user = auth.currentUser;
		// docRef is a reference to the user document in the users collection
		const docRef = doc(db, "users", user.uid);
		await updateDoc(docRef, { spots: $userSpots });
	}

	// Every time spots store changes, update the DB
	// This be an issue when deleting spots and you remove the last one
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
