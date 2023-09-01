<script>
	export let name = "";
	export let color = "";
	export let size = "32";

	let inputColor;
	switch (color) {
		case "--clr-black":
			inputColor = "#121212";
			break;
		case "--clr-off-white":
			inputColor = "#eaeaea";
			break;
		case "--clr-white":
			inputColor = "#ffffff";
			break;
		case "--clr-light-green":
			inputColor = "#a7c957";
			break;
		case "--clr-green":
			inputColor = "#6a994e";
			break;
		case "--clr-dark-green":
			inputColor = "#386641";
			break;
		case "--clr-darker-green":
			inputColor = "#315c3a";
			break;
		case "--clr-cream":
			inputColor = "#f2e8cf";
			break;
		case "--clr-red":
			inputColor = "#bc4749";
			break;
		case "--clr-dark-red":
			inputColor = "#a0393b";
			break;
		default:
			inputColor = color;
			break;
	}

	let icons = [
		{
			name: "add",
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>`
		},
		{
			name: "coffee",
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="M160-120v-60h640v60H160Zm151-140q-63 0-107-43.5T160-410v-430h660q24.75 0 42.375 17.625T880-780v160q0 24.75-17.625 42.375T820-560h-96v150q0 63-44 106.5T573-260H311Zm413-360h96v-160h-96v160Z"/></svg>`
		},
		{
			name: "location",
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/></svg>`
		},
		{
			name: "login",
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z"/></svg>`
		},
		{
			name: "logout",
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z"/></svg>`
		},
		{
			name: "mail",
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302 340-223v-55L480-522 140-740v55l340 223Z"/></svg>`
		},
		{
			name: "person",
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>`
		},
		{
			name: "register",
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z"/></svg>`
		},
		{
			name: "settings",
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width=${size} fill=${inputColor}><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"/></svg>`
		}
		// {
		// 	name: "",
		// 	svg: ``
		// }
	];

	let displayIcon = icons.find((e) => e.name === name);
</script>

{@html displayIcon.svg}
