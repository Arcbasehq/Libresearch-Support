<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
</script>

<footer class="border-t border-app-border bg-app-background">
	<div class="mx-auto w-full max-w-275 px-6 py-12">
		<div class="flex flex-col gap-8 sm:flex-row sm:justify-between">
			<!-- Brand -->
			<div class="max-w-xs space-y-3">
				<a href="https://libresearch.ca/" class="flex items-center gap-3">
					<div class="h-28 w-35"><Logo class="h-45 w-40" /></div>
				</a>
				<p class="text-sm leading-6 text-app-muted">
					A private search engine that puts you in control. No tracking, no profiles, no ads.
				</p>
			</div>

			<!-- Links -->
			<div class="flex gap-16">
				<div class="space-y-3">
					<p class="text-xs font-semibold tracking-widest text-app-muted uppercase">Search</p>
					<ul class="space-y-2 text-sm">
						<li>
							<a
								href="https://libresearch.ca/"
								class="text-app-muted transition hover:text-app-text">Home</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/search?q=news"
								class="text-app-muted transition hover:text-app-text">News</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/search?q=videos&t=videos"
								class="text-app-muted transition hover:text-app-text">Videos</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/search?q=images&t=images"
								class="text-app-muted transition hover:text-app-text">Images</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/syntax"
								class="text-app-muted transition hover:text-app-text">Syntax</a
							>
						</li>
					</ul>
				</div>
				<div class="space-y-3">
					<p class="text-xs font-semibold tracking-widest text-app-muted uppercase">Product</p>
					<ul class="space-y-2 text-sm">
						<li>
							<a
								href="https://libresearch.ca/about"
								class="text-app-muted transition hover:text-app-text">About</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/donate"
								class="text-app-muted transition hover:text-app-text">Donate</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/settings"
								class="text-app-muted transition hover:text-app-text">Settings</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/settings#appearance"
								class="text-app-muted transition hover:text-app-text">Themes</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/extension"
								class="text-app-muted transition hover:text-app-text">Extension</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/blog"
								class="text-app-muted transition hover:text-app-text">Blog</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/changelog"
								class="text-app-muted transition hover:text-app-text">Changelog</a
							>
						</li>
					</ul>
				</div>
				<div class="space-y-3">
					<p class="text-xs font-semibold tracking-widest text-app-muted uppercase">Company</p>
					<ul class="space-y-2 text-sm">
						<li>
							<a
								href="https://arcbase.one"
								class="text-app-muted transition hover:text-app-text"
								target="_blank">Arcbase</a
							>
						</li>
						<li>
							<a
								href="https://ai.arcbase.one"
								class="text-app-muted transition hover:text-app-text"
								target="_blank">OtterAI</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/press"
								class="text-app-muted transition hover:text-app-text">Press</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/enterprise"
								class="text-app-muted transition hover:text-app-text">Enterprise</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/contact"
								class="text-app-muted transition hover:text-app-text">Contact</a
							>
						</li>
						<li>
							<a
								href="https://support.libresearch.ca/"
								class="text-app-muted transition hover:text-app-text">Support</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/terms"
								class="text-app-muted transition hover:text-app-text">Terms</a
							>
						</li>
					</ul>
				</div>
				<div class="space-y-3">
					<p class="text-xs font-semibold tracking-widest text-app-muted uppercase">Trust</p>
					<ul class="space-y-2 text-sm">
						<li>
							<a
								href="https://libresearch.ca/privacy"
								class="text-app-muted transition hover:text-app-text">Privacy</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/trust"
								class="text-app-muted transition hover:text-app-text">Trust Center</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/transparency"
								class="text-app-muted transition hover:text-app-text">Transparency</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/security"
								class="text-app-muted transition hover:text-app-text">Security</a
							>
						</li>
						<li>
							<a
								href="https://libresearch.ca/status"
								class="text-app-muted transition hover:text-app-text">Status</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div
			class="mt-10 flex flex-col items-start justify-between gap-4 border-t border-app-border pt-8 sm:flex-row sm:items-center"
		>
			<div class="flex items-center gap-3">
				<p class="text-xs text-app-muted">
					&copy; {new Date().getFullYear()} LibreSearch. Built for privacy.
				</p>
				<span class="text-app-muted">·</span>
				<span
					class="rounded-full border border-app-border bg-app-background/80 px-2 py-0.5 text-xs text-app-muted backdrop-blur-sm"
					>v0.5.0</span
				>
			</div>
			<div class="flex items-center gap-4">
				<a
					href="https://github.com/Arcbasehq/LibreSearch"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					class="text-app-muted transition hover:text-app-text"
				>
					<i class="fa-brands fa-github text-base"></i>
				</a>
				<a
					href="https://mastodon.social/@libresearch"
					target="_blank"
					rel="me noopener noreferrer"
					aria-label="Mastodon"
					class="text-app-muted transition hover:text-app-text"
				>
					<i class="fa-brands fa-mastodon text-base"></i>
				</a>
			</div>
		</div>
	</div>
</footer>
