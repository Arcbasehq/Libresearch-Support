<script lang="ts">
	import { page } from '$app/stores';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	// Main site origin — this support app runs on its own subdomain.
	const SITE = 'https://libresearch.ca';

	function copy(status: number): { title: string; body: string } {
		switch (status) {
			case 404:
				return {
					title: 'Page not found',
					body: "The page you're looking for doesn't exist, has been renamed, or never existed in the first place."
				};
			case 403:
				return {
					title: 'Forbidden',
					body: "You don't have permission to view this. If you believe this is a mistake, get in touch."
				};
			case 429:
				return {
					title: 'Too many requests',
					body: "You've been rate-limited to keep the service fast for everyone. Try again in a minute."
				};
			case 500:
				return {
					title: 'Something went wrong',
					body: "Our server hit an unexpected error. We're notified automatically and we'll look at it."
				};
			default:
				return {
					title: 'Unexpected error',
					body: 'An unexpected error occurred. Try again, or head back home.'
				};
		}
	}

	let { title, body } = $derived(copy($page.status));
</script>

<svelte:head>
	<title>{$page.status} - LibreSearch Support</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main
	class="flex min-h-screen flex-col items-center justify-center bg-app-background px-6 py-16 text-center text-app-text"
>
	<a href="/" class="mb-10 inline-flex text-xl font-bold tracking-tight" aria-label="LibreSearch Support home">
		LibreSearch <span class="ml-2 text-app-accent">Support</span>
	</a>

	<p class="mb-4 text-8xl font-bold text-app-accent tabular-nums opacity-40">
		{$page.status}
	</p>

	<h1 class="mb-3 text-2xl font-bold tracking-tight">{title}</h1>

	<p class="mb-10 max-w-md text-sm leading-6 text-app-muted">{body}</p>

	<div class="flex flex-wrap items-center justify-center gap-3">
		<a
			href="/"
			class="inline-flex items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-5 py-2.5 text-sm font-medium text-app-text transition hover:bg-white/5"
		>
			Help center
		</a>
		<a
			href={SITE}
			class="inline-flex items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-5 py-2.5 text-sm font-medium text-app-text transition hover:bg-white/5"
		>
			LibreSearch home
		</a>
		<a
			href={`${SITE}/contact`}
			class="inline-flex items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-5 py-2.5 text-sm font-medium text-app-text transition hover:bg-white/5"
		>
			Contact
		</a>
	</div>
</main>

<SiteFooter />
