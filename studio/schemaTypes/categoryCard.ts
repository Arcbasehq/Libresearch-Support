import { defineField, defineType } from 'sanity';

// One of the curated cards under the home-page hero. Each links to a featured
// article and shows an icon. Order controls left-to-right placement.
const ICONS = [
	{ title: 'Rocket', value: 'rocket' },
	{ title: 'Search', value: 'search' },
	{ title: 'Shield', value: 'shield' },
	{ title: 'Gear', value: 'gear' }
];

export const categoryCard = defineType({
	name: 'categoryCard',
	title: 'Home Category Card',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'body',
			title: 'Description',
			type: 'text',
			rows: 2,
			validation: (r) => r.required()
		}),
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
			options: { list: ICONS, layout: 'radio' },
			validation: (r) => r.required()
		}),
		defineField({
			name: 'article',
			title: 'Featured article',
			type: 'reference',
			to: [{ type: 'article' }],
			description: 'Card links to this article.',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'order',
			title: 'Order',
			type: 'number',
			description: 'Lower numbers appear first.',
			validation: (r) => r.required()
		})
	],
	orderings: [
		{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }
	],
	preview: {
		select: { title: 'title', subtitle: 'icon' }
	}
});
