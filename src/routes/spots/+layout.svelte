<script>
	import { doc, getDoc, collection } from "firebase/firestore";
	import { onMount } from "svelte";
	import { auth, db } from "$lib/firebase/firebase.js";
	import { onAuthStateChanged, getAuth, signInWithRedirect } from "firebase/auth";

	async function getUserData() {
		const user = getAuth().currentUser;
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists() && docSnap.data().spots.length > 0) {
			// Load spots array into the UI
		} else if (docSnap.exists() && docSnap.data().spots.length == 0) {
			console.log("This user has no spots saved!");
			//
		} else {
			// docSnap.data() will be undefined in this case
			console.log("There doesn't seem to be a spots array.");
		}
	}

	onMount(() =>
		onAuthStateChanged(auth, (user) => {
			if (user) {
				getUserData();
			} else {
				// Redirect home?
			}
		})
	);
</script>

<slot />
