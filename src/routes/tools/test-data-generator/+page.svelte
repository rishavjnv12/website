<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import ScanLines from '$lib/components/ScanLines.svelte';

	let mounted = $state(false);
	let copiedKey = $state('');

	/* ── Lorem Ipsum ───────────────────────────────── */
	let loremParagraphs = $state(3);
	let loremOutput = $state('');

	const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

	function generateLorem() {
		const paragraphs: string[] = [];
		for (let p = 0; p < loremParagraphs; p++) {
			const sentenceCount = randInt(4, 8);
			const sentences: string[] = [];
			for (let s = 0; s < sentenceCount; s++) {
				const wordCount = randInt(6, 15);
				const words: string[] = [];
				for (let w = 0; w < wordCount; w++) {
					words.push(loremWords[randInt(0, loremWords.length - 1)]);
				}
				words[0] = words[0][0].toUpperCase() + words[0].slice(1);
				sentences.push(words.join(' ') + '.');
			}
			paragraphs.push(sentences.join(' '));
		}
		loremOutput = paragraphs.join('\n\n');
	}

	/* ── People Generator ──────────────────────────── */
	let personCount = $state(5);
	let people = $state<{ name: string; email: string; phone: string; address: string; dob: string; id: string }[]>([]);

	const firstNames = ['Aarav','Aditi','Akash','Ananya','Arjun','Diya','Ishaan','Kavya','Krish','Meera','Neha','Priya','Rahul','Ravi','Rohan','Saanvi','Sanya','Shreya','Varun','Vivek','James','Emma','Oliver','Sophia','Liam','Ava','Noah','Isabella','Ethan','Mia','Lucas','Charlotte','Mason','Amelia','Logan','Harper','Alex','Zara','Leo','Nora'];
	const lastNames = ['Kumar','Sharma','Patel','Singh','Gupta','Mehta','Verma','Shah','Joshi','Reddy','Anderson','Brown','Clark','Davis','Garcia','Harris','Jackson','Johnson','Lee','Martin','Miller','Moore','Robinson','Smith','Taylor','Thomas','White','Williams','Wilson','Young'];
	const domains = ['gmail.com','outlook.com','yahoo.com','icloud.com','proton.me','hey.com','fastmail.com'];
	const streets = ['MG Road','Park Avenue','Oak Street','Elm Drive','Cedar Lane','Maple Court','Brigade Road','Hill Road','Lake View','Station Road','Market Street','Church Street','Ring Road','Canal Street','River Drive'];
	const cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Chennai','New York','London','Tokyo','Singapore','Sydney','San Francisco','Toronto','Berlin','Paris','Dubai'];

	function generatePeople() {
		const n = Math.min(Math.max(1, personCount), 100);
		people = Array.from({ length: n }, () => {
			const first = pick(firstNames);
			const last = pick(lastNames);
			const emailBase = `${first.toLowerCase()}.${last.toLowerCase()}${randInt(1, 999)}`;
			return {
				name: `${first} ${last}`,
				email: `${emailBase}@${pick(domains)}`,
				phone: `+${randInt(1,91)}-${randInt(100,999)}-${randInt(100,999)}-${randInt(1000,9999)}`,
				address: `${randInt(1, 999)} ${pick(streets)}, ${pick(cities)}`,
				dob: randomDate(1970, 2005),
				id: crypto.randomUUID().slice(0, 8)
			};
		});
	}

	/* ── JSON Mock Generator ───────────────────────── */
	let jsonCount = $state(3);
	let jsonOutput = $state('');

	function generateJsonMock() {
		const n = Math.min(Math.max(1, jsonCount), 50);
		const items = Array.from({ length: n }, (_, i) => ({
			id: i + 1,
			uuid: crypto.randomUUID(),
			name: `${pick(firstNames)} ${pick(lastNames)}`,
			email: `${pick(firstNames).toLowerCase()}${randInt(1,99)}@${pick(domains)}`,
			age: randInt(18, 65),
			active: Math.random() > 0.3,
			role: pick(['admin', 'user', 'moderator', 'editor', 'viewer']),
			createdAt: new Date(Date.now() - randInt(0, 365 * 24 * 60 * 60 * 1000)).toISOString(),
			score: parseFloat((Math.random() * 100).toFixed(2))
		}));
		jsonOutput = JSON.stringify(items, null, 2);
	}

	/* ── helpers ────────────────────────────────────── */
	function randInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function pick<T>(arr: T[]): T {
		return arr[randInt(0, arr.length - 1)];
	}

	function randomDate(startYear: number, endYear: number): string {
		const y = randInt(startYear, endYear);
		const m = String(randInt(1, 12)).padStart(2, '0');
		const d = String(randInt(1, 28)).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}

	function copy(text: string, key: string) {
		navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => { if (copiedKey === key) copiedKey = ''; }, 1500);
	}

	function download(content: string, filename: string) {
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url; a.download = filename; a.click();
		URL.revokeObjectURL(url);
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
			<span class="active">TEST DATA GENERATOR</span>
		</div>

		<h1 class="title">
			<span class="br">&lt;</span>TEST DATA GENERATOR<span class="br">/&gt;</span>
		</h1>
		<p class="subtitle">Lorem ipsum &bull; mock users &bull; JSON payloads</p>

		<!-- ═══ LOREM IPSUM ═══ -->
		<section class="panel">
			<h2 class="panel-title">LOREM IPSUM</h2>
			<div class="config-row">
				<div class="field">
					<label for="loremN">Paragraphs</label>
					<input id="loremN" type="number" bind:value={loremParagraphs} min="1" max="20" class="inp" />
				</div>
				<button class="btn" onclick={generateLorem}>GENERATE</button>
			</div>

			{#if loremOutput}
				<div class="output-box">
					<pre>{loremOutput}</pre>
				</div>
				<div class="output-actions">
					<button class="cp" onclick={() => copy(loremOutput, 'lorem')}>
						{copiedKey === 'lorem' ? '✓ COPIED' : 'COPY'}
					</button>
				</div>
			{/if}
		</section>

		<!-- ═══ PEOPLE GENERATOR ═══ -->
		<section class="panel">
			<h2 class="panel-title">RANDOM PEOPLE</h2>
			<p class="hint">Name, email, phone, address, DOB — ready for app testing</p>

			<div class="config-row">
				<div class="field">
					<label for="personN">Count (1–100)</label>
					<input id="personN" type="number" bind:value={personCount} min="1" max="100" class="inp" />
				</div>
				<button class="btn" onclick={generatePeople}>GENERATE</button>
			</div>

			{#if people.length}
				<div class="output-actions" style="margin-bottom: .8rem;">
					<button class="cp" onclick={() => copy(JSON.stringify(people, null, 2), 'people-json')}>
						{copiedKey === 'people-json' ? '✓ COPIED JSON' : 'COPY AS JSON'}
					</button>
					<button class="cp" onclick={() => download(JSON.stringify(people, null, 2), 'test-people.json')}>
						DOWNLOAD
					</button>
				</div>
				<div class="people-table">
					<div class="pt-head">
						<span>NAME</span><span>EMAIL</span><span>PHONE</span><span>DOB</span>
					</div>
					{#each people as p}
						<div class="pt-row">
							<span class="name-cell">{p.name}</span>
							<span>{p.email}</span>
							<span>{p.phone}</span>
							<span>{p.dob}</span>
						</div>
					{/each}
				</div>
			{/if}
		</section>

		<!-- ═══ JSON MOCK ═══ -->
		<section class="panel">
			<h2 class="panel-title">JSON MOCK PAYLOAD</h2>
			<p class="hint">Generate realistic API response data with UUIDs, timestamps, and mixed types</p>

			<div class="config-row">
				<div class="field">
					<label for="jsonN">Records (1–50)</label>
					<input id="jsonN" type="number" bind:value={jsonCount} min="1" max="50" class="inp" />
				</div>
				<button class="btn" onclick={generateJsonMock}>GENERATE</button>
			</div>

			{#if jsonOutput}
				<div class="output-actions" style="margin-bottom: .8rem;">
					<button class="cp" onclick={() => copy(jsonOutput, 'json-mock')}>
						{copiedKey === 'json-mock' ? '✓ COPIED' : 'COPY'}
					</button>
					<button class="cp" onclick={() => download(jsonOutput, 'mock-data.json')}>
						DOWNLOAD
					</button>
				</div>
				<div class="code-output">
					<pre>{jsonOutput}</pre>
				</div>
			{/if}
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
	.hint { font-size: .78rem; color: var(--text-muted); font-family: var(--font-mono); margin: -.4rem 0 1rem; letter-spacing: .5px; }

	.config-row { display: flex; align-items: flex-end; gap: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap; }
	.field { display: flex; flex-direction: column; }
	.field label { font-family: var(--font-mono); font-size: .7rem; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: .35rem; }
	.inp { padding: .6rem .75rem; background: rgba(6,6,13,.8); border: 1px solid rgba(0,240,255,.18); color: var(--text-primary); font-family: var(--font-mono); font-size: .9rem; transition: all .25s ease; width: 120px; }
	.inp:focus { outline: none; border-color: var(--cyan); box-shadow: 0 0 12px rgba(0,240,255,.25); }

	.btn { padding: .55rem 1.4rem; background: transparent; border: 1px solid var(--cyan); color: var(--cyan); font-family: var(--font-mono); font-size: .78rem; letter-spacing: 1px; cursor: pointer; transition: all .25s ease; }
	.btn:hover { background: rgba(0,240,255,.1); box-shadow: 0 0 14px rgba(0,240,255,.3); }

	.cp { padding: .3rem .7rem; background: transparent; border: 1px solid var(--yellow); color: var(--yellow); font-family: var(--font-mono); font-size: .65rem; letter-spacing: 1px; cursor: pointer; transition: all .25s ease; white-space: nowrap; }
	.cp:hover { background: rgba(249,240,2,.08); box-shadow: 0 0 10px rgba(249,240,2,.25); }

	.output-actions { display: flex; gap: .5rem; margin-top: .8rem; flex-wrap: wrap; }

	.output-box { max-height: 400px; overflow: auto; background: rgba(6,6,13,.8); border: 1px solid rgba(0,240,255,.1); padding: 1rem; }
	.output-box pre { margin: 0; font-family: var(--font-mono); font-size: .82rem; line-height: 1.6; white-space: pre-wrap; color: var(--text-muted); }

	.code-output { max-height: 500px; overflow: auto; background: rgba(6,6,13,.8); border: 1px solid rgba(0,240,255,.1); padding: 1rem; }
	.code-output pre { margin: 0; font-family: var(--font-mono); font-size: .8rem; line-height: 1.6; white-space: pre-wrap; word-break: break-all; color: var(--green); }

	/* people table */
	.people-table { font-size: .8rem; overflow-x: auto; }
	.pt-head, .pt-row { display: grid; grid-template-columns: 160px 1fr 170px 100px; gap: .5rem; padding: .45rem .5rem; border-bottom: 1px solid rgba(0,240,255,.08); }
	.pt-head { font-family: var(--font-mono); font-size: .68rem; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase; border-bottom-color: rgba(0,240,255,.2); }
	.pt-row span { word-break: break-all; font-family: var(--font-mono); font-size: .78rem; color: var(--text-primary); }
	.name-cell { color: var(--cyan) !important; }

	@media (max-width: 768px) {
		main { padding: 100px 1.2rem 3rem; }
		.title { font-size: 1.6rem; }
		.pt-head, .pt-row { grid-template-columns: 1fr; gap: .2rem; }
		.pt-head span:not(:first-child) { display: none; }
		.pt-row { padding: .6rem .5rem; }
	}
</style>
