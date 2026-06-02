import { error } from '@sveltejs/kit';
import { articles, getArticle } from '$lib/articles';
import type { EntryGenerator, PageLoad } from './$types';

// Tell the prerenderer about every article slug so each gets its own static
// HTML page (the in-page search links only appear on focus, so the crawler
// can't discover them on its own).
export const entries: EntryGenerator = () => articles.map((a) => ({ slug: a.slug }));

export const load: PageLoad = ({ params }) => {
	const article = getArticle(params.slug);
	if (!article) {
		throw error(404, 'Article not found');
	}
	return { article };
};
