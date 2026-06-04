<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { SITE } from '$lib/sanity';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Articles (for search + structured data), the curated category cards under
	// the hero, and the FAQ entries come from Sanity, fetched at build time in
	// +page.ts.
	const articles = $derived(data.articles);
	const categories = $derived(data.categories);
	const faqs = $derived(data.faqs);

	let query = $state('');
	let focused = $state(false);

	// Autocomplete suggestions for the search bar — top matches shown in a
	// dropdown as the user types.
	const suggestions = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		return articles
			.filter((a) =>
				`${a.title} ${a.excerpt} ${a.category} ${a.keywords ?? ''}`.toLowerCase().includes(q)
			)
			.slice(0, 6);
	});
	const showDropdown = $derived(focused && query.trim().length > 0);

	const ORIGIN = 'https://support.libresearch.ca';
	const description =
		'LibreSearch Help Center. Find answers about private search, browser setup, search operators, privacy, and settings — or submit a request.';

	// Structured data: the help center site, its parent organization, and an
	// index of help articles to aid discovery and rich results.
	const jsonLd = $derived(
		JSON.stringify([
			{
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'LibreSearch Support',
				url: ORIGIN,
				publisher: { '@type': 'Organization', name: 'LibreSearch', url: SITE }
			},
			{
				'@context': 'https://schema.org',
				'@type': 'ItemList',
				name: 'LibreSearch help articles',
				itemListElement: articles.map((a, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					name: a.title,
					url: `${ORIGIN}/articles/${a.slug}`
				}))
			},
			// FAQ rich result — only emitted when there are FAQs to show.
			...(faqs.length
				? [
						{
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: faqs.map((f) => ({
								'@type': 'Question',
								name: f.question,
								acceptedAnswer: { '@type': 'Answer', text: f.answer }
							}))
						}
					]
				: [])
		])
	);
</script>

<svelte:head>
	<title>Support - LibreSearch | Help Center</title>
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow, max-image-preview:large" />
	<link rel="canonical" href={ORIGIN} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="LibreSearch Support" />
	<meta property="og:title" content="Support - LibreSearch | Help Center" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={ORIGIN} />
	<meta property="og:image" content={`${SITE}/og-image.png`} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Support - LibreSearch | Help Center" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={`${SITE}/og-image.png`} />

	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<!-- Sticky header -->
<header class="sticky top-0 z-50 bg-app-background">
	<div class="mx-auto w-full max-w-[1400px] px-6">
		<div class="flex items-center justify-between py-5">
			<a href={SITE} class="flex items-center gap-3">
				<span class="text-xl font-bold tracking-tight text-app-text"
					><img src="2.svg" class="h-10 w-25" alt="Libresearch Logo" /></span
				>
				<span class="hidden text-app-muted sm:inline">|</span>
				<span class="hidden text-app-accent sm:inline">Support</span>
			</a>
			<a
				href={`${SITE}/contact`}
				class="rounded-full px-4 py-2 text-sm font-medium text-app-accent transition hover:bg-app-surface"
			>
				Submit a request
			</a>
		</div>
	</div>
</header>

