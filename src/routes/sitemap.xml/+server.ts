import { articles } from '$lib/articles';
import type { RequestHandler } from './$types';

const ORIGIN = 'https://support.libresearch.ca';
export const prerender = true;

export const GET: RequestHandler = () => {
	const urls = [
		{ loc: `${ORIGIN}/`, priority: '1.0', changefreq: 'weekly' },
		...articles.map((a) => ({
			loc: `${ORIGIN}/articles/${a.slug}`,
			priority: '0.7',
			changefreq: 'monthly'
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) =>
			`	<url>\n\t\t<loc>${u.loc}</loc>\n\t\t<changefreq>${u.changefreq}</changefreq>\n\t\t<priority>${u.priority}</priority>\n\t</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
