<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import ScanLines from '$lib/components/ScanLines.svelte';

	let mounted = $state(false);

	/* ── live clock ─────────────────────────────────── */
	let now = $state(Date.now());
	let localTz = $state(Intl.DateTimeFormat().resolvedOptions().timeZone);

	/* ── timestamp → date ──────────────────────────── */
	let tsInput = $state('');
	let tsUnit = $state<'s' | 'ms'>('s');
	let tsResult = $state<null | { utc: string; local: string; iso: string; relative: string }>(null);

	/* ── date → timestamp ──────────────────────────── */
	let dtDate = $state('');
	let dtTime = $state('00:00:00');
	let dtTz = $state('UTC');
	let dtResult = $state<null | { seconds: number; milliseconds: number }>(null);

	/* ── batch converter ───────────────────────────── */
	let batchInput = $state('');
	let batchResults = $state<{ ts: string; utc: string; local: string }[]>([]);

	/* ── duration converter ────────────────────────── */
	let durInput = $state('');
	let durResult = $state('');

	/* ── epoch ranges ──────────────────────────────── */
	let rangeYear = $state(new Date().getFullYear());
	let rangeMonth = $state(new Date().getMonth() + 1);
	let rangeDay = $state(new Date().getDate());
	let rangeResults = $state<{ label: string; start: number; end: number }[]>([]);

	/* ── copied feedback ───────────────────────────── */
	let copiedKey = $state('');

	/* ── timezones ─────────────────────────────────── */
	const timezones = [
		'UTC',
		'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
		'America/Toronto', 'America/Sao_Paulo',
		'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow',
		'Asia/Dubai', 'Asia/Kolkata', 'Asia/Bangkok', 'Asia/Singapore',
		'Asia/Hong_Kong', 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Seoul',
		'Australia/Sydney', 'Australia/Melbourne',
		'Pacific/Auckland', 'Pacific/Honolulu'
	];

	/* ── helpers ────────────────────────────────────── */
	function fmtDate(ms: number, tz: string): string {
		return new Intl.DateTimeFormat('en-US', {
			timeZone: tz, year: 'numeric', month: 'short', day: '2-digit',
			hour: '2-digit', minute: '2-digit', second: '2-digit',
			hour12: false, timeZoneName: 'short'
		}).format(new Date(ms));
	}

	function fmtISO(ms: number): string {
		return new Date(ms).toISOString();
	}

	function relativeTime(ms: number): string {
		const diff = Date.now() - ms;
		const abs = Math.abs(diff);
		const future = diff < 0;
		const s = Math.floor(abs / 1000);
		const m = Math.floor(s / 60);
		const h = Math.floor(m / 60);
		const d = Math.floor(h / 24);
		const mo = Math.floor(d / 30.44);
		const y = Math.floor(d / 365.25);

		let label: string;
		if (y > 0) label = `${y} year${y > 1 ? 's' : ''}`;
		else if (mo > 0) label = `${mo} month${mo > 1 ? 's' : ''}`;
		else if (d > 0) label = `${d} day${d > 1 ? 's' : ''}`;
		else if (h > 0) label = `${h} hour${h > 1 ? 's' : ''}`;
		else if (m > 0) label = `${m} minute${m > 1 ? 's' : ''}`;
		else label = `${s} second${s !== 1 ? 's' : ''}`;

		return future ? `in ${label}` : `${label} ago`;
	}

	function copy(text: string, key: string) {
		navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => { if (copiedKey === key) copiedKey = ''; }, 1500);
	}

	/* ── converters ────────────────────────────────── */
	function convertTs() {
		const raw = tsInput.trim();
		if (!raw) { tsResult = null; return; }
		const n = Number(raw);
		if (isNaN(n)) { tsResult = null; return; }

		let ms: number;
		if (tsUnit === 'ms') ms = n;
		else if (Math.abs(n) > 1e15) ms = n / 1000;          // nanoseconds
		else if (Math.abs(n) > 1e12) ms = n;                  // already ms
		else ms = n * 1000;

		tsResult = {
			utc: fmtDate(ms, 'UTC'),
			local: fmtDate(ms, localTz),
			iso: fmtISO(ms),
			relative: relativeTime(ms)
		};
	}

	function convertDt() {
		if (!dtDate) { dtResult = null; return; }
		const parts = dtTime.split(':');
		const h = parseInt(parts[0] || '0');
		const m = parseInt(parts[1] || '0');
		const s = parseInt(parts[2] || '0');

		// Build date string in the selected timezone
		const [year, month, day] = dtDate.split('-').map(Number);

		// Create date in UTC then adjust for timezone offset
		const utcDate = new Date(Date.UTC(year, month - 1, day, h, m, s));

		if (dtTz !== 'UTC') {
			// Find the offset by comparing the formatted time in the target TZ
			const formatter = new Intl.DateTimeFormat('en-US', {
				timeZone: dtTz,
				year: 'numeric', month: '2-digit', day: '2-digit',
				hour: '2-digit', minute: '2-digit', second: '2-digit',
				hour12: false
			});
			const refParts = formatter.formatToParts(utcDate);
			const getP = (t: string) => parseInt(refParts.find(p => p.type === t)?.value || '0');
			const tzRendered = new Date(getP('year'), getP('month') - 1, getP('day'), getP('hour'), getP('minute'), getP('second'));
			const offsetMs = utcDate.getTime() - tzRendered.getTime();
			const adjusted = new Date(utcDate.getTime() + offsetMs);

			const sec = Math.floor(adjusted.getTime() / 1000);
			dtResult = { seconds: sec, milliseconds: adjusted.getTime() };
		} else {
			const sec = Math.floor(utcDate.getTime() / 1000);
			dtResult = { seconds: sec, milliseconds: utcDate.getTime() };
		}
	}

	function convertBatch() {
		const lines = batchInput.split(/[\n,]+/).map(l => l.trim()).filter(Boolean);
		batchResults = lines.map(raw => {
			const n = Number(raw);
			if (isNaN(n)) return { ts: raw, utc: 'Invalid', local: 'Invalid' };
			const ms = Math.abs(n) > 1e12 ? n : n * 1000;
			return { ts: raw, utc: fmtDate(ms, 'UTC'), local: fmtDate(ms, localTz) };
		});
	}

	function convertDuration() {
		const s = Math.abs(parseInt(durInput));
		if (isNaN(s)) { durResult = ''; return; }
		const d = Math.floor(s / 86400);
		const h = Math.floor((s % 86400) / 3600);
		const m = Math.floor((s % 3600) / 60);
		const sec = s % 60;
		const parts: string[] = [];
		if (d) parts.push(`${d} day${d > 1 ? 's' : ''}`);
		if (h) parts.push(`${h} hour${h > 1 ? 's' : ''}`);
		if (m) parts.push(`${m} minute${m > 1 ? 's' : ''}`);
		if (sec || !parts.length) parts.push(`${sec} second${sec !== 1 ? 's' : ''}`);
		durResult = parts.join(', ');
	}

	function calcRanges() {
		const yStart = new Date(Date.UTC(rangeYear, 0, 1));
		const yEnd   = new Date(Date.UTC(rangeYear + 1, 0, 1));
		const mStart = new Date(Date.UTC(rangeYear, rangeMonth - 1, 1));
		const mEnd   = new Date(Date.UTC(rangeYear, rangeMonth, 1));
		const dStart = new Date(Date.UTC(rangeYear, rangeMonth - 1, rangeDay));
		const dEnd   = new Date(Date.UTC(rangeYear, rangeMonth - 1, rangeDay + 1));

		rangeResults = [
			{ label: `Year ${rangeYear}`, start: Math.floor(yStart.getTime() / 1000), end: Math.floor(yEnd.getTime() / 1000) - 1 },
			{ label: `Month ${rangeMonth}/${rangeYear}`, start: Math.floor(mStart.getTime() / 1000), end: Math.floor(mEnd.getTime() / 1000) - 1 },
			{ label: `Day ${rangeDay}/${rangeMonth}/${rangeYear}`, start: Math.floor(dStart.getTime() / 1000), end: Math.floor(dEnd.getTime() / 1000) - 1 }
		];
	}

	/* ── reference table ───────────────────────────── */
	const refTable = [
		{ unit: '1 minute',  secs: 60 },
		{ unit: '1 hour',    secs: 3_600 },
		{ unit: '1 day',     secs: 86_400 },
		{ unit: '1 week',    secs: 604_800 },
		{ unit: '1 month',   secs: 2_629_746 },
		{ unit: '1 year',    secs: 31_556_952 }
	];

	onMount(() => {
		mounted = true;
		const iv = setInterval(() => { now = Date.now(); }, 1000);
		return () => clearInterval(iv);
	});
