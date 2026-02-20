<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import ScanLines from '$lib/components/ScanLines.svelte';

	let mounted = $state(false);
	onMount(() => { mounted = true; });

	const tools = [
		{
			name: 'Epoch Converter',
			description: 'Convert between Unix timestamps and human-readable dates. Supports seconds, milliseconds, batch conversion, timezones, and more.',
			href: '/tools/epoch-converter',
			icon: '⏱'
		},
		{
			name: 'JSON Formatter',
			description: 'Paste, validate, format, and explore JSON. Syntax highlighting, collapsible tree view, minify, and download.',
			href: '/tools/json-formatter',
			icon: '{ }'
		},
		{
			name: 'UUID Generator',
			description: 'Generate v4 UUIDs instantly. Bulk generation, uppercase/lowercase, with or without hyphens. Copy or download.',
			href: '/tools/uuid-generator',
			icon: '#'
		},
		{
			name: 'Color Converter',
			description: 'Convert between HEX, RGB, HSL, and Swift UIColor / SwiftUI Color. Live preview and palette generation.',
			href: '/tools/color-converter',
			icon: '🎨'
		},
		{
			name: 'Test Data Generator',
			description: 'Generate placeholder text, random names, emails, phone numbers, and addresses for app testing.',
			href: '/tools/test-data-generator',
			icon: '🧪'
		},
		{
			name: 'Wiki Explorer',
			description: 'Discover random Wikipedia articles by genre. Pick a topic and explore science, history, space, mythology, and more.',
			href: '/tools/wiki-explorer',
			icon: '📚'
		},
		{
			name: 'Virat Kohli',
			description: 'Explore about the greatest cricketer of this generation, Virat Kohli. Check out his biography, stats, records, and achievements.',
			href: '/tools/virat-kohli',
			icon: '📚'
		}
	];
</script>

<ScanLines />
<ParticleBackground />

<div class="page" class:mounted>
	<Navbar />

	<main>
		<div class="breadcrumb">
			<a href="/">HOME</a>
			<span class="sep">//</span>
			<span class="active">TOOLS</span>
		</div>

		<h1 class="title">
			<span class="br">&lt;</span>TOOLS<span class="br">/&gt;</span>
		</h1>
		<p class="subtitle">Developer utilities &mdash; built for speed</p>

		<div class="grid">
			{#each tools as t (t.name)}
				<a href={t.href} class="card">
					<span class="card-icon">{t.icon}</span>
					<h3>{t.name}</h3>
					<p>{t.description}</p>
					<span class="cta">LAUNCH →</span>
				</a>
			{/each}

			<div class="card placeholder">
				<span class="card-icon">🔧</span>
				<h3>More coming&hellip;</h3>
				<p>Additional tools are on the way. Stay tuned.</p>
			</div>
		</div>
	</main>

	<Footer />
</div>

<style>
	.page {
		position: relative; z-index: 1;
		min-height: 100vh; display: flex; flex-direction: column;
		opacity: 0; transition: opacity .6s ease;
	}
	.page.mounted { opacity: 1; }

	main {
		flex: 1; max-width: 1100px; width: 100%;
		margin: 0 auto; padding: 120px 2rem 4rem;
	}

	/* breadcrumb */
	.breadcrumb {
		font-family: var(--font-mono); font-size: .78rem;
		color: var(--text-muted); letter-spacing: 1px;
		display: flex; align-items: center; gap: .6rem;
		margin-bottom: 2.5rem;
	}
	.breadcrumb a { color: var(--cyan); }
	.sep { color: var(--magenta); }
	.active { color: var(--yellow); }

	/* header */
	.title {
		font-family: var(--font-display); font-size: 3rem; font-weight: 900;
		letter-spacing: 2px; margin: 0 0 .6rem;
		background: linear-gradient(135deg, var(--cyan), var(--magenta), var(--yellow));
		-webkit-background-clip: text; -webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.br { -webkit-text-fill-color: var(--green); }
	.subtitle {
		font-family: var(--font-mono); font-size: .9rem;
		color: var(--text-muted); letter-spacing: 1px; margin: 0 0 3rem;
	}

	/* grid */
	.grid {
		display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.card {
		display: flex; flex-direction: column; gap: .6rem;
		padding: 1.5rem; background: var(--dark-card);
		border: 1px solid rgba(0,240,255,.15);
		text-decoration: none; color: var(--text-primary);
		transition: all .3s ease;
	}
	.card:hover {
		border-color: var(--cyan);
		box-shadow: 0 0 24px rgba(0,240,255,.25), inset 0 0 16px rgba(0,240,255,.06);
		transform: translateY(-4px);
	}
	.card.placeholder {
		border-style: dashed; opacity: .5; pointer-events: none;
	}
	.card-icon { font-size: 2.4rem; }
	.card h3 {
		font-family: var(--font-display); font-size: 1.15rem;
		color: var(--cyan); letter-spacing: 1px;
	}
	.card:hover h3 { text-shadow: 0 0 12px var(--cyan); }
	.card p {
		font-size: .85rem; color: var(--text-muted); line-height: 1.5; margin: 0;
	}
	.cta {
		margin-top: auto; font-family: var(--font-mono);
		font-size: .75rem; color: var(--magenta); letter-spacing: 1px;
		transition: letter-spacing .3s ease, color .3s ease;
	}
	.card:hover .cta { color: var(--yellow); letter-spacing: 2px; }

	@media (max-width: 600px) {
		main { padding: 100px 1.2rem 3rem; }
		.title { font-size: 2rem; }
		.grid { grid-template-columns: 1fr; }
	}
</style>
