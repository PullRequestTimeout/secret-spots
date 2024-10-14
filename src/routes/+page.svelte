<!-- Home page -->

<script>
	import IconLink from "$lib/components/IconLink.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import ScrollProps from "$lib/components/ScrollProps.svelte";
	import { setAlertMessage } from "$lib/stores/uiStore.js";

	let year = new Date().getFullYear();

	let emailInput = "";
	function handleSignUp() {
		setAlertMessage("Thanks for signing up! We'll keep you updated on new features.");
		emailInput = "";
	}
</script>

<main>
	<div class="content">
		<section class="hero-container">
			<div class="hero">
				<h2 class="large-title">Your travel joural re-imagined</h2>
				<p>
					Welcome to the ultimate travel companion! Discover, document, and relive your adventures
					like never before with our app. From remote campsites to bustling cities, Secret Spots
					ensures no memory fades. Start exploring today!
				</p>
				<div class="cta-links">
					<a href="/login" class="btn btn-hollow shadow">
						<Icon name={"login"} color="--clr-red" />
						Login
					</a>
					<IconLink
						url={"/register"}
						svg={"register"}
						innerText={"Register"}
						className="btn-red shadow"
					/>
				</div>
			</div>
		</section>
		<section class="feature-card-container">
			<div class="feature-card-section">
				<h2 class="small-title">A new way to track your travels</h2>
				<div class="feature-card-collection">
					<ScrollProps let:props className="show" threshold={0.5} once={true}>
						<div class="feature-card shadow {props.class}">
							<img src="locationpin.svg" alt="location pin icon" />
							<p>Add a location using your device's geolocation</p>
						</div>
					</ScrollProps>
					<ScrollProps let:props className="show" threshold={0.5} once={true}>
						<div class="feature-card shadow {props.class}">
							<img src="locationpinmap.svg" alt="location map icon" />
							<p>View the location on an interactive map</p>
						</div>
					</ScrollProps>
					<ScrollProps let:props className="show" threshold={0.5} once={true}>
						<div class="feature-card shadow {props.class}">
							<img src="notepad.svg" alt="journal entry icon" />
							<p>Add details and journal entries for each location</p>
						</div>
					</ScrollProps>
				</div>
			</div>
		</section>
		<section class="cta-container">
			<div class="cta">
				<p>
					Secrets Spots is a great way to keep track of your favorite locations you find while on
					your adventures. Sign up today to start documenting your travels!
				</p>
				<div class="cta-links">
					<a href="/login" class="btn btn-hollow shadow">
						<Icon name={"login"} color="--clr-red" />
						Login
					</a>
					<IconLink
						url={"/register"}
						svg={"register"}
						innerText={"Register"}
						className="btn-red shadow"
					/>
				</div>
			</div>
			<div class="cta-images">
				<img src="campsite.svg" alt="campsite" />
			</div>
		</section>
		<section class="feature-card-container">
			<div class="feature-card-section">
				<h2 class="small-title">More features on the way!</h2>
				<div class="feature-card-collection">
					<ScrollProps let:props className="show" threshold={0.5} once={true}>
						<div class="feature-card shadow {props.class}">
							<img src="locationpinmap2.svg" alt="location map icon" />
							<p>Use the interactive map to add more locations</p>
						</div>
					</ScrollProps>
					<ScrollProps let:props className="show" threshold={0.5} once={true}>
						<div class="feature-card shadow {props.class}">
							<img src="camera.svg" alt="camera icon" />
							<p>Upload photos for each of your spots</p>
						</div>
					</ScrollProps>
					<ScrollProps let:props className="show" threshold={0.5} once={true}>
						<div class="feature-card shadow {props.class}">
							<img src="paperplane.svg" alt="paper plane icon" />
							<p>Send your saved locations to other users</p>
						</div>
					</ScrollProps>
				</div>
			</div>
		</section>
		<section class="email-signup">
			<h2 class="small-title small-title__white">Sign up to stay updated</h2>
			<form on:submit|preventDefault={handleSignUp}>
				<input
					type="email"
					class="txt-inp email-input shadow"
					placeholder="Email..."
					bind:value={emailInput}
				/>
				<button type="submit" class="btn btn-red shadow">Sign up</button>
			</form>
		</section>
		<footer>
			<p>&copy; {year} Secret Spots</p>
		</footer>
		<img class="stacked-waves" src="stacked-waves.svg" alt="Decorative waves svg" />
		<img class="mountain-background" src="mountainscene.svg" alt="Mountain scene backdrop" />
	</div>
</main>

