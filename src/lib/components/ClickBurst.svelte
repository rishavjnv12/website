<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const ctx = canvas.getContext('2d')!;
		const colors = ['#00f0ff', '#ff2a6d', '#f9f002', '#00ff41'];

		interface Spark { x: number; y: number; vx: number; vy: number; life: number; color: string; }
		interface Ring { x: number; y: number; r: number; life: number; }
		let sparks: Spark[] = [];
		let rings: Ring[] = [];
		let raf = 0;

		const resize = () => {
			canvas.width = innerWidth * devicePixelRatio;
			canvas.height = innerHeight * devicePixelRatio;
			ctx.scale(devicePixelRatio, devicePixelRatio);
		};
		resize();

		const loop = () => {
			ctx.clearRect(0, 0, innerWidth, innerHeight);
			ctx.globalCompositeOperation = 'lighter';

			for (const r of rings) {
				r.r += (120 - r.r) * 0.12;
				r.life -= 0.035;
				ctx.globalAlpha = Math.max(r.life, 0);
				ctx.strokeStyle = '#00f0ff';
				ctx.lineWidth = 2 * r.life;
				ctx.shadowBlur = 20;
				ctx.shadowColor = '#00f0ff';
				ctx.beginPath();
				ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
				ctx.stroke();
			}

			for (const s of sparks) {
				s.x += s.vx;
				s.y += s.vy;
				s.vx *= 0.94;
				s.vy = s.vy * 0.94 + 0.15;
				s.life -= 0.022;
				ctx.globalAlpha = Math.max(s.life, 0);
				ctx.strokeStyle = s.color;
				ctx.shadowColor = s.color;
				ctx.shadowBlur = 12;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(s.x, s.y);
				ctx.lineTo(s.x - s.vx * 3, s.y - s.vy * 3);
				ctx.stroke();
			}

			sparks = sparks.filter((s) => s.life > 0);
			rings = rings.filter((r) => r.life > 0);
			// Only keep the loop alive while there is something to draw
			raf = sparks.length || rings.length ? requestAnimationFrame(loop) : 0;
		};

		const burst = (e: PointerEvent) => {
			rings.push({ x: e.clientX, y: e.clientY, r: 4, life: 1 }, { x: e.clientX, y: e.clientY, r: 0, life: 0.7 });
			for (let i = 0; i < 28; i++) {
				const a = Math.random() * Math.PI * 2;
				const v = Math.random() * 9 + 3;
				sparks.push({
					x: e.clientX,
					y: e.clientY,
					vx: Math.cos(a) * v,
					vy: Math.sin(a) * v,
					life: Math.random() * 0.4 + 0.6,
					color: colors[(Math.random() * colors.length) | 0]
				});
			}
			if (!raf) raf = requestAnimationFrame(loop);
		};

		window.addEventListener('pointerdown', burst);
		window.addEventListener('resize', resize);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('pointerdown', burst);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9997;
	}
</style>
