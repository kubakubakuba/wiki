import { defineConfig } from 'vitepress'
import markdownItMathjax3 from 'markdown-it-mathjax3'
import markdownItFootnote from 'markdown-it-footnote'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Wiki",
	description: "a central guide page for swpelc.eu",
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Programming basics', link: '/programming' },
			{ text: 'ExpaCalendar', link: '/ExpaCalendar' }
		],

		sidebar: [
			{
				text: 'Programming',
				link: '/programming/',
				items: [
					{ text: 'The basics', link: '/programming/basics' },
					{ text: 'Writing a first program', link: '/programming/first' }
				]
			},
			{
				text: 'ExpaCalendar',
				link: '/ExpaCalendar/',
				items: [
					{ text: 'Credentials', link: '/ExpaCalendar/credentials' }
				]
			}
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/kubakubakuba' }
		],

		editLink: {
			pattern: 'https://github.com/kubakubakuba/wiki/edit/main/:path'
		},

		search: {
			provider: 'local'
		},
	},

	markdown: {
		config: (md) => {
		  md.use(markdownItMathjax3);
		  md.use(markdownItFootnote)
		}
	},
})
