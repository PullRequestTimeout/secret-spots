import { writable } from "svelte/store";

export const userSpotStore = writable({
	spots: [
		{ spotName: "Chimo Cabin", iconName: "cabin" },
		{ spotName: "Good Dog Walk", iconName: "paw" },
		{ spotName: "Trail Up to Old Glory", iconName: "mountain" },
		{ spotName: "Culvert near Patterson", iconName: "swimming" },
		{
			spotName: "That swimming hole on the way to Kelowna",
			description:
				"A decomissioned rec site by the north fork of the Kettle River. Turn off the highway towards the river, follow the FSR across the bridge. Turn left onto the Kettle Valley Railgrade and the site is about 200m down on the left.",
			iconName: "camping"
		},
		{ spotName: "Snowshoe Loop at WH20", iconName: "snowshoe" }
	],
	activeSpot: ""
});

export const spotObj = {
	lat: "",
	long: "",
	spotName: "",
	iconName: "",
	description: "",
	journalEntries: []
};

// export const userPreferences = writable()
