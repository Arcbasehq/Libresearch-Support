import { getArticleSlugs } from '$lib/sanity';
import type { RequestHandler } from './$types';

const ORIGIN = 'https://support.libresearch.ca';
export const prerender = true;

export const GET: RequestHandler = async () => {
	const slugs = await getArticleSlugs();
	const urls = [
		{ loc: `${ORIGIN}/`, priority: '1.0', changefreq: 'weekly' },
		...slugs.map((slug) => ({
			loc: `${ORIGIN}/articles/${slug}`,
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
