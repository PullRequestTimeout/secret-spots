import { writable } from "svelte/store";

// Settings error message
export const alertMessage = writable("");

// Briefly display an alert message on settings page
export function setAlertMessage(message) {
	alertMessage.set(message);
	setTimeout(() => {
		alertMessage.set("");
	}, 2000);
}

// Loading state
export const loading = writable(false);
