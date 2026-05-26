import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Lordship Rec',
  tagline: 'Friends of Lordship Recreation Ground — Tottenham, north London',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://lordshiprec.org.uk',
  baseUrl: '/',

  organizationName: 'lordship-rec',
  projectName: 'lordship-rec',

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en-GB',
    locales: ['en-GB'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // editUrl will be added once the repo is on GitHub.
        },
        blog: {
          path: 'blog',
          routeBasePath: 'news',
          blogTitle: 'News',
          blogDescription: 'News and updates from Friends of Lordship Rec',
          blogSidebarTitle: 'Recent news',
          postsPerPage: 10,
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: 'Lordship Rec — News',
            description: 'News and updates from Friends of Lordship Rec',
            copyright: `© ${new Date().getFullYear()} Friends of Lordship Rec`,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // TODO: replace docusaurus-social-card.jpg with a real 1200x630 park photo
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Lordship Rec',
      logo: {
        alt: 'Friends of Lordship Rec',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'About',
          position: 'left',
          items: [
            {to: '/about', label: 'The Friends'},
            {to: '/about/history-of-the-friends', label: 'History of the Friends'},
            {to: '/about/constitution', label: 'Constitution'},
            {to: '/about/policies', label: 'Policies'},
          ],
        },
        {
          type: 'dropdown',
          label: 'The park',
          position: 'left',
          items: [
            {to: '/park', label: 'About the park'},
            {to: '/park/getting-there', label: 'Getting there'},
            {to: '/park/booking', label: 'Booking the park'},
            {to: '/park/management', label: 'Management & maintenance'},
            {to: '/park/local-communities', label: 'Local communities'},
          ],
        },
        {
          type: 'docSidebar',
          sidebarId: 'facilitiesSidebar',
          position: 'left',
          label: 'Facilities',
        },
        {
          type: 'docSidebar',
          sidebarId: 'wildlifeSidebar',
          position: 'left',
          label: 'Wildlife',
        },
        {
          type: 'docSidebar',
          sidebarId: 'historySidebar',
          position: 'left',
          label: 'History',
        },
        {
          type: 'dropdown',
          label: 'More',
          position: 'left',
          items: [
            {to: '/regeneration', label: 'Regeneration'},
            {to: '/festival', label: 'Festival & events'},
            {to: '/festival/calendar', label: 'Calendar'},
            {to: '/links', label: 'Links'},
          ],
        },
        {to: '/news', label: 'News', position: 'left'},
        {
          to: '/get-involved',
          label: 'Get involved',
          position: 'right',
          className: 'navbar__cta',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About',
          items: [
            {label: 'Friends of Lordship Rec', to: '/about'},
            {label: 'Get involved', to: '/get-involved'},
            {label: 'Mailing list', to: '/get-involved/mailing-list'},
            {label: 'Constitution', to: '/about/constitution'},
          ],
        },
        {
          title: 'The park',
          items: [
            {label: 'About the park', to: '/park'},
            {label: 'Facilities', to: '/facilities'},
            {label: 'Wildlife', to: '/wildlife'},
            {label: 'History', to: '/history'},
            {label: 'Regeneration', to: '/regeneration'},
          ],
        },
        {
          title: 'Keep in touch',
          items: [
            {label: 'News', to: '/news'},
            {label: 'Festival & events', to: '/festival'},
            {label: 'Calendar', to: '/festival/calendar'},
            {label: 'RSS feed', href: 'pathname:///news/rss.xml'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Friends of Lordship Rec. Lordship Recreation Ground, Lordship Lane, London N17.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