<style>
	main {
		position: relative;
		z-index: 100;
		width: 100%;
		height: calc(var(--window-height) - 4rem);
		overflow: auto;
		overflow-x: hidden;
		overscroll-behavior: none;
		scroll-behavior: smooth;
		padding: 1rem;
	}

	section {
		margin: 8rem 0;
	}

	.content {
		position: relative;
	}

	h2 {
		text-shadow: var(--bx-shdw);
	}

	h2,
	p {
		color: var(--clr-dark-green);
	}

	p {
		font-weight: bold;
		font-size: 1.4rem;
	}

	footer p {
		color: var(--clr-white);
		text-align: center;
	}

	img {
		user-select: none;
	}

	.hero-container {
		margin-top: 10vh;
	}

	.hero-container,
	.feature-card-container,
	.cta-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hero-container {
		margin: 8rem 0;
	}

	.hero,
	.feature-card-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		width: 60%;
		gap: 2rem;
	}

	.large-title {
		font-size: 3rem;
	}

	.small-title {
		font-size: 2rem;
	}

	.small-title__white {
		color: var(--clr-white);
	}

	.feature-card-collection {
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	.feature-card {
		border: 4px solid var(--clr-dark-green);
		border-radius: 0.5rem;
		padding: 2rem;
		background-color: var(--clr-white);
		width: 15rem;
		height: 21rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		gap: 1rem;
		transition: opacity 0.4s;
	}

	.feature-card {
		opacity: 0;
		translate: -0.5rem 0rem;
	}

	.feature-card.show {
		opacity: 1;
		translate: 0 0;
	}

	.cta-links {
		display: flex;
		width: fit-content;
		gap: 2rem;
	}

	.btn-hollow {
		background-color: #ffffff49;
		color: var(--clr-red);
		font-weight: bold;
		text-decoration: none;
		border: 3px solid var(--clr-red);
		backdrop-filter: blur(1px);
	}

	.cta-container {
		gap: 2rem;
		padding: 2rem;
	}

	.cta {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 50%;
		gap: 2rem;
	}

	.btn-hollow:active,
	.btn-hollow:focus {
		outline: none;
		background-color: #ffffffa1;
	}

	.email-signup {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.email-signup form {
		display: flex;
		gap: 1rem;
	}

	.email-input {
		width: 20rem;
		max-width: 90%;
	}

	.mountain-background {
		position: absolute;
		top: -50vh;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0.2;
		width: 100rem;
		z-index: -1;
	}

	.stacked-waves {
		position: absolute;
		z-index: -1;
		width: 102vw;
		left: calc(-1.1rem - 1vw);
		bottom: calc(-1.1rem - 1vw);
	}

	@media (hover: hover) {
		.btn-hollow:hover {
			background-color: #ffffffa1;
		}

		.feature-card {
			transition: transform 0.2s, opacity 0.4s, translate 0.4s;
		}

		.feature-card:hover {
			transform: translateY(-0.2rem);
		}
	}

	@media screen and (max-width: 768px) {
		p {
			font-size: 1.2rem;
		}

		section {
			margin: 4rem 0;
		}

		.hero-container {
			margin: 4rem 0;
		}

		.hero,
		.feature-card-section {
			width: calc(100% - 1rem);
			max-width: calc(100% - 1rem);
		}

		.feature-card-section,
		.feature-card-collection {
			flex-wrap: wrap;
		}

		.feature-card-collection {
			gap: 1rem;
			flex-wrap: wrap;
		}

		.feature-card {
			padding: 1rem;
			max-width: 10rem;
			height: 12rem;
		}

		.feature-card img {
			width: 3rem;
		}

		.feature-card p {
			font-size: 1rem;
		}

		.mountain-background {
			width: 70rem; /* 105vw */
			display: flex;
			justify-content: start;
			align-items: start;
		}

		.large-title {
			font-size: 2rem;
		}

		.small-title {
			font-size: 1.5rem;
		}

		.cta {
			text-align: center;
			width: 100%;
			align-items: center;
		}

		.cta-container {
			position: relative;
			padding: 1rem;
			width: 100%;
		}

		.cta-links {
			gap: 1rem;
		}

		.cta-images {
			position: absolute;
			top: -25%;
			right: -25%;
			opacity: 0.2;
			width: 80vw;
			z-index: -1;
		}

		.cta-images img {
			width: 100%;
			max-width: 25rem;
		}

		.email-signup form {
			flex-direction: column;
			gap: 1rem;
			align-items: center;
		}

		.stacked-waves {
			width: 200vw;
		}
	}
</style>
