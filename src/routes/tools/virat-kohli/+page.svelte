<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import ScanLines from '$lib/components/ScanLines.svelte';

	let mounted = $state(false);
	onMount(() => { mounted = true; });

	const profile = {
		name: 'Virat Kohli',
		nicknames: ['King Kohli', 'The Chase Master', 'The Run Machine'],
		born: '5 November 1988',
		birthplace: 'Delhi, India',
		jersey: 18,
		role: 'Right-handed Batsman',
		bowling: 'Right-arm Medium',
		ipl: 'Royal Challengers Bengaluru (RCB)',
		debut: 'August 2008 (ODI vs Sri Lanka)',
		captaincy: 'Most successful Indian Test captain — 40 wins in 68 Tests',
		u19: 'Captain of India\'s 2008 U-19 World Cup winning team',
	};

	const stats = [
		{ format: 'Tests', matches: '~123', runs: '9,230', centuries: 30, average: '46.85' },
		{ format: 'ODIs', matches: '~302', runs: '14,181', centuries: 54, average: '57.88' },
		{ format: 'T20Is', matches: '~125', runs: '4,188', centuries: 1, average: '48.70' },
	];

	const totalRuns = '28,068+';
	const totalCenturies = '85+';

	const trophies = [
		{ year: '2008', title: 'U-19 World Cup' },
		{ year: '2011', title: 'ODI World Cup' },
		{ year: '2013', title: 'Champions Trophy' },
		{ year: '2024', title: 'T20 World Cup — Man of the Match in Final' },
		{ year: '2025', title: 'Champions Trophy' },
		{ year: '2025', title: 'IPL (RCB)' },
	];

	const records = [
		'Most centuries in ODI cricket history',
		'Second-highest run-scorer in international cricket history (after Sachin Tendulkar)',
		'Highest all-time IPL run-scorer (8,000+ runs)',
		'8 IPL centuries',
		'Only player to play for one IPL franchise across all seasons',
		'657 runs in IPL 2025 season',
	];

	const links = [
		{ label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Virat_Kohli', icon: 'W', color: 'var(--cyan)' },
		{ label: 'ESPN Cricinfo', url: 'https://www.espncricinfo.com/cricketers/virat-kohli-253802', icon: 'E', color: 'var(--green)' },
		{ label: 'Cricbuzz', url: 'https://www.cricbuzz.com/profiles/1413/virat-kohli', icon: 'C', color: 'var(--yellow)' },
		{ label: 'StatsGuru', url: 'https://stats.espncricinfo.com/ci/engine/player/253802.html', icon: 'S', color: 'var(--magenta)' },
		{ label: 'ICC Profile', url: 'https://www.icc-cricket.com/rankings/3993/virat-kohli', icon: 'I', color: 'var(--cyan)' },
		{ label: 'IPL Profile', url: 'https://www.iplt20.com/teams/royal-challengers-bengaluru/squad-details/164', icon: 'T', color: 'var(--yellow)' },
		{ label: 'BCCI Profile', url: 'https://www.bcci.tv/international/men/players/virat-kohli/2', icon: 'B', color: 'var(--green)' },
		{ label: 'Instagram', url: 'https://www.instagram.com/virat.kohli/', icon: 'IG', color: '#E1306C' },
		{ label: 'X (Twitter)', url: 'https://x.com/imVkohli', icon: 'X', color: 'var(--text-primary)' },
	];

	const statsguru = [
		{ label: 'Test Stats', url: 'https://stats.espncricinfo.com/ci/engine/player/253802.html?class=1;type=allround' },
		{ label: 'ODI Stats', url: 'https://stats.espncricinfo.com/ci/engine/player/253802.html?class=2;type=allround' },
		{ label: 'T20I Stats', url: 'https://stats.espncricinfo.com/ci/engine/player/253802.html?class=3;type=allround' },
	];
</script>

<ScanLines />
<ParticleBackground />

<div class="page" class:mounted>
	<Navbar />
	<main>
		<div class="breadcrumb">
			<a href="/">HOME</a><span class="sep">//</span>
			<a href="/tools">TOOLS</a><span class="sep">//</span>
			<span class="active">VIRAT KOHLI</span>
		</div>

		<!-- ═══ HERO ═══ -->
		<div class="hero">
			<div class="hero-text">
				<h1 class="title">
					<span class="br">&lt;</span>VIRAT KOHLI<span class="br">/&gt;</span>
				</h1>
				<div class="nicknames">
					{#each profile.nicknames as n, i}
						<span class="nick">{n}</span>
						{#if i < profile.nicknames.length - 1}<span class="nick-sep">|</span>{/if}
					{/each}
				</div>
				<p class="subtitle">#{profile.jersey} &bull; {profile.role} &bull; {profile.ipl}</p>
			</div>
			<div class="hero-stat-box">
				<div class="hero-stat">
					<span class="hero-num">{totalRuns}</span>
					<span class="hero-label">INT'L RUNS</span>
				</div>
				<div class="hero-stat">
					<span class="hero-num">{totalCenturies}</span>
					<span class="hero-label">CENTURIES</span>
				</div>
				<div class="hero-stat">
					<span class="hero-num">18</span>
					<span class="hero-label">JERSEY</span>
				</div>
			</div>
		</div>

		<!-- ═══ QUICK LINKS ═══ -->
		<section class="panel">
			<h2 class="panel-title">QUICK LINKS</h2>
			<div class="links-grid">
				{#each links as link}
					<a href={link.url} target="_blank" rel="noopener noreferrer" class="link-card" style="--lc: {link.color}">
						<span class="link-icon">{link.icon}</span>
						<span class="link-label">{link.label}</span>
						<span class="link-arrow">&rarr;</span>
					</a>
				{/each}
			</div>
		</section>

		<!-- ═══ STATSGURU ═══ -->
		<section class="panel">
			<h2 class="panel-title">STATSGURU LINKS</h2>
			<div class="sg-row">
				{#each statsguru as sg}
					<a href={sg.url} target="_blank" rel="noopener noreferrer" class="sg-link">{sg.label} &rarr;</a>
				{/each}
			</div>
		</section>

		<!-- ═══ BIO ═══ -->
		<section class="panel">
			<h2 class="panel-title">PROFILE</h2>
			<div class="bio-grid">
				<div class="bio-item"><span class="bio-key">BORN</span><span class="bio-val">{profile.born}</span></div>
				<div class="bio-item"><span class="bio-key">BIRTHPLACE</span><span class="bio-val">{profile.birthplace}</span></div>
				<div class="bio-item"><span class="bio-key">JERSEY</span><span class="bio-val">#{profile.jersey}</span></div>
				<div class="bio-item"><span class="bio-key">BATTING</span><span class="bio-val">{profile.role}</span></div>
				<div class="bio-item"><span class="bio-key">BOWLING</span><span class="bio-val">{profile.bowling}</span></div>
				<div class="bio-item"><span class="bio-key">IPL TEAM</span><span class="bio-val">{profile.ipl}</span></div>
				<div class="bio-item"><span class="bio-key">INT'L DEBUT</span><span class="bio-val">{profile.debut}</span></div>
				<div class="bio-item"><span class="bio-key">CAPTAINCY</span><span class="bio-val">{profile.captaincy}</span></div>
				<div class="bio-item"><span class="bio-key">YOUTH</span><span class="bio-val">{profile.u19}</span></div>
			</div>
		</section>

		<!-- ═══ CAREER STATS ═══ -->
		<section class="panel">
			<h2 class="panel-title">CAREER STATISTICS</h2>
			<div class="stats-table-wrap">
				<table class="stats-table">
					<thead>
						<tr>
							<th>FORMAT</th>
							<th>MATCHES</th>
							<th>RUNS</th>
							<th>100s</th>
							<th>AVG</th>
						</tr>
					</thead>
					<tbody>
						{#each stats as s}
							<tr>
								<td class="fmt">{s.format}</td>
								<td>{s.matches}</td>
								<td class="runs">{s.runs}</td>
								<td class="cents">{s.centuries}</td>
								<td>{s.average}</td>
							</tr>
						{/each}
						<tr class="total-row">
							<td class="fmt">TOTAL</td>
							<td>—</td>
							<td class="runs">{totalRuns}</td>
							<td class="cents">{totalCenturies}</td>
							<td>—</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- ═══ TROPHIES ═══ -->
		<section class="panel">
			<h2 class="panel-title">TROPHIES & TITLES</h2>
			<div class="trophies">
				{#each trophies as t}
					<div class="trophy-item">
						<span class="trophy-year">{t.year}</span>
						<span class="trophy-title">{t.title}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- ═══ RECORDS ═══ -->
		<section class="panel">
			<h2 class="panel-title">KEY RECORDS</h2>
			<ul class="records-list">
				{#each records as r}
					<li>{r}</li>
				{/each}
			</ul>
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

	/* hero */
	.hero { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
	.title { font-family: var(--font-display); font-size: 2.6rem; font-weight: 900; letter-spacing: 2px; margin: 0 0 .4rem; background: linear-gradient(135deg, var(--cyan), var(--magenta)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
	.br { -webkit-text-fill-color: var(--green); }
	.nicknames { display: flex; gap: .5rem; align-items: center; flex-wrap: wrap; margin-bottom: .4rem; }
	.nick { font-family: var(--font-mono); font-size: .75rem; color: var(--yellow); letter-spacing: 1px; }
	.nick-sep { color: var(--text-muted); font-size: .65rem; }
	.subtitle { font-family: var(--font-mono); font-size: .82rem; color: var(--text-muted); letter-spacing: 1px; margin: 0; }

	.hero-stat-box { display: flex; gap: 1.5rem; }
	.hero-stat { display: flex; flex-direction: column; align-items: center; padding: .8rem 1.2rem; border: 1px solid rgba(0,240,255,.15); background: var(--dark-card); }
	.hero-num { font-family: var(--font-display); font-size: 1.5rem; font-weight: 900; color: var(--cyan); letter-spacing: 1px; }
	.hero-label { font-family: var(--font-mono); font-size: .55rem; color: var(--text-muted); letter-spacing: 2px; margin-top: .2rem; }

	/* panels */
	.panel { background: var(--dark-card); border: 1px solid rgba(0,240,255,.12); padding: 1.5rem; margin-bottom: 1.5rem; transition: border-color .3s ease; }
	.panel:hover { border-color: rgba(0,240,255,.3); }
	.panel-title { font-family: var(--font-display); font-size: 1rem; color: var(--magenta); letter-spacing: 1.5px; margin: 0 0 1.2rem; padding-bottom: .6rem; border-bottom: 1px solid rgba(255,42,109,.2); }

	/* quick links grid */
	.links-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: .6rem; }
	.link-card {
		display: flex; align-items: center; gap: .6rem;
		padding: .7rem 1rem;
		background: rgba(6,6,13,.6);
		border: 1px solid color-mix(in srgb, var(--lc) 25%, transparent);
		text-decoration: none; color: var(--text-primary);
		transition: all .25s ease;
	}
	.link-card:hover {
		border-color: var(--lc);
		box-shadow: 0 0 14px color-mix(in srgb, var(--lc) 30%, transparent);
		transform: translateX(3px);
	}
	.link-icon { font-family: var(--font-display); font-size: .85rem; font-weight: 900; color: var(--lc); min-width: 24px; text-align: center; }
	.link-label { font-family: var(--font-mono); font-size: .78rem; letter-spacing: .5px; flex: 1; }
	.link-arrow { font-size: .7rem; color: var(--lc); opacity: 0; transition: opacity .2s; }
	.link-card:hover .link-arrow { opacity: 1; }

	/* statsguru */
	.sg-row { display: flex; gap: .6rem; flex-wrap: wrap; }
	.sg-link {
		padding: .5rem 1rem;
		background: rgba(6,6,13,.6);
		border: 1px solid rgba(249,240,2,.15);
		color: var(--yellow);
		font-family: var(--font-mono);
		font-size: .75rem;
		letter-spacing: 1px;
		text-decoration: none;
		transition: all .25s ease;
	}
	.sg-link:hover { border-color: var(--yellow); box-shadow: 0 0 10px rgba(249,240,2,.2); }

	/* bio grid */
	.bio-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: .6rem; }
	.bio-item { display: flex; gap: .8rem; padding: .5rem .7rem; background: rgba(6,6,13,.5); border: 1px solid rgba(0,240,255,.06); }
	.bio-key { font-family: var(--font-mono); font-size: .65rem; color: var(--magenta); letter-spacing: 1.5px; min-width: 90px; flex-shrink: 0; padding-top: 2px; }
	.bio-val { font-family: var(--font-mono); font-size: .8rem; color: var(--text-primary); line-height: 1.4; }

	/* stats table */
	.stats-table-wrap { overflow-x: auto; }
	.stats-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: .82rem; }
	.stats-table th {
		text-align: left; padding: .6rem .8rem;
		font-size: .65rem; color: var(--text-muted); letter-spacing: 2px;
		border-bottom: 1px solid rgba(0,240,255,.15);
	}
	.stats-table td { padding: .6rem .8rem; border-bottom: 1px solid rgba(0,240,255,.06); color: var(--text-muted); }
	.stats-table .fmt { color: var(--cyan); font-weight: bold; letter-spacing: 1px; }
	.stats-table .runs { color: var(--green); font-weight: bold; }
	.stats-table .cents { color: var(--yellow); font-weight: bold; }
	.stats-table .total-row td { border-top: 2px solid var(--cyan); border-bottom: none; color: var(--text-primary); }
	.stats-table .total-row .fmt { color: var(--magenta); }

	/* trophies */
	.trophies { display: flex; flex-direction: column; gap: .4rem; }
	.trophy-item { display: flex; align-items: center; gap: 1rem; padding: .5rem .7rem; background: rgba(6,6,13,.5); border: 1px solid rgba(0,240,255,.06); transition: border-color .2s; }
	.trophy-item:hover { border-color: rgba(249,240,2,.3); }
	.trophy-year { font-family: var(--font-mono); font-size: .75rem; color: var(--yellow); font-weight: bold; letter-spacing: 1px; min-width: 40px; }
	.trophy-title { font-family: var(--font-mono); font-size: .82rem; color: var(--text-primary); }

	/* records */
	.records-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .4rem; }
	.records-list li {
		padding: .5rem .8rem .5rem 1.4rem;
		background: rgba(6,6,13,.5);
		border: 1px solid rgba(0,240,255,.06);
		font-family: var(--font-mono);
		font-size: .82rem;
		color: var(--text-muted);
		position: relative;
		transition: border-color .2s;
	}
	.records-list li:hover { border-color: rgba(0,255,65,.25); }
	.records-list li::before { content: '▸'; position: absolute; left: .5rem; color: var(--green); }

	@media (max-width: 768px) {
		main { padding: 100px 1.2rem 3rem; }
		.title { font-size: 1.6rem; }
		.hero { flex-direction: column; }
		.hero-stat-box { width: 100%; justify-content: space-between; }
		.links-grid { grid-template-columns: 1fr; }
		.bio-grid { grid-template-columns: 1fr; }
	}
</style>
