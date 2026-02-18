<div class="scanlines"></div>
<div class="vignette"></div>

<style>
	/* CRT scanlines with subtle flicker */
	.scanlines {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.04) 0px,
			rgba(0, 0, 0, 0.04) 1px,
			transparent 1px,
			transparent 4px
		);
		animation: crt-flicker 10s infinite;
	}

	@keyframes crt-flicker {
		0%, 94%, 100% { opacity: 1; }
		95% { opacity: 0.85; }
		95.5% { opacity: 1; }
		97% { opacity: 0.9; }
		97.3% { opacity: 1; }
		99% { opacity: 0.88; }
		99.4% { opacity: 1; }
	}

	/* Screen vignette — darkens edges for immersive look */
	.vignette {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9996;
		background: radial-gradient(
			ellipse at center,
			transparent 50%,
			rgba(0, 0, 0, 0.5) 100%
		);
	}
</style>
