import { getArticles, getCategoryCards, getFaqs } from '$lib/sanity';
import type { PageServerLoad } from './$types';

// Server-only load (never runs in the browser) so the Sanity client/queries
// stay server-side — no CORS, nothing leaked to the client. Runs at build time
// since the site is prerendered. Pulls articles for the search autocomplete +
// structured data, the curated category cards, and the FAQ accordion entries.
export const load: PageServerLoad = async () => {
	const [articles, categories, faqs] = await Promise.all([
		getArticles(),
		getCategoryCards(),
		getFaqs()
	]);
	return { articles, categories, faqs };
};
