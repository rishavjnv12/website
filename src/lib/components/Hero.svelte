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

	<div class="hero-grid"></div>
</section>

<style>
	section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 6rem 2rem 2rem;
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
		background-size: 50px 50px;
		pointer-events: none;
		mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
	}

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
			0 0 20px rgba(0, 240, 255, 0.3),
			0 0 60px rgba(0, 240, 255, 0.1);
	}

	.name::before,
	.name::after {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}

	.name::before {
		color: var(--cyan);
		z-index: -1;
		animation: glitch-1 3s infinite linear alternate-reverse;
	}

	.name::after {
		color: var(--magenta);
		z-index: -2;
		animation: glitch-2 3s infinite linear alternate-reverse;
	}

	@keyframes glitch-1 {
		0%, 90%, 100% { clip-path: inset(0 0 0 0); transform: none; }
		92% { clip-path: inset(40% 0 20% 0); transform: translate(-3px, 0); }
		94% { clip-path: inset(10% 0 60% 0); transform: translate(3px, 0); }
		96% { clip-path: inset(70% 0 5% 0); transform: translate(-2px, 0); }
	}

	@keyframes glitch-2 {
		0%, 90%, 100% { clip-path: inset(0 0 0 0); transform: none; }
		91% { clip-path: inset(30% 0 30% 0); transform: translate(3px, 0); }
		93% { clip-path: inset(50% 0 20% 0); transform: translate(-3px, 0); }
		95% { clip-path: inset(10% 0 70% 0); transform: translate(2px, 0); }
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
		text-shadow: 0 0 15px rgba(249, 240, 2, 0.4);
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
		background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.cta-primary:hover::before {
		opacity: 1;
	}

	.cta-primary:hover {
		box-shadow: 0 0 30px rgba(0, 240, 255, 0.3), inset 0 0 30px rgba(0, 240, 255, 0.05);
		text-shadow: 0 0 10px var(--cyan);
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
		box-shadow: 0 0 20px rgba(255, 42, 109, 0.2);
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
		border: 2px solid var(--text-muted);
		border-radius: 12px;
		display: flex;
		justify-content: center;
		padding-top: 6px;
	}

	.wheel {
		width: 3px;
		height: 8px;
		background: var(--cyan);
		border-radius: 2px;
		animation: scroll-wheel 2s infinite;
	}

	@keyframes scroll-wheel {
		0% { opacity: 1; transform: translateY(0); }
		100% { opacity: 0; transform: translateY(10px); }
	}

	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(30px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
