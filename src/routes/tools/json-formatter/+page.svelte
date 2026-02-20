<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import ScanLines from '$lib/components/ScanLines.svelte';

	let mounted = $state(false);

	/* ── state ──────────────────────────────────────── */
	let rawInput = $state('');
	let indentSize = $state(2);
	let errorMsg = $state('');
	let parsed = $state<unknown>(undefined);
	let formattedOutput = $state('');
	let viewMode = $state<'formatted' | 'tree'>('formatted');
	let copiedKey = $state('');
	let stats = $state<{ keys: number; depth: number; size: string } | null>(null);

	/* ── collapsed nodes for tree view ─────────────── */
	let collapsed = $state<Set<string>>(new Set());

	/* ── core parse ─────────────────────────────────── */
	function parseJSON() {
		errorMsg = '';
		parsed = undefined;
		formattedOutput = '';
		stats = null;
		collapsed = new Set();

		const trimmed = rawInput.trim();
		if (!trimmed) return;

		try {
			const obj = JSON.parse(trimmed);
			parsed = obj;
			formattedOutput = JSON.stringify(obj, null, indentSize);
			stats = computeStats(obj, trimmed);
		} catch (e: unknown) {
			if (e instanceof Error) {
				errorMsg = e.message;
			}
		}
	}

	function formatJSON() {
		parseJSON();
	}

	function minifyJSON() {
		errorMsg = '';
		const trimmed = rawInput.trim();
		if (!trimmed) return;
		try {
			const obj = JSON.parse(trimmed);
			formattedOutput = JSON.stringify(obj);
			parsed = obj;
			stats = computeStats(obj, trimmed);
		} catch (e: unknown) {
			if (e instanceof Error) errorMsg = e.message;
		}
	}

	function clearAll() {
		rawInput = '';
		formattedOutput = '';
		errorMsg = '';
		parsed = undefined;
		stats = null;
		collapsed = new Set();
	}

	function loadSample() {
		rawInput = JSON.stringify({
			name: "Rishav Kumar",
			role: "iOS Developer",
			skills: ["Swift", "SwiftUI", "Objective-C", "Kotlin"],
			experience: {
				company: "CyberCorp",
				years: 5,
				projects: [
					{ name: "NeuralApp", status: "shipped", rating: 4.8 },
					{ name: "QuantumSDK", status: "active", rating: null }
				]
			},
			active: true,
			metadata: { version: "2.0", timestamp: 1704067200 }
		}, null, 2);
		parseJSON();
	}

	/* ── stats ──────────────────────────────────────── */
	function computeStats(obj: unknown, raw: string): { keys: number; depth: number; size: string } {
		let keys = 0;
		let maxDepth = 0;

		function walk(val: unknown, depth: number) {
			if (depth > maxDepth) maxDepth = depth;
			if (val && typeof val === 'object') {
				if (Array.isArray(val)) {
					val.forEach(v => walk(v, depth + 1));
				} else {
					const entries = Object.entries(val as Record<string, unknown>);
					keys += entries.length;
					entries.forEach(([, v]) => walk(v, depth + 1));
				}
			}
		}
		walk(obj, 0);

		const bytes = new Blob([raw]).size;
		const size = bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
		return { keys, depth: maxDepth, size };
	}

	/* ── clipboard / download ──────────────────────── */
	function copy(text: string, key: string) {
		navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => { if (copiedKey === key) copiedKey = ''; }, 1500);
	}

	function download() {
		if (!formattedOutput) return;
		const blob = new Blob([formattedOutput], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'formatted.json';
		a.click();
		URL.revokeObjectURL(url);
	}

	/* ── syntax highlight ──────────────────────────── */
	function syntaxHighlight(json: string): string {
		return json.replace(
			/("(?:\\.|[^"\\])*")\s*:/g,
			'<span class="hl-key">$1</span>:'
		).replace(
			/:\s*("(?:\\.|[^"\\])*")/g,
			': <span class="hl-string">$1</span>'
		).replace(
			/:\s*(\d+\.?\d*)/g,
			': <span class="hl-number">$1</span>'
		).replace(
			/:\s*(true|false)/g,
			': <span class="hl-bool">$1</span>'
		).replace(
			/:\s*(null)/g,
			': <span class="hl-null">$1</span>'
		);
	}

	/* ── tree view helpers ─────────────────────────── */
	function toggleCollapse(path: string) {
		const next = new Set(collapsed);
		if (next.has(path)) next.delete(path);
		else next.add(path);
		collapsed = next;
	}

	function collapseAll(obj: unknown, path: string = '$') {
		const paths = new Set<string>();
		function walk(val: unknown, p: string) {
			if (val && typeof val === 'object') {
				paths.add(p);
				if (Array.isArray(val)) {
					val.forEach((v, i) => walk(v, `${p}[${i}]`));
				} else {
					Object.entries(val as Record<string, unknown>).forEach(([k, v]) => walk(v, `${p}.${k}`));
				}
			}
		}
		walk(obj, path);
		return paths;
	}

	function doCollapseAll() {
		if (parsed !== undefined) collapsed = collapseAll(parsed);
	}

	function doExpandAll() {
		collapsed = new Set();
	}

	onMount(() => { mounted = true; });
