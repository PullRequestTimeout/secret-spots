import { writable } from "svelte/store";

export const userSpots = writable([
	// {
	// 	lat: "",
	// 	long: "",
	// 	spotName: "Chimo Cabin",
	// 	iconName: "cabin",
	// 	description:
	// 		"In my opinion the best cabin in the Strawberry Pass network, this cabin is a quick 20-30min walk from the summit parking lot and offers a great view of Old Glory. There is a woodstove with a usually fully stocked woodshed, and plenty of space outside for an outdoor fire.",
	// 	journalEntries: []
	// },
	// {
	// 	lat: "",
	// 	long: "",
	// 	spotName: "Good Dog Walk",
	// 	iconName: "paw",
	// 	description: "I walked some dogs here sometime, it was heaps sick aye.",
	// 	journalEntries: []
	// },
	// {
	// 	lat: "",
	// 	long: "",
	// 	spotName: "Trail Up to Old Glory",
	// 	iconName: "mountain",
	// 	description:
	// 		"The start of the Old Glory trail, just off the west side of Highway 3B between Blackjack Ski Area and Strawberry Passs summit. ",
	// 	journalEntries: []
	// },
	// {
	// 	lat: "",
	// 	long: "",
	// 	spotName: "Culvert near Patterson",
	// 	iconName: "swimming",
	// 	description:
	// 		"Rossland kinda sucks on really hot summer days due to the lack of water in town, but this spot is a nice little locals only secret for a sneaky dip when it's blazing hot out. Just past the Seven Summits trail in Patterson, this is just off the right side of the road heading towards the US border.",
	// 	journalEntries: [
	// 		{
	// 			date: "7/3/2023",
	// 			text: "It was a lovely, balmy summer day. The tits were sweaty and the beers were cold."
	// 		}
	// 	]
	// },
	// {
	// 	lat: "",
	// 	long: "",
	// 	spotName: "That swimming hole on the way to Kelowna",
	// 	description:
	// 		"A decomissioned rec site by the north fork of the Kettle River. Turn off the highway towards the river, follow the FSR across the bridge. Turn left onto the Kettle Valley Railgrade and the site is about 200m down on the left.",
	// 	iconName: "camping",
	// 	journalEntries: []
	// },
	// {
	// 	lat: "",
	// 	long: "",
	// 	spotName: "Snowshoe Loop at WH20",
	// 	iconName: "snowshoe",
	// 	description: "You can snowshoe from here up to Ymir Peak, and base jump off if you wish.",
	// 	journalEntries: []
	// }
]);

export const activeSpot = writable("");

export const userPref = writable({
	date: "ymd"
});
