<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);
	let sectionEl: HTMLElement;
	let activeIndex = $state(0);

	const experiences = [
		{
			company: 'TEMPLE',
			url: 'https://www.temple.com/',
			role: 'iOS Developer',
			period: 'JAN 2026 - PRESENT',
			description: 'A startup by Deepinder Goyal, founder of Zomato.',
			points: [
				'Building the iOS application from the ground up for a new venture by Zomato\'s founder.',
				'Architecting scalable mobile solutions using Swift, SwiftUI, and modern iOS frameworks.',
				'Collaborating closely with the founding team to define product direction and user experience.',
				'Implementing cutting-edge iOS features and performance optimizations for the platform.'
			],
			tech: ['SWIFT', 'SWIFTUI', 'COMBINE', 'MVI'],
			color: 'var(--yellow)'
		},
		{
			company: 'NAVI TECHNOLOGIES',
			url: 'https://navi.com/',
			role: 'SDE-II',
			period: 'AUG 2024 - DEC 2025',
			description: 'Centralized growth team - Homepage, Auth, KYC.',
			points: [
				'Part of the centralized growth team managing homepage, user profiles, authentication, and KYC processes.',
				'Independently developed an end-to-end KYC flow adaptable for Home Loans, Cash Loans, Insurance and Investments.',
				'Led development of "Check Your CIBIL Score" feature, introducing SwiftUI and MVI Architecture.',
				'Delivered homepage updates and experiments using UITron (in-house dynamic UI framework), often on 2-3 hour notice.',
				'Mentored three freshers by onboarding them and guiding successful feature delivery.'
			],
			tech: ['SWIFT', 'UIKIT', 'SWIFTUI', 'RXSWIFT', 'COMBINE', 'MVVM', 'MVI'],
			color: 'var(--cyan)'
		},
		{
			company: 'NAVI TECHNOLOGIES',
			url: 'https://navi.com/',
			role: 'SDE-I',
			period: 'SEP 2022 - JUL 2024',
			description: 'Home Loans, AMC, UPI products.',
			points: [
				'Developed vital features for NAVI Home Loan including upgrade offer, close loans, and foreclose loan with complete ownership.',
				'Deeply involved in the launch of NAVI AMC - created multiple screens and end-to-end sell flow.',
				'Implemented UITron (in-house dynamic UI) and used it to revamp the homepage.',
				'Contributed to the initial launch of Navi UPI by developing key screens and resolving last-minute bugs.'
			],
			tech: ['SWIFT', 'UIKIT', 'RXSWIFT', 'COMBINE', 'MVVM', 'SNAPKIT'],
			color: 'var(--cyan)'
		},
		{
			company: 'JOSH TECHNOLOGY GROUP',
			url: '',
			role: 'Software Development Engineer Intern',
			period: 'FEB 2022 - AUG 2022',
			description: 'Quicktest hiring platform.',
			points: [
				'Worked on Quicktest, a widely used in-house hiring platform for companies and universities.',
				'Involved in writing test cases for the entire legacy Quicktest backend.'
			],
			tech: ['GO', 'GORM', 'ANGULAR', 'TYPESCRIPT'],
			color: 'var(--magenta)'
		}
	];
</script>

<section id="experience" bind:this={sectionEl}>
	<div class="section-wrapper" class:visible use:observeVisibility>
		<div class="section-header">
			<span class="section-number">02</span>
			<h2>EXPERIENCE<span class="dot">_</span>LOG</h2>
			<div class="header-line"></div>
		</div>

		<div class="exp-layout">
			<div class="exp-tabs">
				{#each experiences as exp, i}
					<button
						class="exp-tab"
						class:active={activeIndex === i}
						onclick={() => activeIndex = i}
						style="--accent: {exp.color}"
					>
						<span class="tab-indicator"></span>
						<span class="tab-text">{exp.company}</span>
					</button>
				{/each}
			</div>

			<div class="exp-content">
				{#each experiences as exp, i}
					{#if activeIndex === i}
						<div class="exp-detail" style="--accent: {exp.color}">
							<div class="exp-header">
								<h3>{exp.role} <span class="at">@
									{#if exp.url}
										<a href={exp.url} target="_blank" rel="noopener noreferrer" class="company cyber-link">{exp.company}</a>
									{:else}
										<span class="company">{exp.company}</span>
									{/if}
								</span></h3>
								<span class="exp-period">{exp.period}</span>
							</div>
							<p class="exp-desc">{exp.description}</p>
							<ul>
								{#each exp.points as point}
									<li>
										<span class="bullet">&gt;</span>
										{point}
									</li>
								{/each}
							</ul>
							<div class="tech-tags">
								{#each exp.tech as tech}
									<span class="tag">{tech}</span>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>

<svelte:document />

<script lang="ts" module>
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
		return {
			destroy() { observer.disconnect(); }
		};
	}
</script>

<style>
	section {
		padding: 6rem 0;
	}

	.section-wrapper {
		opacity: 0;
		transform: translateY(40px);
		transition: all 0.8s ease;
	}

	.section-wrapper.visible,
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

	.exp-layout {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 2rem;
	}

	.exp-tabs {
		display: flex;
		flex-direction: column;
		border-left: 2px solid rgba(0, 240, 255, 0.1);
	}

	.exp-tab {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 1rem 1.5rem;
		background: none;
		border: none;
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		letter-spacing: 1px;
		text-align: left;
		position: relative;
		transition: all 0.3s ease;
	}

	.exp-tab:hover {
		color: var(--accent);
		background: rgba(0, 240, 255, 0.03);
	}

	.exp-tab.active {
		color: var(--accent);
	}

	.tab-indicator {
		position: absolute;
		left: -2px;
		top: 0;
		width: 2px;
		height: 100%;
		background: transparent;
		transition: background 0.3s ease;
	}

	.exp-tab.active .tab-indicator {
		background: var(--accent);
		box-shadow: 0 0 10px var(--accent);
	}

	.exp-content {
		min-height: 400px;
	}

	.exp-detail {
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateX(10px); }
		to { opacity: 1; transform: translateX(0); }
	}

	.exp-header h3 {
		font-family: var(--font-body);
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.at { color: var(--text-muted); }
	.company { color: var(--accent); }

	.exp-period {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		letter-spacing: 2px;
		margin-top: 0.3rem;
		display: block;
	}

	.exp-desc {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-top: 0.8rem;
		padding: 0.5rem 1rem;
		border-left: 2px solid var(--accent);
		background: rgba(0, 240, 255, 0.02);
	}

	ul {
		list-style: none;
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	li {
		font-size: 0.95rem;
		color: var(--text-muted);
		line-height: 1.6;
		display: flex;
		gap: 0.8rem;
	}

	.bullet {
		color: var(--accent);
		font-family: var(--font-mono);
		flex-shrink: 0;
	}

	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.5rem;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		padding: 0.3rem 0.8rem;
		color: var(--accent);
		border: 1px solid rgba(0, 240, 255, 0.2);
		background: rgba(0, 240, 255, 0.05);
		letter-spacing: 1px;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (max-width: 768px) {
		.exp-layout {
			grid-template-columns: 1fr;
		}

		.exp-tabs {
			flex-direction: row;
			overflow-x: auto;
			border-left: none;
			border-bottom: 2px solid rgba(0, 240, 255, 0.1);
		}

		.tab-indicator {
			left: 0;
			top: auto;
			bottom: -2px;
			width: 100% !important;
			height: 2px !important;
		}

		.exp-content {
			min-height: auto;
		}
	}
</style>
