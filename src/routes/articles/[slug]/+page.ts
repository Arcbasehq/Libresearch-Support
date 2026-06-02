import { error } from '@sveltejs/kit';
import { getArticle } from '$lib/articles';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const article = getArticle(params.slug);
	if (!article) {
		throw error(404, 'Article not found');
	}
	return { article };
};
