<script lang="ts">
	import { onMount } from 'svelte';

	let dot = $state<HTMLDivElement>();
	let ring = $state<HTMLDivElement>();
	let enabled = $state(false);
	let hovering = $state(false);
	let visible = $state(false);

	onMount(() => {
		if (matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		enabled = true;
		// Hide the system pointer only once our cursor is actually running
		document.documentElement.classList.add('custom-cursor');
		const hide = () => (visible = false);

		let x = innerWidth / 2, y = innerHeight / 2;
		let rx = x, ry = y;
		let raf = 0;

		const move = (e: PointerEvent) => {
			x = e.clientX;
			y = e.clientY;
			visible = true;
			hovering = !!(e.target as Element | null)?.closest('a, button, input, textarea, select, [role="button"]');
		};
		const loop = () => {
			rx += (x - rx) * 0.16;
			ry += (y - ry) * 0.16;
			if (dot) dot.style.transform = `translate(${x}px, ${y}px)`;
			if (ring) ring.style.transform = `translate(${rx}px, ${ry}px)`;
			raf = requestAnimationFrame(loop);
		};
		window.addEventListener('pointermove', move);
		document.documentElement.addEventListener('pointerleave', hide);
		raf = requestAnimationFrame(loop);
		return () => {
			document.documentElement.classList.remove('custom-cursor');
			document.documentElement.removeEventListener('pointerleave', hide);
			window.removeEventListener('pointermove', move);
			cancelAnimationFrame(raf);
		};
	});
</script>

{#if enabled}
	<div class="ring" class:hovering class:visible bind:this={ring}></div>
	<div class="dot" class:visible bind:this={dot}></div>
{/if}

<style>
	.dot, .ring {
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 9999;
		border-radius: 50%;
		will-change: transform;
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	.visible { opacity: 1; }
	:global(html.custom-cursor),
	:global(html.custom-cursor *) {
		cursor: none !important;
	}
	.dot {
		width: 6px;
		height: 6px;
		margin: -3px 0 0 -3px;
		background: var(--cyan);
		box-shadow: 0 0 10px var(--cyan);
	}
	.ring {
		width: 34px;
		height: 34px;
		margin: -17px 0 0 -17px;
		border: 1px solid rgba(0, 240, 255, 0.5);
		mix-blend-mode: screen;
	}
	.ring::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(0, 240, 255, 0.18), transparent 70%);
		transition: transform 0.25s ease, background 0.25s ease;
	}
	.ring.hovering { border-color: var(--magenta); }
	.ring.hovering::after {
		transform: scale(1.6);
		background: radial-gradient(circle, rgba(255, 42, 109, 0.25), transparent 70%);
	}
</style>
