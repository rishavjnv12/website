<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(true);
	let screenOpacity = $state(1);
	let lines = $state<{ text: string; color: string }[]>([]);
	let progressWidth = $state(0);

	const bootLines = [
		{ text: '> BIOS v7.2.1 INITIALIZED', color: '#7a7a9e' },
		{ text: '> NEURAL LINK ESTABLISHED...', color: '#00f0ff' },
		{ text: '> SCANNING BIOMETRIC SIGNATURE...', color: '#7a7a9e' },
		{ text: '> USER IDENTIFIED: RISHAV_KUMAR', color: '#00f0ff' },
		{ text: '> CLEARANCE LEVEL: SDE-II ████████', color: '#f9f002' },
		{ text: '> LOADING PORTFOLIO_MODULE.exe...', color: '#7a7a9e' },
		{ text: '> DECRYPTING EXPERIENCE_LOG...', color: '#7a7a9e' },
		{ text: '> MOUNTING SKILL_MATRIX...', color: '#7a7a9e' },
		{ text: '> ALL SYSTEMS NOMINAL', color: '#00ff41' },
		{ text: '> ACCESS GRANTED', color: '#00ff41' },
	];

	onMount(() => {
		let i = 0;
		const totalLines = bootLines.length;

		const addLine = () => {
			if (i < totalLines) {
				lines = [...lines, bootLines[i]];
				progressWidth = Math.round(((i + 1) / totalLines) * 100);
				i++;
				setTimeout(addLine, Math.random() * 180 + 80);
			} else {
				// Finished — fade out
				setTimeout(() => {
					screenOpacity = 0;
					setTimeout(() => {
						visible = false;
					}, 700);
				}, 500);
			}
		};

		setTimeout(addLine, 300);
	});
</script>

{#if visible}
	<div class="boot-screen" style="opacity: {screenOpacity}">
		<div class="boot-content">
			<div class="boot-logo">
				<span class="lb">&lt;</span>RK<span class="sl">/</span><span class="lb">&gt;</span>
			</div>

			<div class="boot-subtitle">CYBERDECK OS // PORTFOLIO INTERFACE</div>

			<div class="boot-lines">
				{#each lines as line}
					<p class="boot-line" style="color: {line.color}">{line.text}</p>
				{/each}
				<span class="boot-cursor">█</span>
			</div>

			<div class="boot-progress-container">
				<div class="boot-progress-label">
					<span>LOADING</span>
					<span>{progressWidth}%</span>
				</div>
				<div class="boot-progress-track">
					<div class="boot-progress-fill" style="width: {progressWidth}%"></div>
				</div>
			</div>
		</div>

		<!-- Scanlines on boot screen too -->
		<div class="boot-scanlines"></div>
	</div>
{/if}

<style>
	.boot-screen {
		position: fixed;
		inset: 0;
		background: #03030a;
		z-index: 999999;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.7s ease;
		overflow: hidden;
	}

	.boot-content {
		text-align: left;
		width: min(600px, 90vw);
		padding: 2rem;
	}

	.boot-logo {
		font-family: 'Orbitron', sans-serif;
		font-size: clamp(2rem, 8vw, 4rem);
		font-weight: 900;
		color: #00f0ff;
		letter-spacing: 8px;
		text-shadow: 0 0 30px #00f0ff, 0 0 60px rgba(0, 240, 255, 0.3);
		margin-bottom: 0.5rem;
		text-align: center;
		animation: logo-flicker 0.1s steps(1) 3;
	}

	@keyframes logo-flicker {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.lb { color: #ff2a6d; }
	.sl { color: #f9f002; }

	.boot-subtitle {
		font-family: 'Share Tech Mono', monospace;
		font-size: 0.65rem;
		color: rgba(0, 240, 255, 0.5);
		letter-spacing: 4px;
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.boot-lines {
		font-family: 'Share Tech Mono', monospace;
		font-size: 0.8rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-height: 200px;
		margin-bottom: 2rem;
	}

	.boot-line {
		animation: line-in 0.08s ease both;
		letter-spacing: 1px;
	}

	@keyframes line-in {
		from { opacity: 0; transform: translateX(-8px); }
		to { opacity: 1; transform: translateX(0); }
	}

	.boot-cursor {
		color: #00f0ff;
		animation: cursor-blink 0.4s steps(1) infinite;
		font-family: 'Share Tech Mono', monospace;
		font-size: 0.9rem;
	}

	@keyframes cursor-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.boot-progress-container {
		border: 1px solid rgba(0, 240, 255, 0.2);
		padding: 0.8rem 1rem;
	}

	.boot-progress-label {
		font-family: 'Share Tech Mono', monospace;
		font-size: 0.65rem;
		color: rgba(0, 240, 255, 0.6);
		letter-spacing: 2px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.boot-progress-track {
		height: 3px;
		background: rgba(0, 240, 255, 0.1);
		overflow: hidden;
	}

	.boot-progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--cyan, #00f0ff), #ff2a6d);
		box-shadow: 0 0 10px #00f0ff;
		transition: width 0.2s ease;
	}

	.boot-scanlines {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.05) 0px,
			rgba(0, 0, 0, 0.05) 1px,
			transparent 1px,
			transparent 4px
		);
	}
</style>
