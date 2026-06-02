// Central knowledge base for the support site. Each entry renders as a real
// in-app article at /articles/<slug>, and also feeds the home page category
// cards and search autocomplete. Bodies are trusted HTML authored here (never
// user input) and rendered with {@html}.

export const SITE = 'https://libresearch.ca';

export type Article = {
	slug: string;
	title: string;
	category: string;
	excerpt: string;
	keywords?: string;
	updated: string;
	body: string;
};

export const articles: Article[] = [
	{
		slug: 'make-libresearch-default',
		title: 'How do I make LibreSearch my default search engine?',
		category: 'Getting Started',
		excerpt: 'Add LibreSearch to your browser so every search bar query stays private.',
		keywords: 'default browser chrome firefox edge safari install extension addon opensearch',
		updated: 'June 2, 2026',
		body: `
			<p>Setting LibreSearch as your default means every query you type in the address bar is private by default — no extra clicks, no tracking.</p>
			<h2>The easy way: install the extension</h2>
			<p>Our browser extension sets LibreSearch as your default search and keeps it there if another app tries to change it. Grab it from the <a href="${SITE}/extension">extension page</a> and follow the one-click install for your browser.</p>
			<h2>Set it manually</h2>
			<ul>
				<li><strong>Chrome / Edge:</strong> Settings → Search engine → Manage search engines → Add. Use <code>https://libresearch.ca/search?q=%s</code>, then set it as default.</li>
				<li><strong>Firefox:</strong> Visit <a href="${SITE}">libresearch.ca</a>, click the address-bar menu, and choose “Add LibreSearch”. Then set it as default in Settings → Search.</li>
				<li><strong>Safari:</strong> Safari doesn't allow custom default engines, so use the extension or set LibreSearch as your homepage.</li>
			</ul>
			<h2>Add to your phone</h2>
			<p>On mobile, open <a href="${SITE}">libresearch.ca</a> and use “Add to Home Screen” to install it as an app, or set it as your browser's search engine where supported.</p>
		`
	},
	{
		slug: 'does-libresearch-log-searches',
		title: 'Does LibreSearch log my searches?',
		category: 'Privacy & Security',
		excerpt: 'No. We never log queries, build profiles, or sell ads. Here is how that works.',
		keywords: 'logging tracking data retention profile ads anonymous',
		updated: 'June 2, 2026',
		body: `
			<p><strong>No.</strong> LibreSearch does not log the searches you make, and it never ties them to you.</p>
			<h2>What we don't keep</h2>
			<ul>
				<li>Your search terms.</li>
				<li>A profile or search history linked to you.</li>
				<li>Tracking cookies, advertising IDs, or browser fingerprints.</li>
				<li>Your IP address stored alongside queries.</li>
			</ul>
			<h2>Why it's built this way</h2>
			<p>We make money without advertising, so there's no business reason to collect your data — and no database to leak, sell, or hand over in a legal request. Privacy isn't a setting you enable; it's the default.</p>
			<p>For the legal specifics, read the <a href="${SITE}/privacy">full privacy policy</a> or the <a href="/articles/privacy-and-security">Privacy &amp; Security overview</a>.</p>
		`
	},
	{
		slug: 'search-operators',
		title: 'Search operators and syntax',
		category: 'Search Features',
		excerpt: 'Use quotes, site:, minus, and more to narrow exactly what you want.',
		keywords: 'operators site filetype intitle exclude quotes boolean advanced',
		updated: 'June 2, 2026',
		body: `
			<p>Operators let you sharpen a search without leaving the search box. Combine them freely.</p>
			<h2>Common operators</h2>
			<ul>
				<li><code>"exact phrase"</code> — match the words in this exact order.</li>
				<li><code>-word</code> — exclude results containing this word.</li>
				<li><code>site:example.com</code> — only results from one domain.</li>
				<li><code>filetype:pdf</code> — only a specific file type.</li>
				<li><code>intitle:word</code> — the page title must contain the word.</li>
				<li><code>term OR term</code> — match either side.</li>
			</ul>
			<h2>Examples</h2>
			<ul>
				<li><code>"climate report" site:gov filetype:pdf</code></li>
				<li><code>privacy -ads</code></li>
				<li><code>intitle:tutorial svelte OR sveltekit</code></li>
			</ul>
			<p>See the full reference on the <a href="${SITE}/syntax">syntax page</a>.</p>
		`
	},
	{
		slug: 'change-theme-region-safe-search',
		title: 'Change theme, region, and safe search',
		category: 'Settings',
		excerpt: 'Tune appearance and result preferences. Settings are stored on your device.',
		keywords: 'theme dark light region language safesearch preferences localstorage appearance',
		updated: 'June 2, 2026',
		body: `
			<p>All preferences live in <a href="${SITE}/settings">Settings</a>, and they're stored locally in your browser — never on our servers.</p>
			<h2>Appearance</h2>
			<p>Switch between light, dark, and system themes under Settings → Appearance. Your choice is remembered on this device.</p>
			<h2>Region &amp; language</h2>
			<p>Set your region to get more locally relevant results, and pick the interface language. Region only affects ranking — it isn't used to identify you.</p>
			<h2>Safe search</h2>
			<p>Choose Strict, Moderate, or Off to filter explicit results. Moderate is the default.</p>
			<h2>Why settings reset sometimes</h2>
			<p>Because preferences are stored in your browser, clearing site data or using a private window resets them. We never had a copy to restore — that's the privacy trade-off, and we think it's the right one.</p>
		`
	},
	{
		slug: 'how-libresearch-is-funded',
		title: 'How is LibreSearch funded without ads?',
		category: 'Company',
		excerpt: 'Learn about our model and how to support the project.',
		keywords: 'funding money donate support sponsor business model ads',
		updated: 'June 2, 2026',
		body: `
			<p>LibreSearch doesn't run ads and doesn't sell data, so funding comes from people and organizations who want a private search engine to exist.</p>
			<h2>Where support comes from</h2>
			<ul>
				<li><strong>Donations</strong> from users who value the service — see the <a href="${SITE}/donate">donate page</a>.</li>
				<li><strong>Backing from Arcbase</strong>, the team behind LibreSearch.</li>
				<li><strong>Optional paid plans</strong> for organizations via <a href="${SITE}/enterprise">Enterprise</a>.</li>
			</ul>
			<h2>Why no ads</h2>
			<p>Ad-funded search has to profile you to target ads. Removing ads removes the incentive to track — which is exactly the point.</p>
		`
	},
	{
		slug: 'report-a-bug-or-security-issue',
		title: 'Report a bug or security issue',
		category: 'Privacy & Security',
		excerpt: 'Found something broken or a vulnerability? Here is how to reach us.',
		keywords: 'bug vulnerability disclosure report security responsible',
		updated: 'June 2, 2026',
		body: `
			<h2>Found a bug?</h2>
			<p>Tell us what happened, what you expected, your browser, and steps to reproduce. Send it through the <a href="${SITE}/contact">contact form</a> and pick “Report a bug”.</p>
			<h2>Found a security vulnerability?</h2>
			<p>Please disclose responsibly. Report it privately through our <a href="${SITE}/security">security page</a> rather than opening a public issue, and give us a reasonable window to fix it before sharing details.</p>
			<ul>
				<li>Include a clear description and proof-of-concept if you have one.</li>
				<li>Don't access or modify other users' data.</li>
				<li>We'll acknowledge your report and keep you updated on the fix.</li>
			</ul>
		`
	},
	{
		slug: 'where-results-come-from',
		title: 'Where do search results come from?',
		category: 'Search Features',
		excerpt: 'Understand our sources and how results are ranked without personalization.',
		keywords: 'sources index ranking results provider where personalization',
		updated: 'June 2, 2026',
		body: `
			<p>LibreSearch fetches results from established search providers on your behalf, then presents them without ads or trackers.</p>
			<h2>You stay anonymous</h2>
			<p>When you search, our servers query the upstream provider — so the provider sees us, never your IP address or browser. You get the results; nobody gets you.</p>
			<h2>No personalized ranking</h2>
			<p>Because we don't build a profile, results aren't bent to a model of “you”. Everyone searching the same terms in the same region sees the same ranking. Your region and language can refine results, but they're never used to identify you.</p>
		`
	},
	{
		slug: 'privacy-policy-and-data-requests',
		title: 'Privacy policy and data requests',
		category: 'Privacy & Security',
		excerpt: 'Read the full policy and how to make a privacy or data request.',
		keywords: 'gdpr ccpa data request policy legal terms delete',
		updated: 'June 2, 2026',
		body: `
			<p>Our <a href="${SITE}/privacy">privacy policy</a> is the authoritative document on what we collect (very little) and how we handle it.</p>
			<h2>Making a data request</h2>
			<p>Regulations like GDPR and CCPA give you rights to access or delete personal data. In practice, LibreSearch doesn't keep search data tied to you, so there's usually nothing to export or erase — but you can still submit a request.</p>
			<ul>
				<li>Use the <a href="${SITE}/contact">contact form</a> and choose “Privacy / data request”.</li>
				<li>Tell us what you're asking for (access, deletion, or a question).</li>
				<li>We'll respond within the timeframe the applicable law requires.</li>
			</ul>
			<p>See also our <a href="${SITE}/transparency">transparency report</a> and <a href="${SITE}/terms">terms</a>.</p>
		`
	},
	{
		slug: 'service-status-and-uptime',
		title: 'Service status and uptime',
		category: 'Getting Started',
		excerpt: 'Check whether LibreSearch is up and view current incidents.',
		keywords: 'status uptime down outage incident slow not working',
		updated: 'June 2, 2026',
		body: `
			<p>If search feels slow or won't load, check the live <a href="${SITE}/status">status page</a> first — it shows current uptime and any open incidents.</p>
			<h2>Quick things to try</h2>
			<ul>
				<li>Reload the page, or try again in a minute.</li>
				<li>Disable a VPN or proxy temporarily to rule it out.</li>
				<li>Clear the site's cached data and retry.</li>
			</ul>
			<h2>Still down?</h2>
			<p>If the status page looks healthy but it's broken for you, let us know through the <a href="${SITE}/contact">contact form</a> with your browser and location so we can investigate.</p>
		`
	},
	{
		slug: 'contact-the-team',
		title: 'Contact the LibreSearch team',
		category: 'Company',
		excerpt: 'Questions the help center did not answer? Send us a message.',
		keywords: 'contact email support request help reach',
		updated: 'June 2, 2026',
		body: `
			<p>Didn't find your answer here? Reach out — a real person reads every message, with no bots and no tracking.</p>
			<h2>Send a request</h2>
			<p>Use the <a href="${SITE}/contact">contact form</a> and pick the topic that fits: general question, bug report, privacy request, security disclosure, or press.</p>
			<h2>What to include</h2>
			<ul>
				<li>A clear description of what you need.</li>
				<li>Your browser and device, if it's a technical issue.</li>
				<li>Steps to reproduce, for bugs.</li>
			</ul>
		`
	},
	{
		slug: 'privacy-and-security',
		title: 'Privacy & Security',
		category: 'Privacy & Security',
		excerpt: 'How LibreSearch protects your queries — no logs, no profiles, encrypted by default.',
		keywords: 'privacy security overview encryption https csp tracking profile proxy',
		updated: 'June 2, 2026',
		body: `
			<p>LibreSearch is built so that protecting your privacy isn't a setting you have to find — it's the default. Here's what we do (and don't do) with your searches, and the technology that keeps them secure.</p>
			<h2>What we never collect</h2>
			<ul>
				<li><strong>Search queries.</strong> We don't store the terms you search for.</li>
				<li><strong>Profiles.</strong> No profile or history tied to you.</li>
				<li><strong>Identifiers.</strong> No tracking cookies, ad IDs, or fingerprinting.</li>
				<li><strong>IP logs.</strong> Your IP isn't retained alongside your searches.</li>
			</ul>
			<h2>How your search reaches results</h2>
			<p>We fetch results on your behalf, so the upstream provider sees our servers — never your IP or browser. <a href="/articles/where-results-come-from">More on where results come from.</a></p>
			<h2>Connection security</h2>
			<ul>
				<li><strong>HTTPS everywhere</strong> — every connection is encrypted in transit.</li>
				<li><strong>No third-party trackers</strong> on the pages we serve.</li>
				<li><strong>Strict content policy</strong> limits what can run in your browser.</li>
			</ul>
			<h2>Your settings stay on your device</h2>
			<p>Theme, region, and safe-search live in your browser, not on our servers. <a href="/articles/change-theme-region-safe-search">Manage your settings.</a></p>
			<h2>Reporting a security issue</h2>
			<p>Found a vulnerability? Disclose responsibly through our <a href="${SITE}/security">security page</a>. <a href="/articles/report-a-bug-or-security-issue">How to report.</a></p>
			<h2>Read more</h2>
			<ul>
				<li><a href="${SITE}/privacy">Full privacy policy</a></li>
				<li><a href="${SITE}/transparency">Transparency report</a></li>
				<li><a href="${SITE}/trust">Trust center</a></li>
			</ul>
		`
	}
];

export function getArticle(slug: string): Article | undefined {
	return articles.find((a) => a.slug === slug);
}
