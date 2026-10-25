<script lang="ts">
	import { onMount } from 'svelte';

	let progress = $state(0);

	onMount(() => {
		const update = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 0 ? window.scrollY / max : 0;
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});
</script>

<div class="bar" style="transform: scaleX({progress})"></div>

<style>
	.bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		z-index: 2000;
		transform-origin: left;
		background: linear-gradient(90deg, var(--cyan), var(--magenta));
		box-shadow: 0 0 10px var(--cyan), 0 0 20px rgba(255, 42, 109, 0.5);
		pointer-events: none;
	}
</style>
