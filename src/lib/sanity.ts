// Content source for the support site. Articles and the home-page category
// cards are authored in Sanity and fetched here at build time (the whole site
// is prerendered, so these run during `vite build`, never in the browser).
//
// Bodies are stored as Portable Text in Sanity and converted to trusted HTML
// here, which the pages render with {@html}. Editors never write raw HTML.

import { createClient, type ClientConfig } from '@sanity/client';
import { toHTML } from '@portabletext/to-html';
import type { PortableTextBlock } from '@portabletext/types';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

export const SITE = 'https://libresearch.ca';

const config: ClientConfig = {
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	apiVersion: '2024-01-01',
	// CDN is fine for build-time reads of published content.
	useCdn: true
};

const client = createClient(config);

export type Article = {
	slug: string;
	title: string;
	category: string;
	excerpt: string;
	keywords?: string;
	updated: string;
	body: string;
};

export type CategoryCard = {
	title: string;
	body: string;
	href: string;
	icon: string;
};

export type Faq = {
	question: string;
	answer: string;
};

type RawArticle = Omit<Article, 'body' | 'updated'> & {
	body?: PortableTextBlock[];
	updated?: string;
};

const ARTICLE_FIELDS = `
	"slug": slug.current,
	title,
	category,
	excerpt,
	keywords,
	updated,
	body
`;

// Render Portable Text to HTML. Links carry an `href`; toHTML emits a plain
// <a href> which the prose styles in the page components then style.
function renderBody(blocks: PortableTextBlock[] | undefined): string {
	if (!blocks?.length) return '';
	return toHTML(blocks, {
		components: {
			marks: {
				link: ({ children, value }) =>
					`<a href="${value?.href ?? '#'}">${children}</a>`
			}
		}
	});
}

// Format an ISO date (stored in Sanity) the way the UI expects, e.g.
// "June 2, 2026". Falls back to the raw value if it isn't a date.
function formatUpdated(updated: string | undefined): string {
	if (!updated) return '';
	const d = new Date(updated);
	if (Number.isNaN(d.getTime())) return updated;
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
}

function toArticle(raw: RawArticle): Article {
	return {
		slug: raw.slug,
		title: raw.title,
		category: raw.category,
		excerpt: raw.excerpt,
		keywords: raw.keywords,
		updated: formatUpdated(raw.updated),
		body: renderBody(raw.body)
	};
}

// If Sanity isn't configured/reachable yet, don't break the build — return
// empty content so the site still renders (and rebuild once Sanity is set up).
async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
	try {
		return await client.fetch<T>(query, params);
	} catch (err) {
		console.warn('[sanity] fetch failed, using fallback:', (err as Error).message);
		return fallback;
	}
}

export async function getArticles(): Promise<Article[]> {
	const raw = await safeFetch<RawArticle[]>(
		`*[_type == "article"] | order(updated desc){${ARTICLE_FIELDS}}`,
		{},
		[]
	);
	return raw.map(toArticle);
}

export async function getArticleSlugs(): Promise<string[]> {
	return safeFetch<string[]>(`*[_type == "article" && defined(slug.current)].slug.current`, {}, []);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
	const raw = await safeFetch<RawArticle | null>(
		`*[_type == "article" && slug.current == $slug][0]{${ARTICLE_FIELDS}}`,
		{ slug },
		null
	);
	return raw ? toArticle(raw) : undefined;
}

export async function getFaqs(): Promise<Faq[]> {
	const raw = await safeFetch<{ question: string; answer?: PortableTextBlock[] }[]>(
		`*[_type == "faq"] | order(order asc){ question, answer }`,
		{},
		[]
	);
	return raw.map((f) => ({ question: f.question, answer: renderBody(f.answer) }));
}

export async function getCategoryCards(): Promise<CategoryCard[]> {
	return safeFetch<CategoryCard[]>(
		`*[_type == "categoryCard"] | order(order asc){
			title,
			body,
			icon,
			"href": "/articles/" + article->slug.current
		}`,
		{},
		[]
	);
}
