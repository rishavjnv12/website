<div class="glitch-overlay"></div>
<div class="glitch-tear"></div>

<style>
	/* Main color-shift flash */
	.glitch-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9998;
		opacity: 0;
		animation: glitch-flash 5s infinite;
	}

	@keyframes glitch-flash {
		0%, 88%, 100% { opacity: 0; transform: none; }

		/* First burst */
		89% {
			opacity: 0.06;
			background: repeating-linear-gradient(
				0deg,
				transparent,
				transparent 3px,
				rgba(0, 240, 255, 0.06) 3px,
				rgba(0, 240, 255, 0.06) 4px
			);
			transform: translateX(-3px);
		}
		90% { opacity: 0; }
		91% {
			opacity: 0.08;
			background: linear-gradient(
				90deg,
				transparent 0%,
				rgba(0, 240, 255, 0.12) 18%,
				transparent 18.4%,
				transparent 55%,
				rgba(255, 42, 109, 0.1) 55%,
				transparent 55.4%,
				transparent 80%,
				rgba(249, 240, 2, 0.06) 80%,
				transparent 80.3%
			);
			transform: translateX(4px) skewX(-0.5deg);
		}
		92% { opacity: 0; }
		93% {
			opacity: 0.05;
			background: linear-gradient(
				90deg,
				transparent 35%,
				rgba(255, 42, 109, 0.1) 35%,
				transparent 35.3%,
				transparent 70%,
				rgba(0, 240, 255, 0.08) 70%,
				transparent 70.3%
			);
			transform: translateX(-5px);
		}
		94% { opacity: 0; }

		/* Second burst */
		96% {
			opacity: 0.07;
			background: repeating-linear-gradient(
				0deg,
				transparent,
				transparent 5px,
				rgba(255, 42, 109, 0.06) 5px,
				rgba(255, 42, 109, 0.06) 6px
			);
			transform: translateX(3px) translateY(1px);
		}
		97% {
			opacity: 0.04;
			background: linear-gradient(
				90deg,
				transparent 60%,
				rgba(0, 240, 255, 0.12) 60%,
				transparent 60.5%
			);
			transform: translateX(-2px);
		}
		98% { opacity: 0; transform: none; }
	}

	/* Horizontal screen tear */
	.glitch-tear {
		position: fixed;
		left: 0;
		width: 100%;
		height: 2px;
		pointer-events: none;
		z-index: 9997;
		opacity: 0;
		background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.8), var(--magenta), transparent);
		animation: tear-flash 7s infinite;
		box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
	}

	@keyframes tear-flash {
		0%, 85%, 100% { opacity: 0; top: 0; }
		86% { opacity: 0.6; top: 20%; }
		87% { opacity: 0; top: 22%; }
		88% {
			opacity: 0.4;
			top: 65%;
			background: linear-gradient(90deg, transparent, rgba(255, 42, 109, 0.8), rgba(0, 240, 255, 0.6), transparent);
		}
		89% { opacity: 0; }
	}
</style>
