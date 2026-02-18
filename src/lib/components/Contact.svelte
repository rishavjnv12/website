<script lang="ts">
	let messageSent = $state(false);

	function handleCall() {
		window.location.href = 'tel:+916200463177';
	}

	function handleEmail() {
		window.location.href = 'mailto:rishavjnv18@gmail.com?subject=Hello%20Rishav&body=Hey%20Rishav%2C%0A%0A';
	}

	function handleSMS() {
		window.location.href = 'sms:+916200463177';
	}

	function handleWhatsApp() {
		window.open('https://wa.me/916200463177', '_blank');
	}

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

<section id="contact">
	<div class="section-wrapper" use:observeVisibility>
		<div class="section-header">
			<span class="section-number">05</span>
			<h2>ESTABLISH<span class="dot">_</span>CONNECTION</h2>
			<div class="header-line"></div>
		</div>

		<div class="contact-grid">
			<div class="contact-info">
				<div class="info-terminal">
					<div class="terminal-header">
						<span class="terminal-dot red"></span>
						<span class="terminal-dot yellow"></span>
						<span class="terminal-dot green"></span>
						<span class="terminal-title">contact_protocols</span>
					</div>
					<div class="terminal-body">
						<p class="terminal-line"><span class="prompt">$</span> echo $CONTACT_INFO</p>
						<br>
						<p class="info-line">
							<span class="label">EMAIL:</span>
							<a href="mailto:rishavjnv18@gmail.com">rishavjnv18@gmail.com</a>
						</p>
						<p class="info-line">
							<span class="label">PHONE:</span>
							<a href="tel:+916200463177">+91 6200463177</a>
						</p>
						<p class="info-line">
							<span class="label">LINKEDIN:</span>
							<a href="https://www.linkedin.com/in/rishavjnv12/" target="_blank">/in/rishav-kumar</a>
						</p>
						<p class="info-line">
							<span class="label">LOCATION:</span>
							<span class="value">India</span>
						</p>
					</div>
				</div>

				<div class="action-buttons">
					<button class="action-btn call" onclick={handleCall}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
						<span>CALL_ME</span>
					</button>
					<button class="action-btn message" onclick={handleSMS}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
						<span>SMS</span>
					</button>
					<button class="action-btn email" onclick={handleEmail}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
						<span>EMAIL</span>
					</button>
					<button class="action-btn whatsapp" onclick={handleWhatsApp}>
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						<span>WHATSAPP</span>
					</button>
				</div>
			</div>

			<div class="contact-form">
				<div class="form-header">
					<span class="form-title">// SEND_TRANSMISSION</span>
				</div>

				{#if messageSent}
					<div class="success-message">
						<div class="success-icon">[OK]</div>
						<p>TRANSMISSION_SENT_SUCCESSFULLY</p>
						<p class="success-sub">Response ETA: 24-48 hours</p>
						<button class="reset-btn" onclick={() => messageSent = false}>SEND_ANOTHER</button>
					</div>
				{:else}
					<form
						onsubmit={(e) => {
							e.preventDefault();
							const form = e.target as HTMLFormElement;
							const formData = new FormData(form);
							const name = formData.get('name') as string;
							const email = formData.get('email') as string;
							const message = formData.get('message') as string;
							window.location.href = `mailto:rishavjnv18@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
							messageSent = true;
						}}
					>
						<div class="form-group">
							<label for="name">IDENTIFIER_</label>
							<input type="text" id="name" name="name" placeholder="Enter your name" required />
						</div>
						<div class="form-group">
							<label for="email">EMAIL_ADDR_</label>
							<input type="email" id="email" name="email" placeholder="Enter your email" required />
						</div>
						<div class="form-group">
							<label for="message">MESSAGE_</label>
							<textarea id="message" name="message" rows="5" placeholder="Your message here..." required></textarea>
						</div>
						<button type="submit" class="submit-btn">
							<span class="btn-text">TRANSMIT_MESSAGE</span>
							<span class="btn-arrow">&gt;&gt;</span>
						</button>
					</form>
				{/if}
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

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
	}

	/* Info Terminal */
	.info-terminal {
		background: var(--dark-card);
		border: 1px solid var(--border-glow);
		border-radius: 8px;
		overflow: hidden;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0.8rem 1rem;
		background: rgba(0, 240, 255, 0.05);
		border-bottom: 1px solid var(--border-glow);
	}

	.terminal-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.terminal-dot.red { background: #ff5f56; }
	.terminal-dot.yellow { background: #ffbd2e; }
	.terminal-dot.green { background: #27c93f; }

	.terminal-title {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-muted);
		margin-left: 0.5rem;
	}

	.terminal-body {
		padding: 1.5rem;
	}

	.terminal-line {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.prompt { color: var(--cyan); }

	.info-line {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-top: 0.5rem;
		display: flex;
		gap: 0.8rem;
	}

	.label {
		color: var(--magenta);
		flex-shrink: 0;
	}

	.info-line a {
		color: var(--cyan);
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.info-line a:hover {
		text-shadow: 0 0 10px var(--cyan);
	}

	.value { color: var(--text-muted); }

	/* Action Buttons */
	.action-buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		padding: 1rem;
		background: var(--dark-card);
		border: 1px solid rgba(0, 240, 255, 0.15);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 2px;
		cursor: pointer;
		transition: all 0.3s ease;
		clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
	}

	.action-btn svg {
		width: 18px;
		height: 18px;
	}

	.action-btn.call:hover {
		border-color: var(--cyan);
		color: var(--cyan);
		box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
		background: rgba(0, 240, 255, 0.05);
	}

	.action-btn.message:hover {
		border-color: var(--yellow);
		color: var(--yellow);
		box-shadow: 0 0 20px rgba(249, 240, 2, 0.2);
		background: rgba(249, 240, 2, 0.05);
	}

	.action-btn.email:hover {
		border-color: var(--magenta);
		color: var(--magenta);
		box-shadow: 0 0 20px rgba(255, 42, 109, 0.2);
		background: rgba(255, 42, 109, 0.05);
	}

	.action-btn.whatsapp:hover {
		border-color: #25d366;
		color: #25d366;
		box-shadow: 0 0 20px rgba(37, 211, 102, 0.2);
		background: rgba(37, 211, 102, 0.05);
	}

	/* Form */
	.contact-form {
		background: var(--dark-card);
		border: 1px solid rgba(0, 240, 255, 0.1);
		clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
	}

	.form-header {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid rgba(0, 240, 255, 0.1);
	}

	.form-title {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		letter-spacing: 2px;
	}

	form {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--cyan);
		letter-spacing: 2px;
	}

	input, textarea {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 240, 255, 0.15);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		padding: 0.8rem 1rem;
		outline: none;
		transition: all 0.3s ease;
	}

	input:focus, textarea:focus {
		border-color: var(--cyan);
		box-shadow: 0 0 15px rgba(0, 240, 255, 0.1), inset 0 0 15px rgba(0, 240, 255, 0.02);
	}

	input::placeholder, textarea::placeholder {
		color: rgba(122, 122, 158, 0.5);
	}

	textarea {
		resize: vertical;
		min-height: 100px;
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
		background: transparent;
		border: 1px solid var(--cyan);
		color: var(--cyan);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 3px;
		cursor: pointer;
		transition: all 0.3s ease;
		clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
	}

	.submit-btn:hover {
		background: rgba(0, 240, 255, 0.08);
		box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
		text-shadow: 0 0 10px var(--cyan);
	}

	.btn-arrow {
		transition: transform 0.3s ease;
	}

	.submit-btn:hover .btn-arrow {
		transform: translateX(4px);
	}

	/* Success */
	.success-message {
		padding: 3rem 1.5rem;
		text-align: center;
	}

	.success-icon {
		font-family: var(--font-mono);
		font-size: 2rem;
		color: #27c93f;
		margin-bottom: 1rem;
		text-shadow: 0 0 20px rgba(39, 201, 63, 0.5);
	}

	.success-message p {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-primary);
		letter-spacing: 2px;
	}

	.success-sub {
		color: var(--text-muted) !important;
		font-size: 0.75rem !important;
		margin-top: 0.5rem;
	}

	.reset-btn {
		margin-top: 1.5rem;
		padding: 0.6rem 1.5rem;
		background: none;
		border: 1px solid var(--cyan);
		color: var(--cyan);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 2px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.reset-btn:hover {
		background: rgba(0, 240, 255, 0.08);
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
