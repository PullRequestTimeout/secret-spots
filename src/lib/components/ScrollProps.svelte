<!-- 
	Usage:
	<ScrollProps let:props className="show" threshold={0.5} once={true}>
		<div class={props.class}>CONTENT</div>
	</ScrollProps>

	Then style the div and the animation class as needed in the parent component. "Show", the animation class, 
    can be any class name allowing for unique animations.
-->

<script>
	import { onMount } from "svelte";
	export let className = "";
	export let threshold = 0.1;
	export let once = false;

	let props = {
		class: ""
	};
	let container;
	let hasAppliedClass = false;

	function handleIntersection(entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (!once || (once && !hasAppliedClass)) {
					props = { ...props, class: className };
					hasAppliedClass = true;
				}
			} else {
				if (!once) {
					props = { ...props, class: "" };
				}
			}
		});
	}

	onMount(() => {
		const observer = new IntersectionObserver(handleIntersection, {
			threshold: threshold
		});
		if (container) {
			observer.observe(container);
		}
	});
</script>

<div bind:this={container}>
	<slot {props} />
</div>
