<script lang="ts">
	import { onMount } from 'svelte';

	let typedText = $state('');
	const fullText = 'iOS Developer';
	let showCursor = $state(true);

	onMount(() => {
		let i = 0;
		const typeInterval = setInterval(() => {
			if (i < fullText.length) {
				typedText = fullText.slice(0, i + 1);
				i++;
			} else {
				clearInterval(typeInterval);
			}
		}, 100);

		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 530);

		return () => {
			clearInterval(typeInterval);
			clearInterval(cursorInterval);
		};
	});
</script>

<section id="hero">
	<div class="hero-content">
		<!-- HUD corner brackets -->
		<div class="hud-corners">
			<div class="hud-corner tl"></div>
			<div class="hud-corner tr"></div>
			<div class="hud-corner bl"></div>
			<div class="hud-corner br"></div>
		</div>

		<!-- Status bar -->
		<div class="status-bar">
			<span class="status-dot"></span>
			<span class="status-text">SYS_ONLINE</span>
			<span class="status-sep">//</span>
			<span class="status-text">NODE: INDIA</span>
			<span class="status-sep">//</span>
			<span class="status-text">UPTIME: 3YRS</span>
		</div>

		<div class="glitch-container">
			<p class="pre-title">// INITIALIZING PROFILE...</p>
			<h1 class="name" data-text="RISHAV KUMAR">RISHAV KUMAR</h1>
			<div class="title-line">
				<span class="chevron">&gt;</span>
				<span class="typed">{typedText}</span>
				<span class="cursor" class:visible={showCursor}>_</span>
			</div>
		</div>

		<p class="tagline">Building pixel-perfect native experiences at <span class="highlight">Temple</span></p>

		<div class="cta-group">
			<a href="#contact" class="cta-primary">
				<span class="cta-text">INITIATE_CONTACT</span>
				<span class="cta-arrow">&rarr;</span>
			</a>
			<a href="#experience" class="cta-secondary">VIEW_LOGS</a>
		</div>

		<div class="scroll-indicator">
			<div class="mouse">
				<div class="wheel"></div>
			</div>
			<span>SCROLL_DOWN</span>
		</div>
	</div>

	<!-- Perspective grid layers -->
	<div class="hero-grid"></div>
	<div class="hero-grid-perspective"></div>

	<!-- Scan line sweep -->
	<div class="scan-sweep"></div>
</section>

