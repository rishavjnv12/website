<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';

	interface Command {
		label: string;
		hint: string;
		run: () => void;
	}

	const nav = (path: string) => () => goto(path, { noScroll: path.includes('#') });
	const commands: Command[] = [
		{ label: 'Go to Hero', hint: 'section', run: nav('/#hero') },
		{ label: 'Go to About', hint: 'section', run: nav('/#about') },
		{ label: 'Go to Experience', hint: 'section', run: nav('/#experience') },
		{ label: 'Go to Skills', hint: 'section', run: nav('/#skills') },
		{ label: 'Go to Achievements', hint: 'section', run: nav('/#achievements') },
		{ label: 'Go to Contact', hint: 'section', run: nav('/#contact') },
		{ label: 'Tools', hint: 'page', run: nav('/tools') },
		{ label: 'Epoch Converter', hint: 'tool', run: nav('/tools/epoch-converter') },
		{ label: 'JSON Formatter', hint: 'tool', run: nav('/tools/json-formatter') },
		{ label: 'UUID Generator', hint: 'tool', run: nav('/tools/uuid-generator') },
		{ label: 'Color Converter', hint: 'tool', run: nav('/tools/color-converter') },
		{ label: 'Test Data Generator', hint: 'tool', run: nav('/tools/test-data-generator') },
		{ label: 'Wiki Explorer', hint: 'tool', run: nav('/tools/wiki-explorer') },
		{ label: 'Virat Kohli', hint: 'tool', run: nav('/tools/virat-kohli') },
		{ label: 'Engage Overdrive', hint: 'secret', run: () => window.dispatchEvent(new Event('overdrive')) },
		{ label: 'Open Resume', hint: 'file', run: () => window.open('/resume.pdf', '_blank') },
		{ label: 'LinkedIn', hint: 'external', run: () => window.open('https://www.linkedin.com/in/rishavjnv12/', '_blank') }
	];

	let open = $state(false);
	let query = $state('');
	let selected = $state(0);
	let input = $state<HTMLInputElement>();

	// Subsequence match, so "jf" finds "JSON Formatter"
	const matches = (label: string, q: string) => {
		const l = label.toLowerCase();
		let i = 0;
		for (const c of q.toLowerCase()) {
			i = l.indexOf(c, i);
			if (i === -1) return false;
			i++;
		}
		return true;
	};
	const results = $derived(commands.filter((c) => matches(c.label, query.trim())));

	async function show() {
		open = true;
		query = '';
		selected = 0;
		await tick();
		input?.focus();
	}
	const hide = () => (open = false);

	function choose(cmd?: Command) {
		if (!cmd) return;
		hide();
		cmd.run();
	}

	function onKey(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			open ? hide() : show();
			return;
		}
		if (!open) return;
		if (e.key === 'Escape') hide();
		else if (e.key === 'ArrowDown') {
			e.preventDefault();
			selected = (selected + 1) % Math.max(results.length, 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selected = (selected - 1 + results.length) % Math.max(results.length, 1);
		} else if (e.key === 'Enter') choose(results[selected]);
	}
</script>

<svelte:window onkeydown={onKey} />

<button class="trigger" onclick={show} aria-label="Open command palette">
	<span>&gt;_</span> <kbd>Ctrl K</kbd>
</button>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div class="backdrop" onclick={hide}>
		<div class="panel" role="dialog" aria-modal="true" aria-label="Command palette" tabindex="-1" onclick={(e) => e.stopPropagation()}>
			<div class="input-row">
				<span class="prompt">&gt;</span>
				<input
					bind:this={input}
					bind:value={query}
					oninput={() => (selected = 0)}
					placeholder="Jump to a section, tool or link..."
					spellcheck="false"
					autocomplete="off"
				/>
				<kbd>ESC</kbd>
			</div>
			<ul>
				{#each results as cmd, i (cmd.label)}
					<li>
						<button
							class:active={i === selected}
							onmousemove={() => (selected = i)}
							onclick={() => choose(cmd)}
						>
							<span>{cmd.label}</span>
							<span class="hint">{cmd.hint}</span>
						</button>
					</li>
				{:else}
					<li class="empty">NO_MATCH_FOUND</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	.trigger {
		position: fixed;
		right: 1.2rem;
		bottom: 1.2rem;
		z-index: 1500;
		display: flex;
		gap: 0.6rem;
		align-items: center;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--cyan);
		background: rgba(10, 10, 24, 0.85);
		border: 1px solid var(--border-glow);
		padding: 0.5rem 0.8rem;
		cursor: pointer;
		backdrop-filter: blur(8px);
		transition: box-shadow 0.3s, border-color 0.3s;
	}
	.trigger:hover {
		border-color: var(--cyan);
		box-shadow: 0 0 18px rgba(0, 240, 255, 0.35);
	}
	kbd {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--text-muted);
		border: 1px solid rgba(122, 122, 158, 0.4);
		padding: 0.1rem 0.4rem;
	}
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 3000;
		background: rgba(6, 6, 13, 0.7);
		backdrop-filter: blur(6px);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 14vh 1rem 0;
		animation: fade 0.15s ease;
	}
	.panel {
		width: min(560px, 100%);
		background: var(--dark-card);
		border: 1px solid var(--cyan);
		box-shadow: 0 0 40px rgba(0, 240, 255, 0.25), 0 0 80px rgba(255, 42, 109, 0.1);
		animation: pop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.input-row {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.9rem 1.1rem;
		border-bottom: 1px solid var(--border-glow);
	}
	.prompt { color: var(--magenta); font-family: var(--font-mono); text-shadow: 0 0 8px var(--magenta); }
	input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 1rem;
	}
	ul { list-style: none; max-height: 50vh; overflow-y: auto; padding: 0.4rem 0; }
	li button {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0.65rem 1.1rem;
		background: none;
		border: none;
		border-left: 2px solid transparent;
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		cursor: pointer;
		text-align: left;
	}
	li button.active {
		background: rgba(0, 240, 255, 0.08);
		border-left-color: var(--cyan);
		color: var(--cyan);
	}
	.hint { color: var(--text-muted); font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; }
	.empty { padding: 1rem 1.1rem; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.8rem; }
	@keyframes fade { from { opacity: 0; } }
	@keyframes pop { from { opacity: 0; transform: translateY(-12px) scale(0.98); } }
	@media (max-width: 768px) { .trigger kbd { display: none; } }
</style>
