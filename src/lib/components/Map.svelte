<script>
	import { Loader } from "@googlemaps/js-api-loader";
	import { setAlertMessage } from "$lib/stores/uiStore.js";
	import { userPref } from "$lib/stores/userDataStore.js";
	import { onMount } from "svelte";

	// Props
	export let lat = 0;
	export let long = 0;
	export let name = "";

	// Map position
	let position = { lat: lat, lng: long };

	// Bounding box
	let bounds = {
		north: position.lat + 0.04,
		south: position.lat - 0.04,
		east: position.lng + 0.04,
		west: position.lng - 0.04
	};

	// Map element
	let mapElement;

	// Map parameters, change lat and lng to props
	const mapOptions = {
		center: position,
		zoom: 15,
		disableDefaultUI: true,
		restriction: {
			latLngBounds: bounds,
			strictBounds: false
		}
	};

	const loader = new Loader({
		apiKey: import.meta.env.VITE_MAP_API_KEY,
		version: "weekly"
	});

	async function initMap() {
		try {
			// This is a workaround to avoid the error "google is not defined"
			loader.load();
			const { Map } = await google.maps.importLibrary("maps");
			const map = new Map(mapElement, mapOptions);

			new google.maps.Marker({
				map: map,
				position: position,
				title: name
			});
			const styles = {
				default: [
					{
						featureType: "poi.business",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "transit",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.school",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.attraction",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.government",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.medical",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.place_of_worship",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.sports_complex",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.park",
						elementType: "labels",
						stylers: [{ visibility: "off" }]
					}
				],
				retro: [
					{ elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
					{ elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
					{ elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
					{
						featureType: "administrative",
						elementType: "geometry.stroke",
						stylers: [{ color: "#c9b2a6" }]
					},
					{
						featureType: "administrative.land_parcel",
						elementType: "geometry.stroke",
						stylers: [{ color: "#dcd2be" }]
					},
					{
						featureType: "administrative.land_parcel",
						elementType: "labels.text.fill",
						stylers: [{ color: "#ae9e90" }]
					},
					{
						featureType: "landscape.natural",
						elementType: "geometry",
						stylers: [{ color: "#dfd2ae" }]
					},
					{
						featureType: "poi",
						elementType: "geometry",
						stylers: [{ color: "#dfd2ae" }]
					},
					{
						featureType: "poi",
						elementType: "labels.text.fill",
						stylers: [{ color: "#93817c" }]
					},
					{
						featureType: "poi.park",
						elementType: "geometry.fill",
						stylers: [{ color: "#a5b076" }]
					},
					{
						featureType: "poi.park",
						elementType: "labels.text.fill",
						stylers: [{ color: "#447530" }]
					},
					{
						featureType: "road",
						elementType: "geometry",
						stylers: [{ color: "#f5f1e6" }]
					},
					{
						featureType: "road.arterial",
						elementType: "geometry",
						stylers: [{ color: "#fdfcf8" }]
					},
					{
						featureType: "road.highway",
						elementType: "geometry",
						stylers: [{ color: "#f8c967" }]
					},
					{
						featureType: "road.highway",
						elementType: "geometry.stroke",
						stylers: [{ color: "#e9bc62" }]
					},
					{
						featureType: "road.highway.controlled_access",
						elementType: "geometry",
						stylers: [{ color: "#e98d58" }]
					},
					{
						featureType: "road.highway.controlled_access",
						elementType: "geometry.stroke",
						stylers: [{ color: "#db8555" }]
					},
					{
						featureType: "road.local",
						elementType: "labels.text.fill",
						stylers: [{ color: "#806b63" }]
					},
					{
						featureType: "transit.line",
						elementType: "geometry",
						stylers: [{ color: "#dfd2ae" }]
					},
					{
						featureType: "transit.line",
						elementType: "labels.text.fill",
						stylers: [{ color: "#8f7d77" }]
					},
					{
						featureType: "transit.line",
						elementType: "labels.text.stroke",
						stylers: [{ color: "#ebe3cd" }]
					},
					{
						featureType: "transit.station",
						elementType: "geometry",
						stylers: [{ color: "#dfd2ae" }]
					},
					{
						featureType: "water",
						elementType: "geometry.fill",
						stylers: [{ color: "#b9d3c2" }]
					},
					{
						featureType: "water",
						elementType: "labels.text.fill",
						stylers: [{ color: "#92998d" }]
					},
					{
						featureType: "poi.business",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "transit",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.school",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.attraction",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.government",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.medical",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.place_of_worship",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.sports_complex",
						stylers: [{ visibility: "off" }]
					},
					{
						featureType: "poi.park",
						elementType: "labels",
						stylers: [{ visibility: "off" }]
					}
				]
			};

			const mapStyle = $userPref.map;
			map.setOptions({ styles: styles[mapStyle] });
		} catch (error) {
			setAlertMessage("Error loading map.", 3);
			console.error(error);
		}
	}

	onMount(() => {
		initMap();
	});
</script>

<div class="map" bind:this={mapElement} />

<style>
	.map {
		width: 100%;
		height: 100%;
	}

	.map:focus,
	.map:active {
		outline: none;
	}
</style>
