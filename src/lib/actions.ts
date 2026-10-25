import type { Action } from 'svelte/action';

const reducedMotion = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 3D tilt toward the pointer, plus a --mx/--my spotlight position for CSS. */
export const tilt: Action<HTMLElement, number | undefined> = (node, max = 8) => {
	if (reducedMotion() || matchMedia('(hover: none)').matches) return;

	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width;
		const py = (e.clientY - r.top) / r.height;
		node.style.setProperty('--mx', `${px * 100}%`);
		node.style.setProperty('--my', `${py * 100}%`);
		node.style.transform = `perspective(800px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`;
	};
	const leave = () => {
		node.style.transform = '';
	};

	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy() {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
};

const GLYPHS = 'アカサタナハマヤラワ01<>[]{}#$%&*/\\|=+-';

/** Decrypt the element's text from random glyphs on first view and on hover. */
export const scramble: Action<HTMLElement> = (node) => {
	if (reducedMotion()) return;
	const texts = (() => {
		const out: { node: Text; text: string }[] = [];
		const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
		while (walker.nextNode()) {
			const t = walker.currentNode as Text;
			if (t.data.trim()) out.push({ node: t, text: t.data });
		}
		return out;
	})();
	let raf = 0;

	const run = () => {
		cancelAnimationFrame(raf);
		const start = performance.now();
		const total = texts.reduce((n, t) => n + t.text.length, 0);
		const step = (now: number) => {
			// Characters lock in left to right over ~900ms
			let locked = ((now - start) / 900) * total;
			for (const t of texts) {
				t.node.data = [...t.text]
					.map((c, i) => (c === ' ' || i < locked ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
					.join('');
				locked -= t.text.length;
			}
			if (now - start < 900) raf = requestAnimationFrame(step);
			else texts.forEach((t) => (t.node.data = t.text));
		};
		raf = requestAnimationFrame(step);
	};

	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			run();
			io.disconnect();
		},
		{ threshold: 0.6 }
	);
	io.observe(node);
	node.addEventListener('pointerenter', run);
	return {
		destroy() {
			io.disconnect();
			cancelAnimationFrame(raf);
			node.removeEventListener('pointerenter', run);
		}
	};
};

/** Pull the element toward the pointer while it hovers nearby. */
export const magnetic: Action<HTMLElement, number | undefined> = (node, strength = 0.35) => {
	if (reducedMotion() || matchMedia('(hover: none)').matches) return;
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		const dx = e.clientX - (r.left + r.width / 2);
		const dy = e.clientY - (r.top + r.height / 2);
		node.style.translate = `${dx * strength}px ${dy * strength}px`;
	};
	const leave = () => (node.style.translate = '');
	node.style.transition = 'all 0.3s ease, translate 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy() {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
};