</script>

<ScanLines />
<ParticleBackground />

<div class="page" class:mounted>
	<Navbar />

	<main>
		<!-- breadcrumb -->
		<div class="breadcrumb">
			<a href="/">HOME</a><span class="sep">//</span>
			<a href="/tools">TOOLS</a><span class="sep">//</span>
			<span class="active">EPOCH CONVERTER</span>
		</div>

		<h1 class="title">
			<span class="br">&lt;</span>EPOCH CONVERTER<span class="br">/&gt;</span>
		</h1>
		<p class="subtitle">Convert Unix timestamps ↔ human dates &bull; timezones &bull; batch &bull; durations</p>

		<!-- ═══ LIVE CLOCK ═══ -->
		<section class="panel live-panel">
			<div class="live-row">
				<div class="live-cell">
					<span class="lbl">UNIX NOW</span>
					<span class="val mono">{Math.floor(now / 1000)}</span>
					<button class="cp" onclick={() => copy(String(Math.floor(now / 1000)), 'live-unix')}>
						{copiedKey === 'live-unix' ? '✓ COPIED' : 'COPY'}
					</button>
				</div>
				<div class="live-cell">
					<span class="lbl">UTC</span>
					<span class="val mono">{fmtDate(now, 'UTC')}</span>
				</div>
				<div class="live-cell">
					<span class="lbl">LOCAL ({localTz})</span>
					<span class="val mono">{fmtDate(now, localTz)}</span>
				</div>
			</div>
		</section>

		<div class="two-col">
			<!-- ═══ TIMESTAMP → DATE ═══ -->
			<section class="panel">
				<h2 class="panel-title">TIMESTAMP → DATE</h2>

				<div class="field">
					<label for="tsInput">Unix Timestamp</label>
					<div class="input-row">
						<input id="tsInput" type="text" inputmode="numeric" bind:value={tsInput}
							oninput={convertTs} placeholder="e.g. 1704067200" class="inp" />
						<select bind:value={tsUnit} onchange={convertTs} class="sel narrow" aria-label="Timestamp unit">
							<option value="s">sec</option>
							<option value="ms">ms</option>
						</select>
					</div>
				</div>

				{#if tsResult}
					<div class="results">
						<div class="res-row">
							<span class="lbl">UTC</span>
							<span class="val">{tsResult.utc}</span>
							<button class="cp" onclick={() => copy(tsResult!.utc, 'ts-utc')}>
								{copiedKey === 'ts-utc' ? '✓' : 'COPY'}
							</button>
						</div>
						<div class="res-row">
							<span class="lbl">LOCAL</span>
							<span class="val">{tsResult.local}</span>
							<button class="cp" onclick={() => copy(tsResult!.local, 'ts-local')}>
								{copiedKey === 'ts-local' ? '✓' : 'COPY'}
							</button>
						</div>
						<div class="res-row">
							<span class="lbl">ISO 8601</span>
							<span class="val">{tsResult.iso}</span>
							<button class="cp" onclick={() => copy(tsResult!.iso, 'ts-iso')}>
								{copiedKey === 'ts-iso' ? '✓' : 'COPY'}
							</button>
						</div>
						<div class="res-row">
							<span class="lbl">RELATIVE</span>
							<span class="val accent">{tsResult.relative}</span>
						</div>
					</div>
				{/if}
			</section>

			<!-- ═══ DATE → TIMESTAMP ═══ -->
			<section class="panel">
				<h2 class="panel-title">DATE → TIMESTAMP</h2>

				<div class="field">
					<label for="dtDate">Date</label>
					<input id="dtDate" type="date" bind:value={dtDate} oninput={convertDt} class="inp" />
				</div>
				<div class="field">
					<label for="dtTime">Time (HH:MM:SS)</label>
					<input id="dtTime" type="text" bind:value={dtTime} oninput={convertDt}
						placeholder="00:00:00" class="inp" />
				</div>
				<div class="field">
					<label for="dtTz">Timezone</label>
					<select id="dtTz" bind:value={dtTz} onchange={convertDt} class="sel">
						{#each timezones as tz}
							<option value={tz}>{tz}</option>
						{/each}
					</select>
				</div>

				{#if dtResult}
					<div class="results">
						<div class="res-row">
							<span class="lbl">SECONDS</span>
							<span class="val">{dtResult.seconds}</span>
							<button class="cp" onclick={() => copy(String(dtResult!.seconds), 'dt-s')}>
								{copiedKey === 'dt-s' ? '✓' : 'COPY'}
							</button>
						</div>
						<div class="res-row">
							<span class="lbl">MILLISECONDS</span>
							<span class="val">{dtResult.milliseconds}</span>
							<button class="cp" onclick={() => copy(String(dtResult!.milliseconds), 'dt-ms')}>
								{copiedKey === 'dt-ms' ? '✓' : 'COPY'}
							</button>
						</div>
					</div>
				{/if}
			</section>
		</div>

		<!-- ═══ BATCH CONVERTER ═══ -->
		<section class="panel">
			<h2 class="panel-title">BATCH CONVERTER</h2>
			<p class="hint">Paste multiple timestamps (one per line or comma-separated)</p>

			<div class="field">
				<label for="batchIn">Timestamps</label>
				<textarea id="batchIn" bind:value={batchInput} rows="4" class="inp textarea"
					placeholder="1704067200&#10;1706745600&#10;1709424000"></textarea>
			</div>
			<button class="btn" onclick={convertBatch}>CONVERT ALL</button>

			{#if batchResults.length}
				<div class="batch-table">
					<div class="bt-head">
						<span>TIMESTAMP</span><span>UTC</span><span>LOCAL</span>
					</div>
					{#each batchResults as r}
						<div class="bt-row">
							<span class="mono">{r.ts}</span>
							<span>{r.utc}</span>
							<span>{r.local}</span>
						</div>
					{/each}
				</div>
			{/if}
		</section>

		<div class="two-col">
			<!-- ═══ DURATION CONVERTER ═══ -->
			<section class="panel">
				<h2 class="panel-title">DURATION CONVERTER</h2>
				<p class="hint">Enter seconds to convert into days, hours, minutes</p>

				<div class="field">
					<label for="durIn">Seconds</label>
					<input id="durIn" type="text" inputmode="numeric" bind:value={durInput}
						oninput={convertDuration} placeholder="e.g. 90061" class="inp" />
				</div>

				{#if durResult}
					<div class="results">
						<div class="res-row">
							<span class="lbl">DURATION</span>
							<span class="val accent">{durResult}</span>
						</div>
					</div>
				{/if}
			</section>

			<!-- ═══ EPOCH RANGES ═══ -->
			<section class="panel">
				<h2 class="panel-title">EPOCH START / END</h2>
				<p class="hint">Get epoch range for a year, month or day (UTC)</p>

				<div class="range-inputs">
					<div class="field small">
						<label for="rYear">Year</label>
						<input id="rYear" type="number" bind:value={rangeYear} class="inp" min="1970" max="2100" />
					</div>
					<div class="field small">
						<label for="rMonth">Month</label>
						<input id="rMonth" type="number" bind:value={rangeMonth} class="inp" min="1" max="12" />
					</div>
					<div class="field small">
						<label for="rDay">Day</label>
						<input id="rDay" type="number" bind:value={rangeDay} class="inp" min="1" max="31" />
					</div>
				</div>
				<button class="btn" onclick={calcRanges}>CALCULATE</button>

				{#if rangeResults.length}
					<div class="results">
						{#each rangeResults as r}
							<div class="res-row">
								<span class="lbl">{r.label}</span>
								<span class="val mono">{r.start} → {r.end}</span>
								<button class="cp" onclick={() => copy(`${r.start}`, `r-${r.label}`)}>
									{copiedKey === `r-${r.label}` ? '✓' : 'COPY START'}
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</section>
		</div>

		<!-- ═══ REFERENCE TABLE ═══ -->
		<section class="panel">
			<h2 class="panel-title">REFERENCE TABLE</h2>
			<div class="ref-table">
				<div class="rt-head"><span>UNIT</span><span>SECONDS</span></div>
				{#each refTable as row}
					<div class="rt-row">
						<span>{row.unit}</span>
						<span class="mono">{row.secs.toLocaleString()}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- ═══ ABOUT SECTION ═══ -->
		<section class="panel info-panel">
			<h2 class="panel-title">WHAT IS UNIX TIME?</h2>
			<p>
				Unix time (also known as Epoch time or POSIX time) is a system for tracking time as a running
				total of seconds. The count begins at the <strong>Unix Epoch: January 1 1970, 00:00:00 UTC</strong>.
			</p>
			<p>
				It is timezone-independent, compact, and used by virtually every programming language and
				operating system. The <strong>Year 2038 problem</strong> (Y2K38) occurs when 32-bit signed
				integers overflow on January 19, 2038 at 03:14:07 UTC. Most modern systems now use 64-bit
				timestamps, pushing the limit to billions of years.
			</p>
		</section>
	</main>

	<Footer />
</div>

<style>
	/* ── page shell ─────────────────────────────────── */
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

	.panel-title {
		font-family: var(--font-display); font-size: 1rem;
		color: var(--magenta); letter-spacing: 1.5px; margin: 0 0 1.2rem;
		padding-bottom: .6rem; border-bottom: 1px solid rgba(255,42,109,.2);
	}

	.hint {
		font-size: .78rem; color: var(--text-muted);
		font-family: var(--font-mono); margin: -.4rem 0 1rem; letter-spacing: .5px;
	}

	/* ── live clock ─────────────────────────────────── */
	.live-panel { border-color: var(--cyan); box-shadow: 0 0 20px rgba(0,240,255,.12); }
	.live-row {
		display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
	}
	.live-cell {
		display: flex; flex-direction: column; gap: .4rem;
	}

	/* ── two-col layout ────────────────────────────── */
	.two-col {
		display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
	}

	/* ── form fields ───────────────────────────────── */
	.field { margin-bottom: 1rem; display: flex; flex-direction: column; }
	.field.small { flex: 1; min-width: 0; }
	.field label {
		font-family: var(--font-mono); font-size: .7rem;
		color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase;
		margin-bottom: .35rem;
	}

	.inp, .sel {
		padding: .6rem .75rem;
		background: rgba(6,6,13,.8); border: 1px solid rgba(0,240,255,.18);
		color: var(--text-primary); font-family: var(--font-body); font-size: .9rem;
		transition: all .25s ease;
	}
	.inp:focus, .sel:focus {
		outline: none; border-color: var(--cyan);
		box-shadow: 0 0 12px rgba(0,240,255,.25);
	}
	.sel { cursor: pointer; }
	.sel option { background: var(--dark-bg); color: var(--text-primary); }
	.sel.narrow { width: 70px; flex-shrink: 0; }

	.input-row { display: flex; gap: .5rem; }
	.input-row .inp { flex: 1; min-width: 0; }

	.textarea {
		resize: vertical; font-family: var(--font-mono); font-size: .82rem;
		line-height: 1.5;
	}

	.range-inputs { display: flex; gap: .75rem; }

	/* ── buttons ────────────────────────────────────── */
	.btn {
		padding: .55rem 1.4rem; background: transparent;
		border: 1px solid var(--cyan); color: var(--cyan);
		font-family: var(--font-mono); font-size: .78rem; letter-spacing: 1px;
		cursor: pointer; transition: all .25s ease; margin-bottom: 1rem;
	}
	.btn:hover {
		background: rgba(0,240,255,.1);
		box-shadow: 0 0 14px rgba(0,240,255,.3);
	}

	.cp {
		padding: .25rem .6rem; background: transparent;
		border: 1px solid var(--yellow); color: var(--yellow);
		font-family: var(--font-mono); font-size: .65rem; letter-spacing: 1px;
		cursor: pointer; transition: all .25s ease; white-space: nowrap;
		flex-shrink: 0;
	}
	.cp:hover {
		background: rgba(249,240,2,.08);
		box-shadow: 0 0 10px rgba(249,240,2,.25);
	}

	/* ── results ────────────────────────────────────── */
	.results {
		margin-top: 1rem; padding-top: 1rem;
		border-top: 1px solid rgba(0,240,255,.1);
		display: flex; flex-direction: column; gap: .7rem;
	}
	.res-row {
		display: flex; align-items: center; gap: .8rem; flex-wrap: wrap;
	}
	.lbl {
		font-family: var(--font-mono); font-size: .68rem;
		color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase;
		min-width: 90px; flex-shrink: 0;
	}
	.val {
		font-size: .88rem; color: var(--text-primary); word-break: break-all;
		flex: 1; min-width: 0;
	}
	.val.accent { color: var(--green); }
	.mono { font-family: var(--font-mono); }

	/* ── batch table ───────────────────────────────── */
	.batch-table {
		margin-top: 1rem; font-size: .82rem; overflow-x: auto;
	}
	.bt-head, .bt-row {
		display: grid; grid-template-columns: 180px 1fr 1fr; gap: .5rem;
		padding: .45rem 0; border-bottom: 1px solid rgba(0,240,255,.08);
	}
	.bt-head {
		font-family: var(--font-mono); font-size: .68rem;
		color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase;
		border-bottom-color: rgba(0,240,255,.2);
	}
	.bt-row span { word-break: break-all; }

	/* ── reference table ───────────────────────────── */
	.ref-table { font-size: .85rem; }
	.rt-head, .rt-row {
		display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
		padding: .4rem 0; border-bottom: 1px solid rgba(0,240,255,.08);
	}
	.rt-head {
		font-family: var(--font-mono); font-size: .68rem;
		color: var(--text-muted); letter-spacing: 1px;
		border-bottom-color: rgba(0,240,255,.2);
	}

	/* ── info panel ─────────────────────────────────── */
	.info-panel {
		border-color: rgba(249,240,2,.15);
	}
	.info-panel p {
		font-size: .88rem; color: var(--text-muted); line-height: 1.6;
		margin: .6rem 0;
	}
	.info-panel strong { color: var(--cyan); }

	/* ── responsive ─────────────────────────────────── */
	@media (max-width: 768px) {
		main { padding: 100px 1.2rem 3rem; }
		.title { font-size: 1.6rem; }
		.two-col { grid-template-columns: 1fr; }
		.live-row { grid-template-columns: 1fr; }
		.bt-head, .bt-row { grid-template-columns: 1fr; gap: .2rem; }
		.bt-head span:not(:first-child) { display: none; }
		.bt-row { padding: .6rem 0; }
		.range-inputs { flex-direction: column; }
		.res-row { flex-direction: column; align-items: flex-start; gap: .3rem; }
		.lbl { min-width: unset; }
	}
</style>
