<script lang="ts">
	const achievements = [
		{
			icon: '>>',
			title: 'Codeforces Round 760 (Div 3)',
			detail: 'Ranked 180 out of 27,000 participants',
			color: 'var(--cyan)'
		},
		{
			icon: '++',
			title: '1000+ DSA Problems',
			detail: 'Solved across multiple competitive programming platforms',
			color: 'var(--yellow)'
		},
		{
			icon: '**',
			title: 'Codeforces Rounds 751 & 728 (Div 2)',
			detail: 'Ranked 543 and 570 out of 20,000 participants',
			color: 'var(--magenta)'
		},
		{
			icon: '##',
			title: 'Consistent Top Performer',
			detail: 'Ranked under 2000 in 14 regular Codeforces rounds (20,000+ participants)',
			color: 'var(--cyan)'
		}
	];

	const education = [
		{
			degree: 'B.Tech in Computer Science',
			school: 'Heritage Institute of Technology, Kolkata',
			period: '2018 - 2022',
			score: 'CGPA: 8.0'
		},
		{
			degree: 'Intermediate (Class XII)',
			school: 'Jawahar Navodaya Vidyalaya, Begusarai',
			period: '2016 - 2017',
			score: '86.2%'
		},
		{
			degree: 'Class X (CBSE)',
			school: 'Jawahar Navodaya Vidyalaya, Begusarai',
			period: '2015',
			score: 'CGPA: 9.8'
		}
	];

	function observeVisibility(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) node.classList.add('visible');
			},
			{ threshold: 0.1 }
		);
		observer.observe(node);
		return { destroy() { observer.disconnect(); } };
	}
</script>

<section id="achievements">
	<div class="section-wrapper" use:observeVisibility>
		<div class="section-header">
			<span class="section-number">04</span>
			<h2>ACHIEVEMENT<span class="dot">_</span>UNLOCKED</h2>
			<div class="header-line"></div>
		</div>

		<div class="achievements-grid">
			{#each achievements as a, i}
				<div class="achievement-card" style="--accent: {a.color}; animation-delay: {i * 0.1}s">
					<div class="ach-icon">{a.icon}</div>
					<div class="ach-content">
						<h3>{a.title}</h3>
						<p>{a.detail}</p>
					</div>
					<div class="ach-glow"></div>
				</div>
			{/each}
		</div>

		<div class="edu-section">
			<h3 class="edu-title">
				<span class="bracket">[</span> EDUCATION_LOG <span class="bracket">]</span>
			</h3>
			<div class="edu-timeline">
				{#each education as edu, i}
					<div class="edu-item" style="animation-delay: {i * 0.15}s">
						<div class="edu-marker">
							<div class="edu-dot"></div>
							{#if i < education.length - 1}
								<div class="edu-line"></div>
							{/if}
						</div>
						<div class="edu-content">
							<h4>{edu.degree}</h4>
							<p class="edu-school">{edu.school}</p>
							<div class="edu-meta">
								<span>{edu.period}</span>
								<span class="edu-score">{edu.score}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	section {
		padding: 6rem 0;
	}

	.section-wrapper {
		opacity: 0;
		transform: translateY(40px);
		transition: all 0.8s ease;
	}

	:global(.section-wrapper.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.section-number {
		font-family: var(--font-display);
		font-size: 1rem;
		color: var(--cyan);
		font-weight: 700;
	}

	h2 {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		letter-spacing: 4px;
	}

	.dot { color: var(--magenta); animation: blink 1s infinite; }

	.header-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--border-glow), transparent);
	}

	.achievements-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin-bottom: 4rem;
	}

	.achievement-card {
		background: var(--dark-card);
		border: 1px solid rgba(0, 240, 255, 0.1);
		padding: 1.5rem;
		display: flex;
		gap: 1.2rem;
		align-items: flex-start;
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
		animation: slideUp 0.5s ease both;
		clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%);
	}

	@keyframes slideUp {
		from { opacity: 0; transform: translateY(15px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.achievement-card:hover {
		border-color: var(--accent);
		box-shadow: 0 0 25px rgba(0, 240, 255, 0.1);
	}

	.ach-glow {
		position: absolute;
		top: -50%;
		right: -50%;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle, var(--accent), transparent 70%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.achievement-card:hover .ach-glow {
		opacity: 0.03;
	}

	.ach-icon {
		font-family: var(--font-mono);
		font-size: 1.5rem;
		color: var(--accent);
		background: rgba(0, 240, 255, 0.08);
		padding: 0.5rem;
		border-radius: 4px;
		flex-shrink: 0;
		text-shadow: 0 0 15px var(--accent);
	}

	.ach-content h3 {
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.3rem;
	}

	.ach-content p {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.edu-section {
		margin-top: 2rem;
	}

	.edu-title {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--text-primary);
		letter-spacing: 3px;
		margin-bottom: 2rem;
	}

	.bracket { color: var(--cyan); }

	.edu-timeline {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.edu-item {
		display: flex;
		gap: 1.5rem;
		animation: slideUp 0.5s ease both;
	}

	.edu-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}

	.edu-dot {
		width: 12px;
		height: 12px;
		border: 2px solid var(--cyan);
		border-radius: 50%;
		background: var(--dark-bg);
		box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
		flex-shrink: 0;
	}

	.edu-line {
		width: 2px;
		flex: 1;
		background: linear-gradient(180deg, var(--cyan), transparent);
		min-height: 40px;
	}

	.edu-content {
		padding-bottom: 2rem;
	}

	.edu-content h4 {
		font-family: var(--font-body);
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.edu-school {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--cyan);
		margin-top: 0.3rem;
	}

	.edu-meta {
		display: flex;
		gap: 1.5rem;
		margin-top: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-muted);
		letter-spacing: 1px;
	}

	.edu-score {
		color: var(--yellow);
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (max-width: 768px) {
		.achievements-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
