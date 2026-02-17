<div class="glitch-overlay"></div>

<style>
	.glitch-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9998;
		opacity: 0;
		animation: glitch-flash 8s infinite;
	}

	@keyframes glitch-flash {
		0%, 95%, 100% { opacity: 0; }
		96% {
			opacity: 0.03;
			background: linear-gradient(
				90deg,
				transparent 0%,
				var(--cyan) 20%,
				transparent 20.5%,
				transparent 60%,
				var(--magenta) 60%,
				transparent 60.5%
			);
			transform: translateX(-2px);
		}
		97% {
			opacity: 0;
		}
		98% {
			opacity: 0.02;
			background: linear-gradient(
				90deg,
				transparent 30%,
				var(--magenta) 30%,
				transparent 30.3%
			);
			transform: translateX(2px);
		}
	}
</style>
