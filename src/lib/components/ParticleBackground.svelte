<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		let animationId: number;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		// Cyberpunk rain characters: katakana + tech symbols + hex digits
		const rainCharStr = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890123456789ABCDEF<>[]{}|#@$%^&';
		const rainChars = rainCharStr.split('');
		const neonColors = ['#00f0ff', '#ff2a6d', '#f9f002', '#00ff41'];

		interface RainDrop {
			x: number;
			y: number;
			speed: number;
			color: string;
			opacity: number;
			trailLength: number;
			chars: string[];
			charUpdateTimer: number;
		}

		let columns: RainDrop[] = [];

		const initRain = () => {
			const fontSize = 14;
			const numCols = Math.floor(canvas.width / fontSize);
			columns = [];
			for (let i = 0; i < numCols; i++) {
				// Only spawn rain in ~20% of columns for a sparse, atmospheric look
				if (Math.random() > 0.78) {
					const trailLength = Math.floor(Math.random() * 22 + 8);
					columns.push({
						x: i * fontSize,
						y: Math.random() * -canvas.height * 1.5,
						speed: Math.random() * 1.8 + 0.4,
						color: neonColors[Math.floor(Math.random() * neonColors.length)],
						opacity: Math.random() * 0.3 + 0.07,
						trailLength,
						chars: Array.from({ length: trailLength + 1 }, () =>
							rainChars[Math.floor(Math.random() * rainChars.length)]
						),
						charUpdateTimer: Math.random() * 10
					});
				}
			}
		};

		initRain();
		window.addEventListener('resize', initRain);

		interface Particle {
			x: number;
			y: number;
			vx: number;
			vy: number;
			size: number;
			alpha: number;
			color: string;
		}

		const particles: Particle[] = [];
		const particleColors = ['#00f0ff', '#ff2a6d', '#f9f002'];
		for (let i = 0; i < 55; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.35,
				vy: (Math.random() - 0.5) * 0.35,
				size: Math.random() * 2 + 0.5,
				alpha: Math.random() * 0.35 + 0.05,
				color: particleColors[Math.floor(Math.random() * particleColors.length)]
			});
		}

		const fontSize = 14;
		let frame = 0;

		const animate = () => {
			frame++;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

			// Draw digital rain
			for (const drop of columns) {
				drop.y += drop.speed;
				drop.charUpdateTimer--;

				if (drop.charUpdateTimer <= 0) {
					drop.charUpdateTimer = Math.random() * 8 + 3;
					const idx = Math.floor(Math.random() * drop.chars.length);
					drop.chars[idx] = rainChars[Math.floor(Math.random() * rainChars.length)];
				}

				for (let j = 0; j <= drop.trailLength; j++) {
					const charY = drop.y - j * fontSize;
					if (charY < -fontSize || charY > canvas.height + fontSize) continue;

					const char = drop.chars[j % drop.chars.length];

					if (j === 0) {
						// Head: bright white flash
						ctx.globalAlpha = Math.min(drop.opacity * 3.5, 1);
						ctx.fillStyle = '#ffffff';
					} else {
						// Trail: fades toward end
						const fadeFactor = 1 - j / (drop.trailLength + 1);
						ctx.globalAlpha = Math.max(drop.opacity * fadeFactor, 0);
						ctx.fillStyle = drop.color;
					}

					ctx.fillText(char, drop.x, charY);
				}

				if (drop.y - drop.trailLength * fontSize > canvas.height) {
					drop.y = -drop.trailLength * fontSize - Math.random() * 200;
					drop.speed = Math.random() * 1.8 + 0.4;
					drop.opacity = Math.random() * 0.3 + 0.07;
				}
			}

			// Draw particles with glow
			ctx.shadowBlur = 10;
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0) p.x = canvas.width;
				if (p.x > canvas.width) p.x = 0;
				if (p.y < 0) p.y = canvas.height;
				if (p.y > canvas.height) p.y = 0;

				ctx.globalAlpha = p.alpha;
				ctx.shadowColor = p.color;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = p.color;
				ctx.fill();
			}
			ctx.shadowBlur = 0;

			// Draw connections between nearby particles
			ctx.lineWidth = 0.5;
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 130) {
						ctx.globalAlpha = 0.07 * (1 - dist / 130);
						ctx.strokeStyle = '#00f0ff';
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}

			ctx.globalAlpha = 1;
			animationId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
			window.removeEventListener('resize', initRain);
		};
	});
</script>

<canvas bind:this={canvas} class="particle-bg"></canvas>

<style>
	.particle-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: none;
	}
</style>
