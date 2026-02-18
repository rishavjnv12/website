<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);
	let sectionEl: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) visible = true;
			},
			{ threshold: 0.2 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="about" bind:this={sectionEl}>
	<div class="section-wrapper" class:visible>
		<div class="section-header">
			<span class="section-number">01</span>
			<h2>ABOUT<span class="dot">_</span>ME</h2>
			<div class="header-line"></div>
		</div>

		<div class="about-grid">
			<div class="about-text">
				<div class="terminal-window">
					<div class="terminal-header">
						<span class="terminal-dot red"></span>
						<span class="terminal-dot yellow"></span>
						<span class="terminal-dot green"></span>
						<span class="terminal-title">rishav@cyberdeck:~</span>
					</div>
					<div class="terminal-body">
						<p><span class="prompt">$</span> cat about.txt</p>
						<br>
						<p>Hey, I'm <span class="hl-cyan">Rishav Kumar</span> - an iOS developer who thrives on crafting
						native mobile experiences that feel fluid and alive. Currently building at
						<a href="https://www.temple.com/" target="_blank" rel="noopener noreferrer" class="hl-yellow cyber-link">Temple</a>, a startup by <span class="hl-magenta">Deepinder Goyal</span>
						(founder of Zomato).</p>
						<br>
						<p>With <span class="hl-cyan">3+ years</span> of professional experience shipping production iOS apps,
						I specialize in <span class="hl-yellow">Swift, UIKit, SwiftUI</span>, and modern architectures like
						<span class="hl-magenta">MVVM</span> and <span class="hl-magenta">MVI</span>.</p>
						<br>
						<p>Previously at <a href="https://navi.com/" target="_blank" rel="noopener noreferrer" class="hl-cyan cyber-link">Navi Technologies</a>, I built critical fintech flows -
						from KYC to Home Loans to CIBIL Score features - and mentored teams to deliver at scale.
						I'm passionate about clean code, competitive programming, and pushing the boundaries of
						what's possible on iOS.</p>
						<br>
						<p class="blink"><span class="prompt">$</span> <span class="cursor-block">_</span></p>
					</div>
				</div>
			</div>

			<div class="about-stats">
				<div class="stat-card">
					<div class="stat-value">3+</div>
					<div class="stat-label">YEARS_EXP</div>
					<div class="stat-bar"><div class="stat-fill" style="width: 75%"></div></div>
				</div>
				<div class="stat-card">
					<div class="stat-value">1000+</div>
					<div class="stat-label">DSA_SOLVED</div>
					<div class="stat-bar"><div class="stat-fill magenta" style="width: 90%"></div></div>
				</div>
				<div class="stat-card">
					<div class="stat-value">SDE-2</div>
					<div class="stat-label">CURRENT_LEVEL</div>
					<div class="stat-bar"><div class="stat-fill yellow" style="width: 60%"></div></div>
				</div>
				<div class="stat-card">
					<div class="stat-value">B.Tech</div>
					<div class="stat-label">EDUCATION</div>
					<div class="stat-bar"><div class="stat-fill" style="width: 100%"></div></div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		padding: 6rem 0;
	}

	.section-wrapper {
		opacity: 0;
		transform: translateY(40px);
		transition: all 0.8s ease;
	}

	.section-wrapper.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.section-number {
		font-family: var(--font-display);
		font-size: 1rem;
		color: var(--cyan);
		font-weight: 700;
	}

	h2 {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		letter-spacing: 4px;
		color: var(--text-primary);
	}

	.dot {
		color: var(--magenta);
		animation: blink 1s infinite;
	}

	.header-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--border-glow), transparent);
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 3rem;
		align-items: start;
	}

	.terminal-window {
		background: var(--dark-card);
		border: 1px solid var(--border-glow);
		border-radius: 8px;
		overflow: hidden;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0.8rem 1rem;
		background: rgba(0, 240, 255, 0.05);
		border-bottom: 1px solid var(--border-glow);
	}

	.terminal-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.terminal-dot.red { background: #ff5f56; }
	.terminal-dot.yellow { background: #ffbd2e; }
	.terminal-dot.green { background: #27c93f; }

	.terminal-title {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-muted);
		margin-left: 0.5rem;
	}

	.terminal-body {
		padding: 1.5rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		line-height: 1.8;
		color: var(--text-muted);
	}

	.prompt { color: var(--cyan); font-weight: bold; }
	.hl-cyan { color: var(--cyan); }
	.hl-magenta { color: var(--magenta); }
	.hl-yellow { color: var(--yellow); }

	.cursor-block {
		background: var(--cyan);
		color: var(--dark-bg);
		padding: 0 2px;
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.about-stats {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.stat-card {
		background: var(--dark-card);
		border: 1px solid rgba(0, 240, 255, 0.1);
		padding: 1.2rem 1.5rem;
		clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		border-color: var(--cyan);
		box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
	}

	.stat-value {
		font-family: var(--font-display);
		font-size: 1.8rem;
		font-weight: 800;
		color: var(--cyan);
		text-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-muted);
		letter-spacing: 2px;
		margin-top: 0.3rem;
	}

	.stat-bar {
		height: 3px;
		background: rgba(255, 255, 255, 0.05);
		margin-top: 0.8rem;
		border-radius: 2px;
		overflow: hidden;
	}

	.stat-fill {
		height: 100%;
		background: var(--cyan);
		box-shadow: 0 0 10px var(--cyan);
		border-radius: 2px;
		transition: width 1.5s ease;
	}

	.stat-fill.magenta {
		background: var(--magenta);
		box-shadow: 0 0 10px var(--magenta);
	}

	.stat-fill.yellow {
		background: var(--yellow);
		box-shadow: 0 0 10px var(--yellow);
	}

	@media (max-width: 768px) {
		.about-grid {
			grid-template-columns: 1fr;
		}

		.about-stats {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 480px) {
		.about-stats {
			grid-template-columns: 1fr;
		}
	}
</style>
