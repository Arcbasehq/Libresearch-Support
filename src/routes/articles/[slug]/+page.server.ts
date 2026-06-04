import { error } from '@sveltejs/kit';
import { getArticle, getArticleSlugs } from '$lib/sanity';
import type { EntryGenerator, PageServerLoad } from './$types';

// Tell the prerenderer about every article slug so each gets its own static
// HTML page (the in-page search links only appear on focus, so the crawler
// can't discover them on its own). Slugs come from Sanity at build time.
export const entries: EntryGenerator = async () => {
	const slugs = await getArticleSlugs();
	return slugs.map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const article = await getArticle(params.slug);
	if (!article) {
		throw error(404, 'Article not found');
	}
	return { article };
};