<main class="relative overflow-hidden bg-app-background text-app-text">
	<!-- Hero backdrop: periwinkle band with a dark circle bulging in from the
	     right, laptop illustration overlapping the dark area. -->
	<div
		class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] overflow-hidden bg-[#6c6ef6] sm:h-[460px]"
		aria-hidden="true"
	>
		<!-- Dark circle sweeping in from the right -->
		<div
			class="absolute top-1/2 left-[55%] h-[1500px] w-[1500px] -translate-y-1/2 rounded-full bg-[#1b2233]"
		></div>
		<!-- Laptop illustration sitting over the dark area -->
		<div class="absolute top-1/2 right-[3%] -translate-y-1/2">
			<img src="/icon4.svg" alt="" class="w-[220px] sm:w-[320px] lg:w-[400px]" />
		</div>
	</div>

	<!-- Hero -->
	<section
		class="relative z-30 mx-auto flex min-h-[420px] w-full max-w-[1100px] flex-col justify-center px-6 py-10 text-center sm:min-h-[460px]"
	>
		<h1
			class="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl"
		>
			How can we help?
		</h1>

		<div class="relative mx-auto mt-10 max-w-2xl">
			<svg
				class="pointer-events-none absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-app-muted"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				type="search"
				bind:value={query}
				onfocus={() => (focused = true)}
				onblur={() => setTimeout(() => (focused = false), 150)}
				placeholder="Search the help center"
				aria-label="Search the help center"
				autocomplete="off"
				class="w-160 rounded-full border border-white/10 bg-white/95 py-4 pr-5 pl-13 text-base text-gray-900 shadow-lg transition outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-app-accent"
			/>

			{#if showDropdown}
				<div
					class="absolute top-full left-0 z-50 mt-2 w-160 max-w-full overflow-hidden rounded-2xl border border-app-border bg-app-background text-left shadow-2xl"
				>
					{#if suggestions.length === 0}
						<div class="px-5 py-4 text-sm text-app-muted">
							No results for “{query.trim()}”.
							<a href={`${SITE}/contact`} class="text-app-accent underline">Submit a request</a>.
						</div>
					{:else}
						{#each suggestions as s (s.slug)}
							<a
								href={`/articles/${s.slug}`}
								class="flex flex-col gap-0.5 border-b border-app-border px-5 py-3 transition last:border-0 hover:bg-white/5"
							>
								<span class="text-xs font-medium tracking-wide text-app-accent uppercase"
									>{s.category}</span
								>
								<span class="text-sm font-medium text-app-text">{s.title}</span>
							</a>
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</section>

	<!-- Category cards -->
	<section class="relative z-10 mx-auto w-full max-w-[1200px] px-6 pt-12 pb-6">
		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each categories as cat (cat.title)}
				<a
					href={cat.href}
					class="group flex flex-col items-center rounded-sm border border-app-border bg-app-surface p-7 text-center shadow-sm hover:bg-white/5"
				>
					<span class="mb-4 flex h-14 w-14 items-center justify-center">
						{#if cat.icon === 'rocket'}
							<svg
								class="h-7 w-7"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path
									d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
								/><path
									d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
								/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path
									d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
								/></svg
							>
						{:else if cat.icon === 'search'}
							<svg
								class="h-7 w-7"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
								><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg
							>
						{:else if cat.icon === 'shield'}
							<svg
								class="h-7 w-7"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path
									d="M9 12l2 2 4-4"
								/></svg
							>
						{:else}
							<svg
								class="h-7 w-7"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
								><circle cx="12" cy="12" r="3" /><path
									d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
								/></svg
							>
						{/if}
					</span>
					<h2 class="text-lg font-semibold text-app-accent">{cat.title}</h2>
					<p class="mt-2 text-sm leading-6 text-app-muted">{cat.body}</p>
				</a>
			{/each}
		</div>
	</section>

	<!-- FAQ accordion -->
	{#if faqs.length}
		<section class="relative z-10 mx-auto w-full max-w-[800px] px-6 pt-10 pb-16">
			<h2 class="text-center text-2xl font-bold tracking-tight text-app-text">
				Frequently asked questions
			</h2>
			<div class="mt-8 divide-y divide-app-border border-y border-app-border">
				{#each faqs as faq (faq.question)}
					<details class="group">
						<summary
							class="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-medium text-app-text transition hover:text-app-accent"
						>
							<span>{faq.question}</span>
							<svg
								class="h-5 w-5 shrink-0 text-app-muted transition group-open:rotate-180"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</summary>
						<!-- Answer is trusted HTML rendered from Sanity Portable Text -->
						<div
							class="prose prose-invert max-w-none pb-5 text-app-muted prose-a:text-app-accent prose-a:no-underline hover:prose-a:underline"
						>
							{@html faq.answer}
						</div>
					</details>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Still need help -->
	<section class="relative z-10 border-t border-app-border bg-app-surface">
		<div
			class="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-4 px-6 py-14 text-center"
		>
			<h2 class="text-2xl font-bold tracking-tight text-app-text">Still need help?</h2>
			<p class="max-w-xl text-app-muted">
				Can’t find what you’re looking for? Our team reads every message — no bots, no tracking.
			</p>
			<a
				href={`${SITE}/contact`}
				class="mt-2 rounded-full bg-app-accent px-6 py-3 font-medium text-gray-900 transition hover:opacity-90"
			>
				Submit a request
			</a>
		</div>
	</section>

	<SiteFooter />
</main>
