import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
	name: 'libresearch-support',
	title: 'LibreSearch Support',

	projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
	dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes
	}
});
