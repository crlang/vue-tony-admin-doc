// @ts-check
/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  base: '/doc/',
  title: 'Tony Admin',
  lang: 'zh-CN',
  description: '一个开箱即用的后台管理前端框架',
  head: createHead(),
  themeConfig: {
    repo: 'crlang/vue-tony-admin',
    docsRepo: 'crlang/vue-tony-admin-doc',
    logo: '/logo.png',
    docsBranch: 'main',
    editLinks: true,
    lastUpdated: '上次更新',
    editLinkText: '为此页提供修改建议',
    nav: createNav(),
    sidebar: createSidebar(),
  },
};

/**
 * @type {()=>import('vitepress').HeadConfig[]}
 */

function createHead() {
  return [
    ['meta', { name: 'author', content: 'crlang' }],
    ['meta', { name: 'keywords', content: 'tony, vite, typescript, element-plus, vue' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' }],
    ['meta', { name: 'description', content: 'vue tony admin 开发文档' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ];
}

/**
 * @type {()=>import('./theme-default/config').DefaultTheme.NavItem[]}
 */
function createNav() {
  return [
    {
      text: '指南',
      link: '/guide/',
      items: [
        {
          text: '指南',
          link: '/guide/introduction',
        },
        {
          text: '深入',
          link: '/dep/icon',
        },
        {
          text: '其他',
          link: '/other/faq',
        },
      ],
    },
    {
      text: '组件',
      link: '/components/',
      items: [
        {
          text: '介绍',
          link: '/components/introduction',
        },
        {
          text: '全局组件',
          link: '/components/glob/button',
        },
        {
          text: '常用组件',
          link: '/components/basic',
        },
        {
          text: '函数式组件',
          link: '/components/functional/context-menu',
        },
      ],
    },
    {
      text: '更新日志',
      link: 'https://gitee.com/crlang/vue-tony-admin/blob/main/CHANGELOG.zh_CN.md',
    },
    {
      text: 'En',
      link: 'https://crlang.github.io/vue-tony-admin-doc/doc-en',
    },
  ];
}

function createSidebar() {
  return {
    '/components/': [
      {
        text: '组件',
        children: [
          {
            text: '前言',
            link: '/components/introduction',
          },
        ],
      },
      {
        text: '全局组件',
        children: [
          {
            text: 'Button 自定义按钮',
            link: '/components/glob/button',
          },
        ],
      },
      {
        text: '常用组件',
        children: [
          {
            text: 'Basic 基础组件',
            link: '/components/basic',
          },
          {
            text: 'CardGrid 栅格卡片',
            link: '/components/card-grid',
          },
          {
            text: 'Page',
            link: '/components/page',
          },
          {
            text: 'Icon',
            link: '/components/icon',
          },
          {
            text: 'Authority 鉴权',
            link: '/components/auth',
          },
          {
            text: 'Form',
            link: '/components/form',
          },
          {
            text: 'Table',
            link: '/components/table',
          },
          {
            text: 'PopConfirmButton',
            link: '/components/pop-confirm-button',
          },
          {
            text: 'CollapseContainer 区域折叠容器',
            link: '/components/collapse-container',
          },
          {
            text: 'ScrollContainer 区域滚动容器',
            link: '/components/scroll-container',
          },
          {
            text: 'LazyContainer',
            link: '/components/lazy-container',
          },
          {
            text: 'JsonPreview',
            link: '/components/json-preview',
          },
          {
            text: 'CountDown 倒计时',
            link: '/components/count-down',
          },

          {
            text: 'ClickOutSide 监听点击区域',
            link: '/components/click-out-side',
          },
          {
            text: 'CountTo 数字动画',
            link: '/components/count-to',
          },
          {
            text: 'Cropper 图片/头像裁剪',
            link: '/components/cropper',
          },
          {
            text: 'Description 详情',
            link: '/components/desc',
          },
          {
            text: 'Drawer 抽屉',
            link: '/components/drawer',
          },
          {
            text: 'Modal',
            link: '/components/modal',
          },
          {
            text: 'FlowChart',
            link: '/components/flow-chart',
          },
          {
            text: 'Upload',
            link: '/components/upload',
          },
          {
            text: 'Tree',
            link: '/components/tree',
          },
          {
            text: 'Excel',
            link: '/components/excel',
          },
          {
            text: 'Qrcode',
            link: '/components/qrcode',
          },
          {
            text: 'Markdown',
            link: '/components/markdown',
          },
          {
            text: 'Loading',
            link: '/components/loading',
          },
          {
            text: 'Tinymce',
            link: '/components/tinymce',
          },
          {
            text: 'Time',
            link: '/components/time',
          },
          {
            text: 'StrengthMeter 校验密码强度',
            link: '/components/strength-meter',
          },
          {
            text: 'Verify',
            link: '/components/verify',
          },
          {
            text: 'Transition',
            link: '/components/transition',
          },
          {
            text: 'VirtualScroll',
            link: '/components/virtual-scroll',
          },
        ],
      },
      {
        text: '函数式组件',
        children: [
          {
            text: 'ContextMenu',
            link: '/components/functional/context-menu',
          },
          {
            text: 'Loading',
            link: '/components/functional/loading',
          },
          {
            text: 'Preview',
            link: '/components/functional/preview',
          },
        ],
      },
    ],
    '/': [
      {
        text: '指南',
        children: [
          {
            text: '介绍',
            link: '/guide/introduction',
          },
          {
            text: '开始',
            link: '/guide/',
          },
          {
            text: '项目配置',
            link: '/guide/settings',
          },
          {
            text: '路由',
            link: '/guide/router',
          },
          {
            text: '菜单',
            link: '/guide/menu',
          },
          {
            text: '权限',
            link: '/guide/auth',
          },
          {
            text: 'Mock&联调',
            link: '/guide/mock',
          },
          {
            text: '组件注册',
            link: '/guide/component',
          },
          {
            text: '样式',
            link: '/guide/design',
          },
          {
            text: '外部模块',
            link: '/guide/lib',
          },
          {
            text: '构建&部署',
            link: '/guide/deploy',
          },
        ],
      },
      {
        text: '深入',
        children: [
          {
            text: '跨域处理',
            link: '/dep/cors',
          },
          {
            text: '图标',
            link: '/dep/icon',
          },
          {
            text: '国际化',
            link: '/dep/i18n',
          },
          {
            text: '项目规范',
            link: '/dep/lint',
          },
          {
            text: '黑暗主题',
            link: '/dep/dark',
          },
        ],
      },
      {
        text: '其他',
        children: [
          {
            text: '常见问题',
            link: '/other/faq',
          },
          {
            text: '常见疑点',
            link: '/other/doubt',
          },
          {
            text: '测试服务',
            link: '/other/server',
          },
        ],
      },
    ],
  };
}

// /**
//  * @type {(namespace:string,items:string[])=>string[]}
//  */
// function urlWrapper(namespace, items) {
//   return items.map((item) => namespace + item);
// }

// function getGuildNav() {
//   return urlWrapper('/guide', ['/']);
// }