</script>

<ScanLines />
<ParticleBackground />

<div class="page" class:mounted>
	<Navbar />

	<main>
		<div class="breadcrumb">
			<a href="/">HOME</a><span class="sep">//</span>
			<a href="/tools">TOOLS</a><span class="sep">//</span>
			<span class="active">JSON FORMATTER</span>
		</div>

		<h1 class="title">
			<span class="br">&lt;</span>JSON FORMATTER<span class="br">/&gt;</span>
		</h1>
		<p class="subtitle">Validate &bull; format &bull; explore &bull; minify</p>

		<!-- ═══ INPUT ═══ -->
		<section class="panel">
			<div class="panel-bar">
				<h2 class="panel-title">INPUT</h2>
				<div class="bar-actions">
					<button class="btn-sm" onclick={loadSample}>SAMPLE</button>
					<button class="btn-sm" onclick={clearAll}>CLEAR</button>
				</div>
			</div>
			<textarea
				bind:value={rawInput}
				class="json-input"
				rows="12"
				placeholder='Paste your JSON here...'
				spellcheck="false"
			></textarea>

			{#if errorMsg}
				<div class="error-box">
					<span class="error-icon">✕</span> {errorMsg}
				</div>
			{/if}

			<div class="action-bar">
				<div class="action-group">
					<button class="btn" onclick={formatJSON}>FORMAT</button>
					<button class="btn btn-alt" onclick={minifyJSON}>MINIFY</button>
				</div>
				<div class="indent-control">
					<label for="indent">INDENT</label>
					<select id="indent" bind:value={indentSize} onchange={parseJSON} class="sel-sm">
						<option value={2}>2 spaces</option>
						<option value={4}>4 spaces</option>
						<option value={1}>1 tab</option>
					</select>
				</div>
			</div>
		</section>

		<!-- ═══ STATS ═══ -->
		{#if stats}
			<div class="stats-row">
				<div class="stat"><span class="stat-lbl">KEYS</span><span class="stat-val">{stats.keys}</span></div>
				<div class="stat"><span class="stat-lbl">DEPTH</span><span class="stat-val">{stats.depth}</span></div>
				<div class="stat"><span class="stat-lbl">SIZE</span><span class="stat-val">{stats.size}</span></div>
				<div class="stat">
					<span class="stat-lbl">STATUS</span>
					<span class="stat-val valid">VALID ✓</span>
				</div>
			</div>
		{/if}

		<!-- ═══ OUTPUT ═══ -->
		{#if formattedOutput}
			<section class="panel">
				<div class="panel-bar">
					<h2 class="panel-title">OUTPUT</h2>
					<div class="bar-actions">
						<button class="tab" class:active={viewMode === 'formatted'} onclick={() => viewMode = 'formatted'}>CODE</button>
						<button class="tab" class:active={viewMode === 'tree'} onclick={() => viewMode = 'tree'}>TREE</button>
						<span class="divider">|</span>
						<button class="btn-sm" onclick={() => copy(formattedOutput, 'output')}>
							{copiedKey === 'output' ? '✓ COPIED' : 'COPY'}
						</button>
						<button class="btn-sm" onclick={download}>DOWNLOAD</button>
					</div>
				</div>

				{#if viewMode === 'formatted'}
					<div class="code-output">
						<pre><code>{@html syntaxHighlight(formattedOutput)}</code></pre>
					</div>
				{:else}
					<div class="tree-controls">
						<button class="btn-sm" onclick={doExpandAll}>EXPAND ALL</button>
						<button class="btn-sm" onclick={doCollapseAll}>COLLAPSE ALL</button>
					</div>
					<div class="tree-output">
						{@render treeNode(parsed, '$', 0)}
					</div>
				{/if}
			</section>
		{/if}
	</main>

	<Footer />
</div>

<!-- ═══ TREE RENDERING ═══ -->
{#snippet treeNode(value: unknown, path: string, depth: number)}
	{#if value === null}
		<span class="t-null">null</span>
	{:else if typeof value === 'boolean'}
		<span class="t-bool">{String(value)}</span>
	{:else if typeof value === 'number'}
		<span class="t-num">{value}</span>
	{:else if typeof value === 'string'}
		<span class="t-str">"{value}"</span>
	{:else if Array.isArray(value)}
		{@const isCollapsed = collapsed.has(path)}
		<span class="t-bracket">
			<button class="t-toggle" onclick={() => toggleCollapse(path)}>
				{isCollapsed ? '▶' : '▼'}
			</button>
			[
			{#if isCollapsed}
				<button class="t-collapsed" onclick={() => toggleCollapse(path)}>
					{value.length} items
				</button>
			{:else}
				<div class="t-children">
					{#each value as item, i}
						<div class="t-entry">
							<span class="t-index">{i}</span>:
							{@render treeNode(item, `${path}[${i}]`, depth + 1)}
							{#if i < value.length - 1}<span class="t-comma">,</span>{/if}
						</div>
					{/each}
				</div>
			{/if}
			]
		</span>
	{:else if typeof value === 'object'}
		{@const entries = Object.entries(value as Record<string, unknown>)}
		{@const isCollapsed = collapsed.has(path)}
		<span class="t-bracket">
			<button class="t-toggle" onclick={() => toggleCollapse(path)}>
				{isCollapsed ? '▶' : '▼'}
			</button>
			&#123;
			{#if isCollapsed}
				<button class="t-collapsed" onclick={() => toggleCollapse(path)}>
					{entries.length} keys
				</button>
			{:else}
				<div class="t-children">
					{#each entries as [key, val], i}
						<div class="t-entry">
							<span class="t-key">"{key}"</span>:
							{@render treeNode(val, `${path}.${key}`, depth + 1)}
							{#if i < entries.length - 1}<span class="t-comma">,</span>{/if}
						</div>
					{/each}
				</div>
			{/if}
			&#125;
		</span>
	{/if}
{/snippet}

<style>
	/* ── page ───────────────────────────────────────── */
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

	/* ── breadcrumb ─────────────────────────────────── */
	.breadcrumb {
		font-family: var(--font-mono); font-size: .78rem;
		color: var(--text-muted); letter-spacing: 1px;
		display: flex; align-items: center; gap: .6rem;
		margin-bottom: 2.5rem; flex-wrap: wrap;
	}
	.breadcrumb a { color: var(--cyan); }
	.sep { color: var(--magenta); }
	.active { color: var(--yellow); }

	/* ── title ──────────────────────────────────────── */
	.title {
		font-family: var(--font-display); font-size: 2.4rem; font-weight: 900;
		letter-spacing: 2px; margin: 0 0 .5rem;
		background: linear-gradient(135deg, var(--cyan), var(--magenta));
		-webkit-background-clip: text; -webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.br { -webkit-text-fill-color: var(--green); }
	.subtitle {
		font-family: var(--font-mono); font-size: .82rem;
		color: var(--text-muted); letter-spacing: 1px; margin: 0 0 2.5rem;
	}

	/* ── panels ─────────────────────────────────────── */
	.panel {
		background: var(--dark-card);
		border: 1px solid rgba(0,240,255,.12);
		padding: 1.5rem; margin-bottom: 1.5rem;
		transition: border-color .3s ease;
	}
	.panel:hover { border-color: rgba(0,240,255,.3); }

	.panel-bar {
		display: flex; align-items: center; justify-content: space-between;
		margin-bottom: 1rem; flex-wrap: wrap; gap: .5rem;
	}
	.panel-title {
		font-family: var(--font-display); font-size: 1rem;
		color: var(--magenta); letter-spacing: 1.5px; margin: 0;
	}
	.bar-actions { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; }

	/* ── input textarea ────────────────────────────── */
	.json-input {
		width: 100%; padding: .8rem;
		background: rgba(6,6,13,.8); border: 1px solid rgba(0,240,255,.18);
		color: var(--text-primary); font-family: var(--font-mono); font-size: .82rem;
		line-height: 1.5; resize: vertical; tab-size: 2;
		transition: border-color .25s ease;
	}
	.json-input:focus {
		outline: none; border-color: var(--cyan);
		box-shadow: 0 0 12px rgba(0,240,255,.25);
	}

	/* ── error ──────────────────────────────────────── */
	.error-box {
		margin-top: .8rem; padding: .7rem 1rem;
		background: rgba(255,42,109,.08); border: 1px solid rgba(255,42,109,.3);
		color: var(--magenta); font-family: var(--font-mono); font-size: .8rem;
		letter-spacing: .5px;
	}
	.error-icon { font-weight: bold; margin-right: .3rem; }

	/* ── action bar ────────────────────────────────── */
	.action-bar {
		margin-top: 1rem; display: flex; align-items: center;
		justify-content: space-between; flex-wrap: wrap; gap: .8rem;
	}
	.action-group { display: flex; gap: .6rem; }

	.indent-control {
		display: flex; align-items: center; gap: .5rem;
		font-family: var(--font-mono); font-size: .7rem;
		color: var(--text-muted); letter-spacing: 1px;
	}

	/* ── buttons ────────────────────────────────────── */
	.btn {
		padding: .55rem 1.4rem; background: transparent;
		border: 1px solid var(--cyan); color: var(--cyan);
		font-family: var(--font-mono); font-size: .78rem; letter-spacing: 1px;
		cursor: pointer; transition: all .25s ease;
	}
	.btn:hover {
		background: rgba(0,240,255,.1);
		box-shadow: 0 0 14px rgba(0,240,255,.3);
	}
	.btn-alt { border-color: var(--yellow); color: var(--yellow); }
	.btn-alt:hover {
		background: rgba(249,240,2,.08);
		box-shadow: 0 0 14px rgba(249,240,2,.25);
	}

	.btn-sm {
		padding: .3rem .7rem; background: transparent;
		border: 1px solid rgba(0,240,255,.3); color: var(--text-muted);
		font-family: var(--font-mono); font-size: .65rem; letter-spacing: 1px;
		cursor: pointer; transition: all .25s ease;
	}
	.btn-sm:hover { border-color: var(--cyan); color: var(--cyan); }

	.sel-sm {
		padding: .3rem .5rem; background: rgba(6,6,13,.8);
		border: 1px solid rgba(0,240,255,.18); color: var(--text-primary);
		font-family: var(--font-mono); font-size: .75rem; cursor: pointer;
	}
	.sel-sm option { background: var(--dark-bg); }

	/* ── tabs ───────────────────────────────────────── */
	.tab {
		padding: .3rem .7rem; background: transparent;
		border: 1px solid rgba(0,240,255,.15); color: var(--text-muted);
		font-family: var(--font-mono); font-size: .65rem; letter-spacing: 1px;
		cursor: pointer; transition: all .25s ease;
	}
	.tab.active { border-color: var(--cyan); color: var(--cyan); background: rgba(0,240,255,.08); }
	.tab:hover { border-color: var(--cyan); color: var(--cyan); }
	.divider { color: rgba(0,240,255,.2); font-size: .8rem; }

	/* ── stats ──────────────────────────────────────── */
	.stats-row {
		display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;
	}
	.stat {
		flex: 1; min-width: 100px;
		padding: .8rem 1rem; background: var(--dark-card);
		border: 1px solid rgba(0,240,255,.12);
		display: flex; flex-direction: column; gap: .3rem;
	}
	.stat-lbl {
		font-family: var(--font-mono); font-size: .6rem;
		color: var(--text-muted); letter-spacing: 1px;
	}
	.stat-val {
		font-family: var(--font-mono); font-size: 1rem;
		color: var(--cyan); font-weight: 600;
	}
	.stat-val.valid { color: var(--green); }

	/* ── formatted code output ─────────────────────── */
	.code-output {
		max-height: 600px; overflow: auto;
		background: rgba(6,6,13,.8); border: 1px solid rgba(0,240,255,.1);
		padding: 1rem;
	}
	.code-output pre {
		margin: 0; font-family: var(--font-mono); font-size: .8rem;
		line-height: 1.6; white-space: pre-wrap; word-break: break-all;
	}

	/* syntax highlight colors */
	:global(.hl-key) { color: var(--cyan); }
	:global(.hl-string) { color: var(--green); }
	:global(.hl-number) { color: var(--yellow); }
	:global(.hl-bool) { color: var(--magenta); }
	:global(.hl-null) { color: var(--text-muted); font-style: italic; }

	/* ── tree view ─────────────────────────────────── */
	.tree-controls {
		display: flex; gap: .5rem; margin-bottom: .8rem;
	}
	.tree-output {
		max-height: 600px; overflow: auto;
		background: rgba(6,6,13,.8); border: 1px solid rgba(0,240,255,.1);
		padding: 1rem; font-family: var(--font-mono); font-size: .8rem;
		line-height: 1.7;
	}

	/* tree node styles */
	:global(.t-key) { color: var(--cyan); }
	:global(.t-str) { color: var(--green); }
	:global(.t-num) { color: var(--yellow); }
	:global(.t-bool) { color: var(--magenta); }
	:global(.t-null) { color: var(--text-muted); font-style: italic; }
	:global(.t-index) { color: var(--text-muted); font-size: .75rem; }
	:global(.t-comma) { color: var(--text-muted); }
	:global(.t-bracket) { color: var(--text-muted); }

	:global(.t-toggle) {
		background: none; border: none; color: var(--yellow);
		cursor: pointer; font-size: .65rem; padding: 0 .3rem 0 0;
		font-family: var(--font-mono); transition: color .2s;
	}
	:global(.t-toggle:hover) { color: var(--cyan); }

	:global(.t-collapsed) {
		color: var(--text-muted); font-size: .75rem; font-style: italic;
		cursor: pointer; padding: 0 .3rem;
	}
	:global(.t-collapsed:hover) { color: var(--cyan); }

	:global(.t-children) {
		padding-left: 1.2rem;
		border-left: 1px solid rgba(0,240,255,.08);
	}

	:global(.t-entry) {
		padding: .05rem 0;
	}

	/* ── responsive ─────────────────────────────────── */
	@media (max-width: 768px) {
		main { padding: 100px 1.2rem 3rem; }
		.title { font-size: 1.6rem; }
		.stats-row { flex-direction: column; }
		.panel-bar { flex-direction: column; align-items: flex-start; }
	}
</style>
