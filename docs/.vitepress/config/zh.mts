import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export const zh = defineConfig({
  description: "这里是描述。",
  lang: 'zh-CN',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { 
    //     text: '指引',
    //     link: '/zh/guide/introduction',
    //     activeMatch: '/zh/guide/'
    //   }
    // ],

    // sidebar: {
    //   '/zh/guide/': {
    //     base: '/zh/guide/',
    //     items: [
    //       { text: '介绍', link: 'introduction' },
    //     ]
    //   }
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fengxinming/ioredis-conn-pool/' }
    ]
  }
})
