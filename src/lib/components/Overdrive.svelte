<script lang="ts">
	import { onMount } from 'svelte';

	const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
	let active = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	export function trigger() {
		if (active) return;
		active = true;
		document.documentElement.classList.add('overdrive');
		clearTimeout(timer);
		timer = setTimeout(() => {
			active = false;
			document.documentElement.classList.remove('overdrive');
		}, 8000);
	}

	onMount(() => {
		let pos = 0;
		const onKey = (e: KeyboardEvent) => {
			pos = e.key === KONAMI[pos] ? pos + 1 : e.key === KONAMI[0] ? 1 : 0;
			if (pos === KONAMI.length) {
				pos = 0;
				trigger();
			}
		};
		const onEvent = () => trigger();
		window.addEventListener('keydown', onKey);
		window.addEventListener('overdrive', onEvent);
		return () => {
			clearTimeout(timer);
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('overdrive', onEvent);
			document.documentElement.classList.remove('overdrive');
		};
	});
</script>

{#if active}
	<div class="banner" data-text="// OVERDRIVE ENGAGED //">// OVERDRIVE ENGAGED //</div>
{/if}

<style>
	.banner {
		position: fixed;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		z-index: 9996;
		pointer-events: none;
		font-family: var(--font-display);
		font-weight: 900;
		font-size: clamp(1.4rem, 6vw, 4rem);
		letter-spacing: 6px;
		white-space: nowrap;
		color: var(--yellow);
		text-shadow: 0 0 20px var(--yellow), 0 0 60px var(--magenta);
		animation: banner 8s ease forwards;
	}
	.banner::before, .banner::after {
		content: attr(data-text);
		position: absolute;
		inset: 0;
	}
	.banner::before { color: var(--cyan); animation: split 0.3s steps(2) infinite; }
	.banner::after { color: var(--magenta); animation: split 0.3s steps(2) infinite reverse; }

	@keyframes banner {
		0% { opacity: 0; transform: scale(3); filter: blur(10px); }
		6% { opacity: 1; transform: scale(1); filter: none; }
		25% { opacity: 1; }
		35%, 100% { opacity: 0; transform: scale(1.1); }
	}
	@keyframes split {
		0% { clip-path: inset(10% 0 60% 0); transform: translate(-6px, 0); }
		50% { clip-path: inset(55% 0 15% 0); transform: translate(6px, 0); }
		100% { clip-path: inset(30% 0 40% 0); transform: translate(-3px, 0); }
	}
</style>
