<script lang="ts">
	const skillCategories = [
		{
			title: 'LANGUAGES',
			icon: '{ }',
			skills: [
				{ name: 'Swift', level: 95 },
				{ name: 'C/C++', level: 70 },
				{ name: 'Python', level: 60 },
				{ name: 'TypeScript', level: 65 },
				{ name: 'Go', level: 45 }
			]
		},
		{
			title: 'iOS_FRAMEWORKS',
			icon: '[ ]',
			skills: [
				{ name: 'UIKit', level: 92 },
				{ name: 'SwiftUI', level: 85 },
				{ name: 'Combine', level: 80 },
				{ name: 'RxSwift', level: 78 },
				{ name: 'SnapKit', level: 85 }
			]
		},
		{
			title: 'ARCHITECTURE',
			icon: '< >',
			skills: [
				{ name: 'MVVM', level: 90 },
				{ name: 'MVI', level: 85 },
				{ name: 'Clean Architecture', level: 75 },
				{ name: 'Modular Design', level: 70 }
			]
		},
		{
			title: 'TOOLS_&_OTHER',
			icon: '# _',
			skills: [
				{ name: 'Git / GitHub', level: 88 },
				{ name: 'SQL', level: 65 },
				{ name: 'DSA', level: 90 },
				{ name: 'CI/CD', level: 60 }
			]
		}
	];

	function observeVisibility(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					node.classList.add('visible');
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(node);
		return { destroy() { observer.disconnect(); } };
	}
</script>

<section id="skills">
	<div class="section-wrapper" use:observeVisibility>
		<div class="section-header">
			<span class="section-number">03</span>
			<h2>SKILL<span class="dot">_</span>MATRIX</h2>
			<div class="header-line"></div>
		</div>

		<div class="skills-grid">
			{#each skillCategories as category, catIdx}
				<div class="skill-card" style="animation-delay: {catIdx * 0.15}s">
					<div class="card-header">
						<span class="card-icon">{category.icon}</span>
						<h3>{category.title}</h3>
					</div>
					<div class="card-body">
						{#each category.skills as skill}
							<div class="skill-row">
								<div class="skill-info">
									<span class="skill-name">{skill.name}</span>
									<span class="skill-percent">{skill.level}%</span>
								</div>
								<div class="skill-bar">
									<div
										class="skill-fill"
										style="width: {skill.level}%; --hue: {(catIdx * 60) + 180}"
									></div>
								</div>
							</div>
						{/each}
					</div>
					<div class="card-corner tl"></div>
					<div class="card-corner tr"></div>
					<div class="card-corner bl"></div>
					<div class="card-corner br"></div>
				</div>
			{/each}
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

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	.skill-card {
		background: var(--dark-card);
		border: 1px solid rgba(0, 240, 255, 0.1);
		padding: 1.5rem;
		position: relative;
		transition: all 0.4s ease;
		animation: slideUp 0.6s ease both;
	}

	@keyframes slideUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.skill-card:hover {
		border-color: var(--cyan);
		box-shadow:
			0 0 30px rgba(0, 240, 255, 0.2),
			0 0 60px rgba(0, 240, 255, 0.05),
			inset 0 0 40px rgba(0, 240, 255, 0.03);
		background: linear-gradient(
			135deg,
			rgba(0, 240, 255, 0.06) 0%,
			rgba(255, 42, 109, 0.04) 33%,
			rgba(249, 240, 2, 0.03) 66%,
			rgba(0, 240, 255, 0.06) 100%
		);
		background-size: 300% 300%;
		animation: slideUp 0.6s ease both, holographic 3s linear infinite;
	}

	@keyframes holographic {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	.card-corner {
		position: absolute;
		width: 12px;
		height: 12px;
		border-color: var(--cyan);
		border-style: solid;
		border-width: 0;
		transition: border-color 0.3s ease;
	}

	.skill-card:hover .card-corner {
		border-color: var(--magenta);
	}

	.card-corner.tl { top: -1px; left: -1px; border-top-width: 2px; border-left-width: 2px; }
	.card-corner.tr { top: -1px; right: -1px; border-top-width: 2px; border-right-width: 2px; }
	.card-corner.bl { bottom: -1px; left: -1px; border-bottom-width: 2px; border-left-width: 2px; }
	.card-corner.br { bottom: -1px; right: -1px; border-bottom-width: 2px; border-right-width: 2px; }

	.card-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(0, 240, 255, 0.1);
	}

	.card-icon {
		font-family: var(--font-mono);
		font-size: 1.2rem;
		color: var(--cyan);
		background: rgba(0, 240, 255, 0.08);
		padding: 0.4rem 0.6rem;
		border-radius: 4px;
	}

	h3 {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 2px;
		color: var(--text-primary);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.skill-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.skill-name {
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.skill-percent {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--cyan);
	}

	.skill-bar {
		height: 4px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 2px;
		overflow: hidden;
	}

	.skill-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--cyan), hsl(var(--hue), 100%, 60%));
		border-radius: 2px;
		box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
		transition: width 1.5s ease;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (max-width: 768px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
