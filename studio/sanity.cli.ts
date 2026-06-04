import { defineCliConfig } from 'sanity/cli';

// projectId / dataset are read from the studio's .env (see .env.example).
export default defineCliConfig({
	api: {
		projectId: process.env.SANITY_STUDIO_PROJECT_ID,
		dataset: process.env.SANITY_STUDIO_DATASET
	},
	// Hosted Studio at https://libresearch-support.sanity.studio
	studioHost: 'libresearch-support'
});
