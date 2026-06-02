<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { SITE } from '$lib/articles';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const article = $derived(data.article);

	const ORIGIN = 'https://support.libresearch.ca';
	const url = $derived(`${ORIGIN}/articles/${article.slug}`);

	// Structured data: a help article plus its breadcrumb trail, so search
	// engines can show it as a rich result.
	const jsonLd = $derived(
		JSON.stringify([
			{
				'@context': 'https://schema.org',
				'@type': 'TechArticle',
				headline: article.title,
				description: article.excerpt,
				dateModified: article.updated,
				articleSection: article.category,
				mainEntityOfPage: { '@type': 'WebPage', '@id': url },
				author: { '@type': 'Organization', name: 'LibreSearch' },
				publisher: {
					'@type': 'Organization',
					name: 'LibreSearch',
					logo: { '@type': 'ImageObject', url: `${SITE}/favicon.png` }
				}
			},
			{
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Help center', item: ORIGIN },
					{ '@type': 'ListItem', position: 2, name: article.category, item: url },
					{ '@type': 'ListItem', position: 3, name: article.title, item: url }
				]
			}
		])
	);
</script>

<svelte:head>
	<title>{article.title} — LibreSearch Support</title>
	<meta name="description" content={article.excerpt} />
	<meta name="robots" content="index, follow, max-image-preview:large" />
	<link rel="canonical" href={url} />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="LibreSearch Support" />
	<meta property="og:title" content={`${article.title} — LibreSearch Support`} />
	<meta property="og:description" content={article.excerpt} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={`${SITE}/og-image.png`} />
	<meta property="article:section" content={article.category} />
	<meta property="article:modified_time" content={article.updated} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${article.title} — LibreSearch Support`} />
	<meta name="twitter:description" content={article.excerpt} />
	<meta name="twitter:image" content={`${SITE}/og-image.png`} />

	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<!-- Header -->
<header class="sticky top-0 z-50 border-b border-app-border bg-app-background">
	<div class="mx-auto w-full max-w-[1100px] px-6">
		<div class="flex items-center justify-between py-5">
			<a href="/" class="flex items-center gap-3">
				<Logo class="h-10 w-25" />
				<span class="hidden text-app-muted sm:inline">|</span>
				<span class="hidden text-app-accent sm:inline">Support</span>
			</a>
			<a
				href="/"
				class="rounded-full px-4 py-2 text-sm font-medium text-app-accent transition hover:bg-app-surface"
			>
				← Help center
			</a>
		</div>
	</div>
</header>

<main class="bg-app-background text-app-text">
	<article class="mx-auto w-full max-w-[760px] px-6 py-14 sm:py-20">
		<!-- Breadcrumb -->
		<nav class="mb-6 text-sm text-app-muted">
			<a href="/" class="transition hover:text-app-text">Help center</a>
			<span class="px-1.5">/</span>
			<span class="text-app-text">{article.category}</span>
		</nav>

		<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</h1>
		<p class="mt-3 text-sm text-app-muted">Last updated {article.updated}</p>

		<!-- Body is trusted HTML authored in src/lib/articles.ts -->
		<div
			class="prose prose-invert mt-8 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-app-accent prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none"
		>
			{@html article.body}
		</div>

		<!-- Still need help -->
		<div class="mt-12 rounded-2xl border border-app-border bg-app-surface p-6 text-center">
			<p class="font-semibold text-app-text">Still have a question?</p>
			<p class="mt-1 text-sm text-app-muted">Our team reads every message — no bots, no tracking.</p>
			<a
				href={`${SITE}/contact`}
				class="mt-4 inline-block rounded-full bg-app-accent px-5 py-2.5 text-sm font-medium text-gray-900 transition hover:opacity-90"
			>
				Submit a request
			</a>
		</div>
	</article>
</main>

<SiteFooter />
