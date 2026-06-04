import { defineField, defineType } from 'sanity';

// A short question/answer pair for the home-page FAQ accordion. Distinct from
// full Articles: FAQs are brief and answered inline, not on their own page.
export const faq = defineType({
	name: 'faq',
	title: 'FAQ',
	type: 'document',
	fields: [
		defineField({
			name: 'question',
			title: 'Question',
			type: 'string',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'answer',
			title: 'Answer',
			type: 'array',
			of: [
				{
					type: 'block',
					// Answers are short prose — no headings or lists, just links and
					// emphasis.
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' }
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
		}),
		defineField({
			name: 'order',
			title: 'Order',
			type: 'number',
			description: 'Lower numbers appear first.',
			validation: (r) => r.required()
		})
	],
	orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
	preview: {
		select: { title: 'question', subtitle: 'order' }
	}
});
