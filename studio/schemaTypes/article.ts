import { defineField, defineType } from 'sanity';

// A help-center article. Matches the shape the SvelteKit site expects:
// slug, title, category, excerpt, keywords, updated, body (Portable Text).
export const CATEGORIES = [
	'Getting Started',
	'Search Features',
	'Privacy & Security',
	'Settings',
	'Company'
] as const;

export const article = defineType({
	name: 'article',
	title: 'Article',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'URL path: /articles/<slug>',
			options: { source: 'title', maxLength: 96 },
			validation: (r) => r.required()
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: { list: CATEGORIES.map((c) => ({ title: c, value: c })) },
			validation: (r) => r.required()
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			rows: 2,
			description: 'Short summary shown in search results and meta description.',
			validation: (r) => r.required().max(200)
		}),
		defineField({
			name: 'keywords',
			title: 'Keywords',
			type: 'string',
			description: 'Space-separated terms to help the on-site search match this article.'
		}),
		defineField({
			name: 'updated',
			title: 'Last updated',
			type: 'date',
			options: { dateFormat: 'YYYY-MM-DD' },
			validation: (r) => r.required()
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
						{ title: 'Subheading', value: 'h3' }
					],
					lists: [
						{ title: 'Bullet', value: 'bullet' },
						{ title: 'Numbered', value: 'number' }
					],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
							{ title: 'Code', value: 'code' }
						],
						annotations: [
							{
								name: 'link',
								title: 'Link',
								type: 'object',
								fields: [
									{
										name: 'href',
										title: 'URL',
										type: 'url',
										validation: (r) =>
											r.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] })
									}
								]
							}
						]
					}
				}
			],
			validation: (r) => r.required()
		})
	],
	orderings: [
		{
			title: 'Last updated, new → old',
			name: 'updatedDesc',
			by: [{ field: 'updated', direction: 'desc' }]
		}
	],
	preview: {
		select: { title: 'title', subtitle: 'category' }
	}
});