<style>
	section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 6rem 2rem 2rem;
		overflow: hidden;
	}

	/* Flat grid overlay */
	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px);
		background-size: 50px 50px;
		pointer-events: none;
		mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
	}

	/* Perspective grid receding to horizon */
	.hero-grid-perspective {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50%;
		pointer-events: none;
		background-image:
			linear-gradient(rgba(0, 240, 255, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px);
		background-size: 80px 40px;
		transform: perspective(400px) rotateX(60deg);
		transform-origin: bottom center;
		mask-image: linear-gradient(to top, black 0%, transparent 80%);
	}

	/* Periodic scan-line sweep */
	.scan-sweep {
		position: absolute;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.6), transparent);
		box-shadow: 0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(0, 240, 255, 0.1);
		pointer-events: none;
		animation: scan-sweep 6s linear infinite;
		opacity: 0;
	}

	@keyframes scan-sweep {
		0% { top: -3px; opacity: 0; }
		5% { opacity: 1; }
		95% { opacity: 0.8; }
		100% { top: 100%; opacity: 0; }
	}

	/* HUD corner brackets */
	.hud-corners {
		position: absolute;
		inset: -20px;
		pointer-events: none;
	}

	.hud-corner {
		position: absolute;
		width: 30px;
		height: 30px;
		border-color: var(--cyan);
		border-style: solid;
		opacity: 0.6;
		animation: hud-pulse 3s ease-in-out infinite;
	}

	.hud-corner.tl {
		top: 0; left: 0;
		border-width: 2px 0 0 2px;
		box-shadow: -2px -2px 8px rgba(0, 240, 255, 0.4);
	}
	.hud-corner.tr {
		top: 0; right: 0;
		border-width: 2px 2px 0 0;
		box-shadow: 2px -2px 8px rgba(0, 240, 255, 0.4);
	}
	.hud-corner.bl {
		bottom: 0; left: 0;
		border-width: 0 0 2px 2px;
		box-shadow: -2px 2px 8px rgba(0, 240, 255, 0.4);
	}
	.hud-corner.br {
		bottom: 0; right: 0;
		border-width: 0 2px 2px 0;
		box-shadow: 2px 2px 8px rgba(0, 240, 255, 0.4);
	}

	@keyframes hud-pulse {
		0%, 100% { opacity: 0.4; }
		50% { opacity: 0.9; }
	}

	/* Status bar */
	.status-bar {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--text-muted);
		letter-spacing: 2px;
		margin-bottom: 1.5rem;
		animation: fadeInUp 0.8s ease 0.1s both;
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #00ff41;
		box-shadow: 0 0 8px #00ff41, 0 0 16px rgba(0, 255, 65, 0.4);
		animation: dot-pulse 2s ease-in-out infinite;
	}

	@keyframes dot-pulse {
		0%, 100% { opacity: 1; box-shadow: 0 0 8px #00ff41; }
		50% { opacity: 0.6; box-shadow: 0 0 16px #00ff41, 0 0 30px rgba(0, 255, 65, 0.3); }
	}

	.status-text { color: #00ff41; font-size: 0.6rem; }
	.status-sep { color: var(--magenta); }

	.hero-content {
		text-align: center;
		position: relative;
		z-index: 1;
	}

	.pre-title {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-bottom: 1rem;
		letter-spacing: 3px;
		animation: fadeInUp 0.8s ease 0.2s both;
	}

	.name {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 900;
		color: var(--text-primary);
		letter-spacing: 6px;
		position: relative;
		animation: fadeInUp 0.8s ease 0.4s both;
		text-shadow:
			0 0 20px rgba(0, 240, 255, 0.5),
			0 0 60px rgba(0, 240, 255, 0.2),
			0 0 100px rgba(0, 240, 255, 0.08);
	}

	/* Cyan channel — glitches aggressively */
	.name::before {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		color: var(--cyan);
		z-index: -1;
		animation: glitch-1 2.5s infinite linear alternate-reverse;
		text-shadow: 0 0 15px var(--cyan);
	}

	/* Magenta channel — glitches out-of-phase */
	.name::after {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		color: var(--magenta);
		z-index: -2;
		animation: glitch-2 2.5s infinite linear alternate-reverse;
		text-shadow: 0 0 15px var(--magenta);
	}

	@keyframes glitch-1 {
		0%, 75%, 100% { clip-path: inset(0 0 0 0); transform: none; filter: none; }
		77% { clip-path: inset(15% 0 55% 0); transform: translate(-7px, 1px); filter: hue-rotate(90deg); }
		79% { clip-path: inset(60% 0 8% 0); transform: translate(6px, -2px); }
		81% { clip-path: inset(35% 0 28% 0); transform: translate(-5px, 3px); filter: hue-rotate(180deg); }
		83% { clip-path: inset(5% 0 80% 0); transform: translate(8px, 0); }
		85% { clip-path: inset(0 0 0 0); transform: none; filter: none; }
		/* Second burst */
		92% { clip-path: inset(45% 0 25% 0); transform: translate(-6px, 2px); filter: hue-rotate(60deg); }
		94% { clip-path: inset(10% 0 65% 0); transform: translate(5px, -1px); }
		96% { clip-path: inset(0 0 0 0); transform: none; filter: none; }
	}

	@keyframes glitch-2 {
		0%, 75%, 100% { clip-path: inset(0 0 0 0); transform: none; filter: none; }
		76% { clip-path: inset(25% 0 40% 0); transform: translate(7px, -2px); filter: hue-rotate(-90deg); }
		78% { clip-path: inset(55% 0 15% 0); transform: translate(-6px, 2px); }
		80% { clip-path: inset(0% 0 70% 0); transform: translate(5px, 1px); filter: hue-rotate(120deg); }
		82% { clip-path: inset(40% 0 35% 0); transform: translate(-4px, -1px); }
		84% { clip-path: inset(0 0 0 0); transform: none; filter: none; }
		/* Second burst */
		91% { clip-path: inset(20% 0 55% 0); transform: translate(6px, 1px); filter: hue-rotate(-60deg); }
		93% { clip-path: inset(65% 0 10% 0); transform: translate(-5px, 2px); }
		95% { clip-path: inset(0 0 0 0); transform: none; filter: none; }
	}

	.title-line {
		font-family: var(--font-mono);
		font-size: clamp(1.2rem, 3vw, 1.8rem);
		color: var(--cyan);
		margin-top: 0.5rem;
		animation: fadeInUp 0.8s ease 0.6s both;
	}

	.chevron {
		color: var(--magenta);
		margin-right: 0.5rem;
		text-shadow: 0 0 10px var(--magenta);
	}

	.cursor {
		color: var(--cyan);
		opacity: 0;
		transition: opacity 0.1s;
	}

	.cursor.visible {
		opacity: 1;
	}

	.tagline {
		font-family: var(--font-body);
		font-size: 1.2rem;
		color: var(--text-muted);
		margin-top: 1.5rem;
		font-weight: 400;
		letter-spacing: 1px;
		animation: fadeInUp 0.8s ease 0.8s both;
	}

	.highlight {
		color: var(--yellow);
		font-weight: 600;
		text-shadow: 0 0 15px rgba(249, 240, 2, 0.5), 0 0 30px rgba(249, 240, 2, 0.2);
	}

	.cta-group {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		margin-top: 3rem;
		animation: fadeInUp 0.8s ease 1s both;
	}

	.cta-primary {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		padding: 1rem 2rem;
		background: transparent;
		border: 1px solid var(--cyan);
		color: var(--cyan);
		text-decoration: none;
		letter-spacing: 2px;
		display: flex;
		align-items: center;
		gap: 0.8rem;
		clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.cta-primary::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(0, 240, 255, 0.15), transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.cta-primary:hover::before {
		opacity: 1;
	}

	.cta-primary:hover {
		box-shadow:
			0 0 30px rgba(0, 240, 255, 0.4),
			0 0 60px rgba(0, 240, 255, 0.1),
			inset 0 0 30px rgba(0, 240, 255, 0.05);
		text-shadow: 0 0 10px var(--cyan);
		color: var(--cyan);
	}

	.cta-primary:hover .cta-arrow {
		transform: translateX(4px);
	}

	.cta-arrow {
		transition: transform 0.3s ease;
	}

	.cta-secondary {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		padding: 1rem 2rem;
		color: var(--text-muted);
		text-decoration: none;
		letter-spacing: 2px;
		border: 1px solid rgba(122, 122, 158, 0.3);
		transition: all 0.3s ease;
	}

	.cta-secondary:hover {
		color: var(--magenta);
		border-color: var(--magenta);
		box-shadow: 0 0 20px rgba(255, 42, 109, 0.25), 0 0 40px rgba(255, 42, 109, 0.1);
		text-shadow: 0 0 10px var(--magenta);
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.8rem;
		animation: fadeInUp 0.8s ease 1.5s both;
	}

	.scroll-indicator span {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--text-muted);
		letter-spacing: 3px;
	}

	.mouse {
		width: 22px;
		height: 36px;
		border: 2px solid rgba(0, 240, 255, 0.4);
		border-radius: 12px;
		display: flex;
		justify-content: center;
		padding-top: 6px;
		box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
	}

	.wheel {
		width: 3px;
		height: 8px;
		background: var(--cyan);
		border-radius: 2px;
		animation: scroll-wheel 2s infinite;
		box-shadow: 0 0 6px var(--cyan);
	}

	@keyframes scroll-wheel {
		0% { opacity: 1; transform: translateY(0); }
		100% { opacity: 0; transform: translateY(10px); }
	}

	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(30px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@media (max-width: 768px) {
		.hud-corners { display: none; }
		.status-bar { justify-content: center; flex-wrap: wrap; }
	}
</style>
