<script lang="ts">
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	const navLinks = [
		{ label: 'ABOUT', href: '/#about' },
		{ label: 'EXPERIENCE', href: '/#experience' },
		{ label: 'SKILLS', href: '/#skills' },
		{ label: 'ACHIEVEMENTS', href: '/#achievements' },
		{ label: 'TOOLS', href: '/tools' },
		{ label: 'CONTACT', href: '/#contact' }
	];

	onMount(() => {
		const onScroll = () => { scrolled = window.scrollY > 50; };
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});

	function handleNavClick() {
		mobileOpen = false;
	}
</script>

<nav class:scrolled>
	<div class="nav-inner">
		<a href="/#hero" class="logo" onclick={handleNavClick}>
			<span class="logo-bracket">&lt;</span>RK<span class="logo-slash">/</span><span class="logo-bracket">&gt;</span>
		</a>

		<button class="hamburger" class:active={mobileOpen} onclick={() => mobileOpen = !mobileOpen} aria-label="Toggle menu">
			<span></span><span></span><span></span>
		</button>

		<ul class:open={mobileOpen}>
			{#each navLinks as link}
				<li><a href={link.href} onclick={handleNavClick}>{link.label}</a></li>
			{/each}
			<li><a href="/resume.pdf" target="_blank" class="resume-btn">RESUME</a></li>
		</ul>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		padding: 1.2rem 2rem;
		transition: all 0.3s ease;
		background: transparent;
	}

	nav.scrolled {
		background: rgba(10, 10, 15, 0.9);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--border-glow);
		padding: 0.8rem 2rem;
	}

	.nav-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--cyan);
		text-decoration: none;
		letter-spacing: 2px;
	}

	.logo:hover {
		text-shadow: 0 0 20px var(--cyan), 0 0 40px var(--cyan);
	}

	.logo-bracket { color: var(--magenta); }
	.logo-slash { color: var(--yellow); }

	ul {
		display: flex;
		list-style: none;
		gap: 2rem;
		align-items: center;
	}

	ul a {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		text-decoration: none;
		letter-spacing: 2px;
		padding: 0.5rem 0;
		position: relative;
		transition: all 0.3s ease;
	}

	ul a:hover {
		color: var(--cyan);
		text-shadow: 0 0 10px var(--cyan);
	}

	ul a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--cyan);
		box-shadow: 0 0 10px var(--cyan);
		transition: width 0.3s ease;
	}

	ul a:hover::after {
		width: 100%;
	}

	.resume-btn {
		border: 1px solid var(--cyan) !important;
		padding: 0.5rem 1.2rem !important;
		color: var(--cyan) !important;
		clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
	}

	.resume-btn:hover {
		background: rgba(0, 240, 255, 0.1) !important;
	}

	.resume-btn::after {
		display: none !important;
	}

	.hamburger {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 5px;
	}

	.hamburger span {
		display: block;
		width: 25px;
		height: 2px;
		background: var(--cyan);
		transition: all 0.3s ease;
	}

	.hamburger.active span:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}
	.hamburger.active span:nth-child(2) {
		opacity: 0;
	}
	.hamburger.active span:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}

	@media (max-width: 768px) {
		.hamburger {
			display: flex;
		}

		ul {
			position: fixed;
			top: 0;
			right: -100%;
			width: 70%;
			height: 100vh;
			background: rgba(10, 10, 15, 0.98);
			backdrop-filter: blur(20px);
			flex-direction: column;
			justify-content: center;
			gap: 2.5rem;
			transition: right 0.4s ease;
			border-left: 1px solid var(--border-glow);
		}

		ul.open {
			right: 0;
		}

		ul a {
			font-size: 1rem;
		}
	}
</style>
