<footer>
	<div class="footer-inner">
		<div class="footer-top">
			<div class="footer-brand">
				<span class="logo"><span class="bracket">&lt;</span>RK<span class="slash">/</span><span class="bracket">&gt;</span></span>
				<p class="tagline">Crafting digital experiences from the neon grid.</p>
			</div>
			<div class="footer-links">
				<a href="https://linkedin.com/in/rishav-kumar" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
				<a href="https://leetcode.com" target="_blank" rel="noopener noreferrer">LEETCODE</a>
				<a href="https://codeforces.com" target="_blank" rel="noopener noreferrer">CODEFORCES</a>
				<a href="https://github.com" target="_blank" rel="noopener noreferrer">GITHUB</a>
			</div>
		</div>
		<div class="footer-divider"></div>
		<div class="footer-bottom">
			<p class="copyright">
				<span class="prompt">&gt;</span> &copy; 2026 RISHAV_KUMAR <span class="separator">//</span> ALL_RIGHTS_RESERVED
			</p>
			<p class="built-with">BUILT WITH SVELTEKIT + TYPESCRIPT</p>
		</div>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid rgba(0, 240, 255, 0.1);
		background: rgba(10, 10, 15, 0.8);
		padding: 3rem 2rem 2rem;
		margin-top: 4rem;
	}

	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.footer-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.logo {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--cyan);
		letter-spacing: 2px;
	}

	.bracket { color: var(--magenta); }
	.slash { color: var(--yellow); }

	.tagline {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-top: 0.5rem;
		letter-spacing: 1px;
	}

	.footer-links {
		display: flex;
		gap: 2rem;
	}

	.footer-links a {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-muted);
		letter-spacing: 2px;
		transition: all 0.3s ease;
	}

	.footer-links a:hover {
		color: var(--cyan);
		text-shadow: 0 0 10px var(--cyan);
	}

	.footer-divider {
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--border-glow), transparent);
		margin: 2rem 0;
	}

	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.copyright {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-muted);
		letter-spacing: 1px;
	}

	.prompt { color: var(--cyan); }
	.separator { color: var(--magenta); }

	.built-with {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: rgba(122, 122, 158, 0.5);
		letter-spacing: 2px;
	}

	@media (max-width: 768px) {
		.footer-top {
			flex-direction: column;
			gap: 1.5rem;
		}

		.footer-links {
			flex-wrap: wrap;
			gap: 1rem;
		}

		.footer-bottom {
			flex-direction: column;
			gap: 0.5rem;
			text-align: center;
		}
	}
</style>
