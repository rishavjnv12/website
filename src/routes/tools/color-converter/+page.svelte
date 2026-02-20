<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import ScanLines from '$lib/components/ScanLines.svelte';

	let mounted = $state(false);

	/* ── color state ───────────────────────────────── */
	let r = $state(0); let g = $state(240); let b = $state(255);  // cyan default
	let a = $state(1);
	let hexInput = $state('#00f0ff');
	let copiedKey = $state('');

	/* ── derived values ────────────────────────────── */
	let hsl = $derived(rgbToHsl(r, g, b));
	let hex = $derived(rgbToHex(r, g, b));
	let uiColor = $derived(`UIColor(red: ${(r/255).toFixed(3)}, green: ${(g/255).toFixed(3)}, blue: ${(b/255).toFixed(3)}, alpha: ${a.toFixed(2)})`);
	let swiftUI = $derived(`Color(red: ${(r/255).toFixed(3)}, green: ${(g/255).toFixed(3)}, blue: ${(b/255).toFixed(3)}, opacity: ${a.toFixed(2)})`);
	let swiftUIHex = $derived(`Color(hex: 0x${hex.slice(1).toUpperCase()})`);
	let rgbCSS = $derived(a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`);
	let hslCSS = $derived(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
	let cssVar = $derived(`--color: ${hex};`);
	let preview = $derived(`rgba(${r}, ${g}, ${b}, ${a})`);

	/* ── palette ───────────────────────────────────── */
	let palette = $derived(generatePalette(r, g, b));

	/* ── conversion helpers ────────────────────────── */
	function rgbToHex(r: number, g: number, b: number): string {
		return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
	}

	function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
		const clean = hex.replace('#', '');
		let full = clean;
		if (full.length === 3) full = full.split('').map(c => c + c).join('');
		if (full.length !== 6) return null;
		const n = parseInt(full, 16);
		if (isNaN(n)) return null;
		return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
	}

	function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
		const rn = r / 255, gn = g / 255, bn = b / 255;
		const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
		const l = (max + min) / 2;
		if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
		const d = max - min;
		const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		let h = 0;
		if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
		else if (max === gn) h = ((bn - rn) / d + 2) / 6;
		else h = ((rn - gn) / d + 4) / 6;
		return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
	}

	function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
		const sn = s / 100, ln = l / 100;
		if (sn === 0) { const v = Math.round(ln * 255); return { r: v, g: v, b: v }; }
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1; if (t > 1) t -= 1;
			if (t < 1/6) return p + (q - p) * 6 * t;
			if (t < 1/2) return q;
			if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		};
		const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
		const p = 2 * ln - q;
		const hn = h / 360;
		return {
			r: Math.round(hue2rgb(p, q, hn + 1/3) * 255),
			g: Math.round(hue2rgb(p, q, hn) * 255),
			b: Math.round(hue2rgb(p, q, hn - 1/3) * 255)
		};
	}

	function generatePalette(r: number, g: number, b: number) {
		const { h, s } = rgbToHsl(r, g, b);
		const shades = [10, 25, 40, 55, 70, 85].map(l => {
			const c = hslToRgb(h, s, l);
			return { hex: rgbToHex(c.r, c.g, c.b), l };
		});
		// Complementary + analogous
		const comp = hslToRgb((h + 180) % 360, s, 50);
		const ana1 = hslToRgb((h + 30) % 360, s, 50);
		const ana2 = hslToRgb((h + 330) % 360, s, 50);
		const harmony = [
			{ hex: rgbToHex(ana2.r, ana2.g, ana2.b), label: 'Analogous' },
			{ hex: rgbToHex(r, g, b), label: 'Base' },
			{ hex: rgbToHex(ana1.r, ana1.g, ana1.b), label: 'Analogous' },
			{ hex: rgbToHex(comp.r, comp.g, comp.b), label: 'Complement' }
		];
		return { shades, harmony };
	}

	/* ── input handlers ────────────────────────────── */
	function onHexInput() {
		const result = hexToRgb(hexInput);
		if (result) { r = result.r; g = result.g; b = result.b; }
	}

	function onRgbChange() {
		hexInput = rgbToHex(r, g, b);
	}

	function onHslInput(e: Event, channel: 'h' | 's' | 'l') {
		const val = parseInt((e.target as HTMLInputElement).value) || 0;
		const newH = channel === 'h' ? val : hsl.h;
		const newS = channel === 's' ? val : hsl.s;
		const newL = channel === 'l' ? val : hsl.l;
		const rgb = hslToRgb(newH, newS, newL);
		r = rgb.r; g = rgb.g; b = rgb.b;
		hexInput = rgbToHex(r, g, b);
	}

	function onPickerChange(e: Event) {
		const val = (e.target as HTMLInputElement).value;
		hexInput = val;
		onHexInput();
	}

	function copy(text: string, key: string) {
		navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => { if (copiedKey === key) copiedKey = ''; }, 1500);
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
			<span class="active">COLOR CONVERTER</span>
		</div>

		<h1 class="title">
			<span class="br">&lt;</span>COLOR CONVERTER<span class="br">/&gt;</span>
		</h1>
		<p class="subtitle">HEX &bull; RGB &bull; HSL &bull; UIColor &bull; SwiftUI Color</p>

		<!-- ═══ PREVIEW + PICKER ═══ -->
		<section class="panel preview-panel">
			<div class="preview-row">
				<div class="color-swatch" style="background: {preview}"></div>
				<div class="picker-area">
					<input type="color" value={hex} oninput={onPickerChange} class="color-picker" aria-label="Color picker" />
					<span class="picker-hint">Click to pick</span>
				</div>
			</div>
		</section>

		<div class="two-col">
			<!-- ═══ INPUT SECTION ═══ -->
			<section class="panel">
				<h2 class="panel-title">INPUT</h2>

				<div class="field">
					<label for="hexIn">HEX</label>
					<input id="hexIn" type="text" bind:value={hexInput} oninput={onHexInput}
						placeholder="#00f0ff" class="inp" />
				</div>

				<div class="rgb-row">
					<div class="field">
						<label for="rIn">R</label>
						<input id="rIn" type="number" bind:value={r} oninput={onRgbChange} min="0" max="255" class="inp sm" />
					</div>
					<div class="field">
						<label for="gIn">G</label>
						<input id="gIn" type="number" bind:value={g} oninput={onRgbChange} min="0" max="255" class="inp sm" />
					</div>
					<div class="field">
						<label for="bIn">B</label>
						<input id="bIn" type="number" bind:value={b} oninput={onRgbChange} min="0" max="255" class="inp sm" />
					</div>
					<div class="field">
						<label for="aIn">A</label>
						<input id="aIn" type="number" bind:value={a} min="0" max="1" step="0.1" class="inp sm" />
					</div>
				</div>

				<div class="rgb-row">
					<div class="field">
						<label for="hIn">H</label>
						<input id="hIn" type="number" value={hsl.h} oninput={(e) => onHslInput(e, 'h')} min="0" max="360" class="inp sm" />
					</div>
					<div class="field">
						<label for="sIn">S%</label>
						<input id="sIn" type="number" value={hsl.s} oninput={(e) => onHslInput(e, 's')} min="0" max="100" class="inp sm" />
					</div>
					<div class="field">
						<label for="lIn">L%</label>
						<input id="lIn" type="number" value={hsl.l} oninput={(e) => onHslInput(e, 'l')} min="0" max="100" class="inp sm" />
					</div>
				</div>
			</section>

			<!-- ═══ OUTPUT SECTION ═══ -->
			<section class="panel">
				<h2 class="panel-title">OUTPUT</h2>
				<div class="results">
					{#each [
						{ lbl: 'HEX', val: hex, key: 'hex' },
						{ lbl: 'RGB', val: rgbCSS, key: 'rgb' },
						{ lbl: 'HSL', val: hslCSS, key: 'hsl' },
						{ lbl: 'CSS VAR', val: cssVar, key: 'css' },
						{ lbl: 'UIColor', val: uiColor, key: 'uicolor' },
						{ lbl: 'SwiftUI', val: swiftUI, key: 'swiftui' },
						{ lbl: 'SwiftUI (hex)', val: swiftUIHex, key: 'swiftuihex' }
					] as item}
						<div class="res-row">
							<span class="lbl">{item.lbl}</span>
							<code class="val">{item.val}</code>
							<button class="cp" onclick={() => copy(item.val, item.key)}>
								{copiedKey === item.key ? '✓' : 'COPY'}
							</button>
						</div>
					{/each}
				</div>
			</section>
		</div>

		<!-- ═══ PALETTE ═══ -->
		<section class="panel">
			<h2 class="panel-title">SHADE PALETTE</h2>
			<div class="palette-row">
				{#each palette.shades as shade}
					<button class="palette-swatch" style="background: {shade.hex}"
						onclick={() => { hexInput = shade.hex; onHexInput(); }}
						aria-label="Select color {shade.hex}">
						<span class="swatch-label">{shade.hex}</span>
					</button>
				{/each}
			</div>

			<h2 class="panel-title" style="margin-top: 1.5rem;">COLOR HARMONY</h2>
			<div class="palette-row">
				{#each palette.harmony as h}
					<button class="palette-swatch" style="background: {h.hex}"
						onclick={() => { hexInput = h.hex; onHexInput(); }}
						aria-label="Select {h.label} color {h.hex}">
						<span class="swatch-label">{h.hex}</span>
						<span class="swatch-sub">{h.label}</span>
					</button>
				{/each}
			</div>
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

	.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

	/* preview */
	.preview-panel { border-color: var(--cyan); box-shadow: 0 0 20px rgba(0,240,255,.12); }
	.preview-row { display: flex; align-items: center; gap: 1.5rem; }
	.color-swatch { width: 120px; height: 80px; border: 2px solid rgba(255,255,255,.1); flex-shrink: 0; }
	.picker-area { display: flex; flex-direction: column; align-items: center; gap: .3rem; }
	.color-picker { width: 60px; height: 40px; border: none; background: none; cursor: pointer; }
	.picker-hint { font-family: var(--font-mono); font-size: .65rem; color: var(--text-muted); }

	/* fields */
	.field { display: flex; flex-direction: column; margin-bottom: .8rem; }
	.field label { font-family: var(--font-mono); font-size: .7rem; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: .35rem; }
	.inp { padding: .6rem .75rem; background: rgba(6,6,13,.8); border: 1px solid rgba(0,240,255,.18); color: var(--text-primary); font-family: var(--font-mono); font-size: .9rem; transition: all .25s ease; }
	.inp:focus { outline: none; border-color: var(--cyan); box-shadow: 0 0 12px rgba(0,240,255,.25); }
	.inp.sm { width: 80px; }
	.rgb-row { display: flex; gap: .6rem; flex-wrap: wrap; }

	/* results */
	.results { display: flex; flex-direction: column; gap: .6rem; }
	.res-row { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; }
	.lbl { font-family: var(--font-mono); font-size: .65rem; color: var(--text-muted); letter-spacing: 1px; min-width: 85px; flex-shrink: 0; }
	.val { flex: 1; font-family: var(--font-mono); font-size: .8rem; color: var(--green); word-break: break-all; background: none; min-width: 0; }
	.cp { padding: .25rem .6rem; background: transparent; border: 1px solid var(--yellow); color: var(--yellow); font-family: var(--font-mono); font-size: .65rem; letter-spacing: 1px; cursor: pointer; transition: all .25s ease; white-space: nowrap; flex-shrink: 0; }
	.cp:hover { background: rgba(249,240,2,.08); box-shadow: 0 0 10px rgba(249,240,2,.25); }

	/* palette */
	.palette-row { display: flex; gap: .5rem; flex-wrap: wrap; }
	.palette-swatch { width: 80px; height: 60px; border: 2px solid rgba(255,255,255,.08); cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: .3rem; transition: all .25s ease; }
	.palette-swatch:hover { border-color: rgba(255,255,255,.4); transform: scale(1.05); }
	.swatch-label { font-family: var(--font-mono); font-size: .55rem; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,.8); letter-spacing: .5px; }
	.swatch-sub { font-family: var(--font-mono); font-size: .5rem; color: rgba(255,255,255,.7); text-shadow: 0 1px 3px rgba(0,0,0,.8); }

	@media (max-width: 768px) {
		main { padding: 100px 1.2rem 3rem; }
		.title { font-size: 1.6rem; }
		.two-col { grid-template-columns: 1fr; }
		.preview-row { flex-direction: column; }
		.color-swatch { width: 100%; height: 60px; }
		.inp.sm { width: 65px; }
		.palette-swatch { width: 60px; height: 50px; }
	}
</style>
