<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import ScanLines from '$lib/components/ScanLines.svelte';

	let mounted = $state(false);

	/* ── Genres ─────────────────────────────────────── */
	const genres = [
		{ label: 'Science', keywords: ['Physics', 'Biology', 'Chemistry', 'Astronomy', 'Neuroscience', 'Genetics', 'Quantum mechanics', 'Evolution', 'Microbiology', 'Astrophysics', 'Thermodynamics', 'Ecology', 'Botany', 'Zoology', 'Geology'] },
		{ label: 'Technology', keywords: ['Artificial intelligence', 'Computer science', 'Robotics', 'Blockchain', 'Cybersecurity', 'Machine learning', 'Internet', 'Software engineering', 'Semiconductor', 'Cryptography', 'Space technology', 'Nanotechnology', 'Virtual reality', '3D printing', 'Cloud computing'] },
		{ label: 'History', keywords: ['Ancient Rome', 'World War II', 'Renaissance', 'Medieval', 'Ancient Egypt', 'Cold War', 'Industrial Revolution', 'Byzantine Empire', 'Viking Age', 'French Revolution', 'Mongol Empire', 'Ottoman Empire', 'Ancient Greece', 'Silk Road', 'Meiji Restoration'] },
		{ label: 'Philosophy', keywords: ['Existentialism', 'Stoicism', 'Ethics', 'Epistemology', 'Metaphysics', 'Logic', 'Aesthetics', 'Nihilism', 'Utilitarianism', 'Phenomenology', 'Rationalism', 'Empiricism', 'Pragmatism', 'Determinism', 'Absurdism'] },
		{ label: 'Space', keywords: ['Black hole', 'Mars', 'Exoplanet', 'Nebula', 'Galaxy', 'Space exploration', 'International Space Station', 'Solar system', 'Supernova', 'Milky Way', 'James Webb Space Telescope', 'Apollo program', 'Asteroid', 'Pulsar', 'Dark matter'] },
		{ label: 'Art & Music', keywords: ['Impressionism', 'Baroque music', 'Renaissance art', 'Jazz', 'Classical music', 'Surrealism', 'Abstract art', 'Opera', 'Street art', 'Pop art', 'Blues', 'Electronic music', 'Sculpture', 'Photography', 'Film noir'] },
		{ label: 'Geography', keywords: ['Amazon rainforest', 'Sahara Desert', 'Great Barrier Reef', 'Mariana Trench', 'Himalaya', 'Fjord', 'Volcano', 'Island', 'Tundra', 'Coral reef', 'Grand Canyon', 'Antarctica', 'Nile', 'Pacific Ocean', 'Mount Everest'] },
		{ label: 'Mathematics', keywords: ['Prime number', 'Calculus', 'Topology', 'Game theory', 'Fractal', 'Probability', 'Number theory', 'Algebra', 'Geometry', 'Fibonacci number', 'Chaos theory', 'Statistics', 'Pi', 'Golden ratio', 'Graph theory'] },
		{ label: 'Psychology', keywords: ['Cognitive bias', 'Consciousness', 'Memory', 'Behaviorism', 'Psychoanalysis', 'Emotional intelligence', 'Dream', 'Perception', 'Motivation', 'Social psychology', 'Neuroplasticity', 'Attachment theory', 'Placebo', 'Flow psychology', 'Heuristic'] },
		{ label: 'Nature', keywords: ['Endangered species', 'Migration', 'Rainforest', 'Ocean', 'Coral reef', 'Predator', 'Symbiosis', 'Photosynthesis', 'Ecosystem', 'Biodiversity', 'Pollination', 'Camouflage', 'Bioluminescence', 'Hibernation', 'Mangrove'] },
		{ label: 'Food & Culture', keywords: ['Fermentation', 'Sushi', 'Coffee', 'Chocolate', 'Wine', 'Spice trade', 'Street food', 'Tea', 'Bread', 'Cheese', 'Olive oil', 'Curry', 'Ramen', 'Barbecue', 'Gastronomy'] },
		{ label: 'Mythology', keywords: ['Greek mythology', 'Norse mythology', 'Egyptian mythology', 'Hindu mythology', 'Japanese mythology', 'Celtic mythology', 'Aztec mythology', 'Dragon', 'Phoenix', 'Underworld', 'Olympus', 'Valhalla', 'Titan', 'Folklore', 'Legend'] },
		{ label: 'India', keywords: ['India', 'Indian culture', 'Bollywood', 'Indian cuisine', 'Indian classical music', 'Yoga', 'Ayurveda', 'Indian festivals', 'Diwali', 'Holi', 'Indian architecture', 'Taj Mahal', 'Indian railways', 'ISRO', 'Cricket in India'] },
		{ label: 'Indian Politics', keywords: ['Politics of India', 'Indian National Congress', 'Bharatiya Janata Party', 'Constitution of India', 'Parliament of India', 'Prime Minister of India', 'Indian general election', 'Lok Sabha', 'Rajya Sabha', 'Indian independence movement', 'Jawaharlal Nehru', 'Indira Gandhi', 'Atal Bihari Vajpayee', 'Supreme Court of India', 'Election Commission of India'] },
		{ label: 'World Politics', keywords: ['United Nations', 'NATO', 'European Union', 'Geopolitics', 'Democracy', 'Communism', 'Cold War politics', 'G20', 'World Trade Organization', 'International relations', 'Diplomacy', 'Foreign policy', 'Political ideology', 'Authoritarianism', 'Globalization'] },
		{ label: 'Indian History', keywords: ['Indus Valley civilisation', 'Maurya Empire', 'Gupta Empire', 'Mughal Empire', 'Chola dynasty', 'Maratha Empire', 'Indian Rebellion of 1857', 'Mahatma Gandhi', 'Partition of India', 'British Raj', 'Vijayanagara Empire', 'Ashoka', 'Chandragupta Maurya', 'Delhi Sultanate', 'Quit India movement'] },
		{ label: 'Hinduism', keywords: ['Hinduism', 'Bhagavad Gita', 'Ramayana', 'Mahabharata', 'Vedas', 'Upanishads', 'Shiva', 'Vishnu', 'Brahma', 'Karma', 'Dharma', 'Moksha', 'Hindu temple', 'Puja', 'Varanasi'] },
	];

	let selectedGenre = $state(genres[0]);
	let articles = $state<Article[]>([]);
	let loading = $state(false);
	let error = $state('');
	let history = $state<Article[]>([]);
	let showHistory = $state(false);

	interface Article {
		title: string;
		extract: string;
		thumbnail?: string;
		url: string;
		genre: string;
		timestamp: number;
	}

	const WIKI_API = 'https://en.wikipedia.org/w/api.php';
	const WIKI_REST = 'https://en.wikipedia.org/api/rest_v1/page/summary';

	async function fetchRandomArticles(count = 3) {
		loading = true;
		error = '';
		articles = [];

		try {
			const keywords = [...selectedGenre.keywords];
			// Shuffle and pick `count` random keywords
			for (let i = keywords.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[keywords[i], keywords[j]] = [keywords[j], keywords[i]];
			}
			const picks = keywords.slice(0, count + 2); // extra in case some fail

			const results: Article[] = [];

			// Fetch articles in parallel
			const fetches = picks.map(async (keyword) => {
				try {
					// Search for articles related to this keyword
					const searchUrl = `${WIKI_API}?action=query&list=search&srsearch=${encodeURIComponent(keyword)}&srlimit=10&format=json&origin=*`;
					const searchRes = await fetch(searchUrl);
					const searchData = await searchRes.json();
					const searchResults = searchData?.query?.search;

					if (!searchResults || searchResults.length === 0) return null;

					// Pick a random result from the search
					const pick = searchResults[Math.floor(Math.random() * Math.min(searchResults.length, 8))];

					// Get the summary via REST API
					const summaryUrl = `${WIKI_REST}/${encodeURIComponent(pick.title)}`;
					const summaryRes = await fetch(summaryUrl);
					if (!summaryRes.ok) return null;
					const summary = await summaryRes.json();

					if (summary.type === 'disambiguation') return null;

					return {
						title: summary.title || pick.title,
						extract: summary.extract || 'No summary available.',
						thumbnail: summary.thumbnail?.source,
						url: summary.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(pick.title)}`,
						genre: selectedGenre.label,
						timestamp: Date.now()
					} as Article;
				} catch {
					return null;
				}
			});

			const all = await Promise.all(fetches);
			for (const a of all) {
				if (a && results.length < count) {
					// Deduplicate
					if (!results.find(r => r.title === a.title)) {
						results.push(a);
					}
				}
			}

			if (results.length === 0) {
				error = 'No articles found. Try again or pick a different genre.';
			} else {
				articles = results;
				// Add to history
				history = [...results, ...history].slice(0, 30);
			}
		} catch (e) {
			error = 'Failed to fetch articles. Check your connection and try again.';
		} finally {
			loading = false;
		}
	}

	function selectGenre(g: typeof genres[0]) {
		selectedGenre = g;
	}

	function clearHistory() {
		history = [];
	}

	onMount(() => {
		mounted = true;
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
			<span class="active">WIKI EXPLORER</span>
		</div>

		<h1 class="title">
			<span class="br">&lt;</span>WIKI EXPLORER<span class="br">/&gt;</span>
		</h1>
		<p class="subtitle">Discover random Wikipedia articles by genre</p>

		<!-- ═══ GENRE SELECTOR ═══ -->
		<section class="panel">
			<h2 class="panel-title">SELECT GENRE</h2>
			<div class="genre-grid">
				{#each genres as g}
					<button
						class="genre-chip"
						class:selected={selectedGenre.label === g.label}
						onclick={() => selectGenre(g)}
					>
						{g.label}
					</button>
				{/each}
			</div>

			<div class="action-row">
				<button class="btn btn-main" onclick={() => fetchRandomArticles(3)} disabled={loading}>
					{loading ? 'SCANNING...' : 'DISCOVER ARTICLES'}
				</button>
				<button class="btn btn-alt" onclick={() => fetchRandomArticles(1)} disabled={loading}>
					{loading ? '...' : 'SINGLE ARTICLE'}
				</button>
				<button class="btn btn-alt" onclick={() => fetchRandomArticles(5)} disabled={loading}>
					{loading ? '...' : 'GIVE ME 5'}
				</button>
			</div>
		</section>

		<!-- ═══ LOADING ═══ -->
		{#if loading}
			<div class="loading-bar">
				<div class="loading-inner"></div>
			</div>
			<p class="loading-text">// QUERYING WIKIPEDIA DATABASE...</p>
		{/if}

		<!-- ═══ ERROR ═══ -->
		{#if error}
			<div class="error-msg">{error}</div>
		{/if}

		<!-- ═══ ARTICLES ═══ -->
		{#if articles.length}
			<section class="panel results-panel">
				<h2 class="panel-title">RESULTS ({articles.length})</h2>
				<div class="articles">
					{#each articles as article}
						<a href={article.url} target="_blank" rel="noopener noreferrer" class="article-card">
							{#if article.thumbnail}
								<div class="article-thumb">
									<img src={article.thumbnail} alt={article.title} />
								</div>
							{/if}
							<div class="article-body">
								<h3 class="article-title">{article.title}</h3>
								<span class="article-genre">{article.genre}</span>
								<p class="article-extract">{article.extract}</p>
								<span class="article-link">READ ON WIKIPEDIA &rarr;</span>
							</div>
						</a>
					{/each}
				</div>
			</section>
		{/if}

		<!-- ═══ HISTORY ═══ -->
		{#if history.length}
			<section class="panel history-panel">
				<div class="history-header">
					<h2 class="panel-title">EXPLORATION LOG ({history.length})</h2>
					<div class="history-actions">
						<button class="btn-sm" onclick={() => showHistory = !showHistory}>
							{showHistory ? 'HIDE' : 'SHOW'}
						</button>
						<button class="btn-sm btn-sm-red" onclick={clearHistory}>CLEAR</button>
					</div>
				</div>
				{#if showHistory}
					<div class="history-list">
						{#each history as h}
							<a href={h.url} target="_blank" rel="noopener noreferrer" class="history-item">
								<span class="h-genre">{h.genre}</span>
								<span class="h-title">{h.title}</span>
							</a>
						{/each}
					</div>
				{/if}
			</section>
		{/if}
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

	/* genre chips */
	.genre-grid { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.5rem; }
	.genre-chip {
		padding: .45rem 1rem;
		background: rgba(6,6,13,.8);
		border: 1px solid rgba(0,240,255,.15);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: .75rem;
		letter-spacing: 1px;
		cursor: pointer;
		transition: all .25s ease;
	}
	.genre-chip:hover {
		border-color: var(--cyan);
		color: var(--cyan);
		box-shadow: 0 0 10px rgba(0,240,255,.15);
	}
	.genre-chip.selected {
		border-color: var(--cyan);
		color: var(--cyan);
		background: rgba(0,240,255,.08);
		box-shadow: 0 0 14px rgba(0,240,255,.25);
	}

	/* action buttons */
	.action-row { display: flex; gap: .6rem; flex-wrap: wrap; }
	.btn { padding: .55rem 1.4rem; background: transparent; border: 1px solid var(--cyan); color: var(--cyan); font-family: var(--font-mono); font-size: .78rem; letter-spacing: 1px; cursor: pointer; transition: all .25s ease; }
	.btn:hover { background: rgba(0,240,255,.1); box-shadow: 0 0 14px rgba(0,240,255,.3); }
	.btn:disabled { opacity: .4; cursor: not-allowed; }
	.btn-main { background: rgba(0,240,255,.08); font-weight: bold; }
	.btn-alt { border-color: var(--yellow); color: var(--yellow); }
	.btn-alt:hover { background: rgba(249,240,2,.08); box-shadow: 0 0 14px rgba(249,240,2,.25); }

	/* loading */
	.loading-bar { height: 3px; background: rgba(0,240,255,.1); margin-bottom: .6rem; overflow: hidden; }
	.loading-inner { height: 100%; width: 40%; background: var(--cyan); animation: loadSlide 1.2s ease infinite; }
	@keyframes loadSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
	.loading-text { font-family: var(--font-mono); font-size: .75rem; color: var(--cyan); letter-spacing: 1px; margin-bottom: 1.5rem; animation: blink 1s step-end infinite; }
	@keyframes blink { 50% { opacity: .3; } }

	/* error */
	.error-msg { font-family: var(--font-mono); font-size: .82rem; color: var(--magenta); padding: 1rem; border: 1px solid rgba(255,42,109,.3); background: rgba(255,42,109,.05); margin-bottom: 1.5rem; }

	/* article cards */
	.articles { display: flex; flex-direction: column; gap: 1rem; }
	.article-card {
		display: flex;
		gap: 1.2rem;
		padding: 1.2rem;
		background: rgba(6,6,13,.6);
		border: 1px solid rgba(0,240,255,.1);
		text-decoration: none;
		color: var(--text-primary);
		transition: all .3s ease;
	}
	.article-card:hover {
		border-color: var(--cyan);
		box-shadow: 0 0 20px rgba(0,240,255,.15);
		transform: translateX(4px);
	}
	.article-thumb {
		flex-shrink: 0;
		width: 120px;
		height: 120px;
		overflow: hidden;
		border: 1px solid rgba(0,240,255,.15);
	}
	.article-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(.8) brightness(.9);
		transition: filter .3s ease;
	}
	.article-card:hover .article-thumb img { filter: saturate(1) brightness(1); }
	.article-body { flex: 1; display: flex; flex-direction: column; gap: .4rem; min-width: 0; }
	.article-title { font-family: var(--font-display); font-size: 1.1rem; color: var(--cyan); letter-spacing: 1px; margin: 0; }
	.article-genre { font-family: var(--font-mono); font-size: .65rem; color: var(--magenta); letter-spacing: 1.5px; text-transform: uppercase; }
	.article-extract {
		font-size: .85rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.article-link { font-family: var(--font-mono); font-size: .7rem; color: var(--yellow); letter-spacing: 1px; margin-top: auto; transition: letter-spacing .3s ease; }
	.article-card:hover .article-link { letter-spacing: 2px; }

	/* history */
	.history-panel { border-color: rgba(249,240,2,.12); }
	.history-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .5rem; }
	.history-header .panel-title { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
	.history-actions { display: flex; gap: .4rem; }
	.btn-sm {
		padding: .25rem .6rem;
		background: transparent;
		border: 1px solid var(--yellow);
		color: var(--yellow);
		font-family: var(--font-mono);
		font-size: .6rem;
		letter-spacing: 1px;
		cursor: pointer;
		transition: all .25s ease;
	}
	.btn-sm:hover { background: rgba(249,240,2,.08); }
	.btn-sm-red { border-color: var(--magenta); color: var(--magenta); }
	.btn-sm-red:hover { background: rgba(255,42,109,.08); }

	.history-list { display: flex; flex-direction: column; gap: .3rem; margin-top: 1rem; max-height: 300px; overflow-y: auto; }
	.history-item {
		display: flex;
		align-items: center;
		gap: .8rem;
		padding: .4rem .6rem;
		background: rgba(6,6,13,.5);
		border: 1px solid rgba(0,240,255,.06);
		text-decoration: none;
		transition: border-color .2s;
	}
	.history-item:hover { border-color: rgba(0,240,255,.25); }
	.h-genre { font-family: var(--font-mono); font-size: .6rem; color: var(--magenta); letter-spacing: 1px; min-width: 90px; text-transform: uppercase; }
	.h-title { font-family: var(--font-mono); font-size: .8rem; color: var(--cyan); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

	.results-panel { border-color: rgba(0,255,65,.2); }

	@media (max-width: 768px) {
		main { padding: 100px 1.2rem 3rem; }
		.title { font-size: 1.6rem; }
		.article-card { flex-direction: column; }
		.article-thumb { width: 100%; height: 160px; }
	}
</style>
