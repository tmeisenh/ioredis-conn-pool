import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export const en = defineConfig({
  description: "Here is description.",
  lang: 'en-US',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { 
    //     text: 'Guide',
    //     link: '/guide/introduction',
    //     activeMatch: '/guide/'
    //   }
    // ],

    // sidebar: {
    //   '/guide/': {
    //     base: '/guide/',
    //     items: [
    //       { text: 'Introduction', link: 'introduction' }
    //     ]
    //   }
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fengxinming/ioredis-conn-pool/' }
    ]
  }
})