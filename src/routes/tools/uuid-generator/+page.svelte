<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import ScanLines from '$lib/components/ScanLines.svelte';

	let mounted = $state(false);

	/* ── config ─────────────────────────────────────── */
	let count = $state(1);
	let uppercase = $state(false);
	let hyphens = $state(true);
	let braces = $state(false);
	let prefix = $state('');

	/* ── generated UUIDs ───────────────────────────── */
	let uuids = $state<string[]>([]);
	let copiedKey = $state('');

	/* ── UUID v4 generator ─────────────────────────── */
	function uuidv4(): string {
		// Use crypto API for randomness
		const bytes = new Uint8Array(16);
		crypto.getRandomValues(bytes);
		// Set version (4) and variant (RFC 4122)
		bytes[6] = (bytes[6] & 0x0f) | 0x40;
		bytes[8] = (bytes[8] & 0x3f) | 0x80;

		const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0'));
		let uuid = `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
		return uuid;
	}

	function formatUUID(raw: string): string {
		let result = raw;
		if (!hyphens) result = result.replace(/-/g, '');
		if (uppercase) result = result.toUpperCase();
		if (braces) result = `{${result}}`;
		if (prefix) result = `${prefix}${result}`;
		return result;
	}

	function generate() {
		const n = Math.min(Math.max(1, count), 500);
		uuids = Array.from({ length: n }, () => formatUUID(uuidv4()));
	}

	function copy(text: string, key: string) {
		navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => { if (copiedKey === key) copiedKey = ''; }, 1500);
	}

	function copyAll() {
		const text = uuids.join('\n');
		copy(text, 'all');
	}

	function download() {
		if (!uuids.length) return;
		const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url; a.download = 'uuids.txt'; a.click();
		URL.revokeObjectURL(url);
	}

	onMount(() => {
		mounted = true;
		generate();
	});
</script>

<ScanLines />
<ParticleBackground />

<div class="page" class:mounted>
	<Navbar />
	<main>
		<div class="breadcrumb">
			<a href="/">HOME</a><span class="sep">//</span>
			<a href="/tools">TOOLS</a><span class="sep">//</span>
			<span class="active">UUID GENERATOR</span>
		</div>

		<h1 class="title">
			<span class="br">&lt;</span>UUID GENERATOR<span class="br">/&gt;</span>
		</h1>
		<p class="subtitle">Generate RFC 4122 v4 UUIDs instantly</p>

		<!-- ═══ CONFIG ═══ -->
		<section class="panel">
			<h2 class="panel-title">OPTIONS</h2>
			<div class="options-grid">
				<div class="field">
					<label for="count">Count (1–500)</label>
					<input id="count" type="number" bind:value={count} min="1" max="500" class="inp" />
				</div>
				<div class="field">
					<label for="prefix">Prefix</label>
					<input id="prefix" type="text" bind:value={prefix} placeholder="e.g. id_" class="inp" />
				</div>
				<div class="toggle-row">
					<label class="toggle-label">
						<input type="checkbox" bind:checked={uppercase} />
						<span>UPPERCASE</span>
					</label>
					<label class="toggle-label">
						<input type="checkbox" bind:checked={hyphens} />
						<span>HYPHENS</span>
					</label>
					<label class="toggle-label">
						<input type="checkbox" bind:checked={braces} />
						<span>BRACES {'{}'}</span>
					</label>
				</div>
			</div>
			<div class="action-bar">
				<button class="btn" onclick={generate}>GENERATE</button>
				<button class="btn btn-alt" onclick={copyAll}>
					{copiedKey === 'all' ? '✓ COPIED ALL' : 'COPY ALL'}
				</button>
				<button class="btn btn-alt2" onclick={download}>DOWNLOAD</button>
			</div>
		</section>

		<!-- ═══ OUTPUT ═══ -->
		{#if uuids.length}
			<section class="panel">
				<div class="panel-bar">
					<h2 class="panel-title">GENERATED ({uuids.length})</h2>
				</div>
				<div class="uuid-list">
					{#each uuids as uuid, i}
						<div class="uuid-row">
							<span class="uuid-index">{i + 1}</span>
							<code class="uuid-val">{uuid}</code>
							<button class="cp" onclick={() => copy(uuid, `u-${i}`)}>
								{copiedKey === `u-${i}` ? '✓' : 'COPY'}
							</button>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- ═══ INFO ═══ -->
		<section class="panel info-panel">
			<h2 class="panel-title">ABOUT UUID V4</h2>
			<p>
				A UUID (Universally Unique Identifier) is a 128-bit identifier standardized by
				<strong>RFC 4122</strong>. Version 4 UUIDs are randomly generated, giving
				~5.3 &times; 10<sup>36</sup> possible values — making collisions practically impossible.
			</p>
			<p>
				<strong>Format:</strong> <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code><br/>
				The <code>4</code> indicates version 4. The <code>y</code> nibble is <code>8</code>,
				<code>9</code>, <code>a</code>, or <code>b</code> (variant bits).
			</p>
			<p>
				<strong>iOS usage:</strong> <code>UUID().uuidString</code> in Swift,
				<code>NSUUID</code> in Objective-C, or <code>CFUUID</code> in Core Foundation.
			</p>
		</section>
	</main>
	<Footer />
</div>

<style>
	.page { position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: column; opacity: 0; transition: opacity .6s ease; }
	.page.mounted { opacity: 1; }
	main { flex: 1; max-width: 1100px; width: 100%; margin: 0 auto; padding: 120px 2rem 4rem; }

	.breadcrumb { font-family: var(--font-mono); font-size: .78rem; color: var(--text-muted); letter-spacing: 1px; display: flex; align-items: center; gap: .6rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
	.breadcrumb a { color: var(--cyan); }
	.sep { color: var(--magenta); }
	.active { color: var(--yellow); }

	.title { font-family: var(--font-display); font-size: 2.4rem; font-weight: 900; letter-spacing: 2px; margin: 0 0 .5rem; background: linear-gradient(135deg, var(--cyan), var(--magenta)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
	.br { -webkit-text-fill-color: var(--green); }
	.subtitle { font-family: var(--font-mono); font-size: .82rem; color: var(--text-muted); letter-spacing: 1px; margin: 0 0 2.5rem; }

	.panel { background: var(--dark-card); border: 1px solid rgba(0,240,255,.12); padding: 1.5rem; margin-bottom: 1.5rem; transition: border-color .3s ease; }
	.panel:hover { border-color: rgba(0,240,255,.3); }
	.panel-title { font-family: var(--font-display); font-size: 1rem; color: var(--magenta); letter-spacing: 1.5px; margin: 0 0 1.2rem; padding-bottom: .6rem; border-bottom: 1px solid rgba(255,42,109,.2); }
	.panel-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }

	.options-grid { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; margin-bottom: 1.2rem; }
	.field { display: flex; flex-direction: column; }
	.field label { font-family: var(--font-mono); font-size: .7rem; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: .35rem; }
	.inp { padding: .6rem .75rem; background: rgba(6,6,13,.8); border: 1px solid rgba(0,240,255,.18); color: var(--text-primary); font-family: var(--font-mono); font-size: .9rem; transition: all .25s ease; width: 140px; }
	.inp:focus { outline: none; border-color: var(--cyan); box-shadow: 0 0 12px rgba(0,240,255,.25); }

	.toggle-row { display: flex; gap: 1.2rem; flex-wrap: wrap; align-items: center; }
	.toggle-label { display: flex; align-items: center; gap: .4rem; font-family: var(--font-mono); font-size: .75rem; color: var(--text-muted); letter-spacing: 1px; cursor: pointer; }
	.toggle-label input[type="checkbox"] { accent-color: var(--cyan); width: 16px; height: 16px; cursor: pointer; }

	.action-bar { display: flex; gap: .6rem; flex-wrap: wrap; }
	.btn { padding: .55rem 1.4rem; background: transparent; border: 1px solid var(--cyan); color: var(--cyan); font-family: var(--font-mono); font-size: .78rem; letter-spacing: 1px; cursor: pointer; transition: all .25s ease; }
	.btn:hover { background: rgba(0,240,255,.1); box-shadow: 0 0 14px rgba(0,240,255,.3); }
	.btn-alt { border-color: var(--yellow); color: var(--yellow); }
	.btn-alt:hover { background: rgba(249,240,2,.08); box-shadow: 0 0 14px rgba(249,240,2,.25); }
	.btn-alt2 { border-color: var(--green); color: var(--green); }
	.btn-alt2:hover { background: rgba(0,255,65,.08); box-shadow: 0 0 14px rgba(0,255,65,.25); }

	.uuid-list { max-height: 500px; overflow-y: auto; display: flex; flex-direction: column; gap: .3rem; }
	.uuid-row { display: flex; align-items: center; gap: .8rem; padding: .4rem .6rem; background: rgba(6,6,13,.5); border: 1px solid rgba(0,240,255,.06); transition: border-color .2s; }
	.uuid-row:hover { border-color: rgba(0,240,255,.2); }
	.uuid-index { font-family: var(--font-mono); font-size: .65rem; color: var(--text-muted); min-width: 30px; text-align: right; }
	.uuid-val { flex: 1; font-family: var(--font-mono); font-size: .85rem; color: var(--cyan); word-break: break-all; background: none; }

	.cp { padding: .25rem .6rem; background: transparent; border: 1px solid var(--yellow); color: var(--yellow); font-family: var(--font-mono); font-size: .65rem; letter-spacing: 1px; cursor: pointer; transition: all .25s ease; white-space: nowrap; flex-shrink: 0; }
	.cp:hover { background: rgba(249,240,2,.08); box-shadow: 0 0 10px rgba(249,240,2,.25); }

	.info-panel { border-color: rgba(249,240,2,.15); }
	.info-panel p { font-size: .88rem; color: var(--text-muted); line-height: 1.6; margin: .6rem 0; }
	.info-panel strong { color: var(--cyan); }
	.info-panel code { font-family: var(--font-mono); color: var(--green); font-size: .82rem; }

	@media (max-width: 768px) {
		main { padding: 100px 1.2rem 3rem; }
		.title { font-size: 1.6rem; }
		.options-grid { flex-direction: column; }
		.inp { width: 100%; }
	}
</style>
