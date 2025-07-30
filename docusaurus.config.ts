import { themes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const lightTheme = themes.github;
const darkTheme = themes.dracula;

const config: Config = {
  future: {
    v4: true,
    experimental_faster: true,
  },
  title: '星光',
  tagline: '一个前端，水平一般',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.xingguang.host',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  projectName: 'xingguang的博客', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: '首页',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: '文档',
          editUrl: false,
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} 星光`,
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
    },
    giscus: {
      repo: 'starguang/myblog',
      repoId: 'MDEwOlJlcG9zaXRvcnkyNzIxNzg4MDE=',
      category: 'Announcement',
      categoryId: 'DIC_kwDOEDkecc4CSlJj',
      dataLang: "zh-CN"
    },
    metadata: [{ name: 'xingguang博客', content: 'blog, react, 前端, ndoejs' }],
  } satisfies Preset.ThemeConfig,
};

export default config;
