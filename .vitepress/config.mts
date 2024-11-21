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
			{ text: 'WebEval', link: '/WebEval' },
			{ text: 'ExpaCalendar', link: '/ExpaCalendar' },
			{ text: 'Tutorials', link: '/tutorials' }
		],

		sidebar: [
			{
				text: 'WebEval',
				link: '/WebEval/',
				items: [
					{
						text: 'User manual',
						link: '/WebEval/user',
						collapsed: true,
						items: [
							{ text: 'Getting started', link: '/WebEval/user/start' },
							{ text: 'Submitting a solution', link: '/WebEval/user/submit' },
							{ text: 'Checking results', link: '/WebEval/user/results' }
						]
					},
					{
						text: 'Developer manual',
						link: '/WebEval/dev',
						collapsed: true,
						items: [
							{ text: 'Deploying the app', link: '/WebEval/dev/deployment' },
							{ text: 'Creating a task', link: '/WebEval/dev/tasks' },
							{ text: 'Admin panel', link: '/WebEval/dev/admin-panel' },
							{ text: 'Evaluation', link: '/WebEval/dev/evaluator' },
							{ text: 'Database schema', link: '/WebEval/dev/database' }
						]
					}
				]
			},
			/*{
				text: 'Programming',
				link: '/programming/',
				items: [
					{ text: 'The basics', link: '/programming/basics' },
					{ text: 'Writing a first program', link: '/programming/first' }
				]
			},*/
			{
				text: 'ExpaCalendar',
				link: '/ExpaCalendar/',
				items: [
					{ text: 'Credentials', link: '/ExpaCalendar/credentials' }
				]
			},
			{
				text: 'Tutorials',
				link: '/tutorials/',
				items: [
					{ text: 'Wireguard', link: '/tutorials/wireguard' },
					{ text: 'Systemd', link: '/tutorials/systemd' },
					{ text: 'Reverse proxy', link: '/tutorials/reverse-proxy' },
					{ text: 'HTTPS setup', link: '/tutorials/https' }

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
