<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Achievements from '$lib/components/Achievements.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import GlitchOverlay from '$lib/components/GlitchOverlay.svelte';
	import ScanLines from '$lib/components/ScanLines.svelte';
	import BootSequence from '$lib/components/BootSequence.svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<BootSequence />
<ScanLines />
<GlitchOverlay />
<ParticleBackground />

<div class="app" class:mounted>
	<Navbar />
	<main>
		<Hero />
		<About />
		<Experience />
		<Skills />
		<Achievements />
		<Contact />
	</main>
	<Footer />
</div>

<style>
	.app {
		position: relative;
		z-index: 1;
		opacity: 0;
		transition: opacity 0.8s ease;
	}

	.app.mounted {
		opacity: 1;
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}
</style>
