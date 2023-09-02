<script>
	import Cloud from "$lib/components/Cloud.svelte";
</script>

<div class="cloudCountainer">
	<div id="cloud-1">
		<Cloud name="lrg-cloud-2" />
	</div>
	<div id="cloud-2">
		<Cloud name="sml-cloud-1" />
	</div>
	<div id="cloud-3">
		<Cloud name="med-cloud-3" />
	</div>
	<div id="cloud-4">
		<Cloud name="lrg-cloud-3" />
	</div>
	<div id="cloud-5">
		<Cloud name="lrg-cloud-4" />
	</div>
	<div id="cloud-6">
		<Cloud name="lrg-cloud-5" />
	</div>
	<div id="cloud-7">
		<Cloud name="med-cloud-2" />
	</div>
	<div id="cloud-8">
		<Cloud name="sml-cloud-2" />
	</div>
	<div id="cloud-9">
		<Cloud name="med-cloud-4" />
	</div>
	<div id="cloud-10">
		<Cloud name="sml-cloud-4" />
	</div>
	<div id="cloud-11">
		<Cloud name="sml-cloud-3" />
	</div>
	<div id="cloud-12">
		<Cloud name="med-cloud-1" />
	</div>
</div>

<style>
	.cloudCountainer {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: float 10s ease-in-out infinite alternate;
	}

	.cloudCountainer div {
		position: absolute;
	}

	#cloud-1,
	#cloud-3,
	#cloud-4,
	#cloud-7,
	#cloud-9,
	#cloud-11 {
		display: none;
	}

	@media screen and (min-width: 736px) {
		#cloud-1,
		#cloud-3,
		#cloud-4,
		#cloud-7,
		#cloud-9,
		#cloud-11 {
			display: block;
		}
	}

	#cloud-1 {
		transform: translate(10vw, 20vh);
	}

	#cloud-2 {
		transform: translate(30vw, 10vh);
	}

	#cloud-3 {
		transform: translate(50vw, 20vh);
	}

	#cloud-4 {
		transform: translate(-30vw, 10vh);
	}

	#cloud-5 {
		transform: translate(-20vw, 30vh);
	}

	#cloud-6 {
		transform: translate(-10vw, -20vh);
	}

	#cloud-7 {
		transform: translate(-45vw, -10vh);
	}

	#cloud-8 {
		transform: translate(-25vw, -30vh);
	}

	#cloud-9 {
		transform: translate(20vw, -20vh);
	}

	#cloud-10 {
		transform: translate(40vw, -30vh);
	}

	#cloud-11 {
		transform: translate(-40vw, 40vh);
	}

	#cloud-12 {
		transform: translate(30vw, 40vh);
	}

	@keyframes float {
		0% {
			transform: translate(0px, 0px);
		}
		100% {
			transform: translate(-20px, -30px);
		}
	}
</style>
