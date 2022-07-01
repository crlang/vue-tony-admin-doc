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
          text: '全局组件',
          link: '/components/global/introduction',
        },
        {
          text: '基础组件',
          link: '/components/core/introduction',
        },
        {
          text: '函数式组件',
          link: '/components/functional/introduction',
        },
        {
          text: '拓展组件',
          link: '/components/extend/introduction',
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
        text: '全局组件',
        children: [
          {
            text: '前言',
            link: '/components/global/introduction',
          },
          {
            text: 'PageWrapper 页面外层容器',
            link: '/components/global/page-wrapper',
          },
        ],
      },
      {
        text: '基础组件',
        children: [
          {
            text: '前言',
            link: '/components/core/introduction',
          },
          {
            text: 'Button 按钮示例',
            link: '/components/core/button',
          },
          {
            text: 'BasicTable 表格',
            link: '/components/core/basic-table',
          },
          {
            text: 'BasicForm 表单',
            link: '/components/core/basic-form',
          },
          {
            text: 'BasicDescription 详情描述',
            link: '/components/core/basic-description',
          },
          {
            text: 'BasicModal 弹窗',
            link: '/components/core/basic-modal',
          },
          {
            text: 'BasicDrawer 抽屉',
            link: '/components/core/basic-drawer',
          },
          {
            text: 'Authority 鉴权容器',
            link: '/components/core/authority',
          },
          {
            text: 'SvgIcon SVG图标',
            link: '/components/core/svg-icon',
          },
          {
            text: 'ApiSelect 远程下拉框',
            link: '/components/core/api-select',
          },
          {
            text: 'CollapseContainer 区域折叠容器',
            link: '/components/core/collapse-container',
          },
          {
            text: 'Basic 标题及帮助',
            link: '/components/core/basic',
          },
          {
            text: 'BasicUpload 文件上传',
            link: '/components/core/basic-upload',
          },
          {
            text: 'Icon 图标',
            link: '/components/core/icon',
          },
          {
            text: 'VirtualScroll 虚拟滚动容器',
            link: '/components/core/virtual-scroll',
          },
          {
            text: 'List 数据列表',
            link: '/components/core/list',
          },
          {
            text: 'StrengthMeter 校验密码强度',
            link: '/components/core/strength-meter',
          },
          {
            text: 'IconPicker 图标选择器',
            link: '/components/core/icon-picker',
          },
          {
            text: 'CountdownInput 验证码输入框',
            link: '/components/core/countdown-input',
          },
          {
            text: 'ClickOutside 监听点击区域',
            link: '/components/core/click-outside',
          },
          {
            text: 'CardGrid 栅格卡片',
            link: '/components/core/card-grid',
          },
          {
            text: 'ScrollContainer 区域滚动容器',
            link: '/components/core/scroll-container',
          },
          {
            text: 'LazyContainer 区域延时加载容器',
            link: '/components/core/lazy-container',
          },
          {
            text: 'CountTo 数字动画',
            link: '/components/core/count-to',
          },
          {
            text: 'DragVerify 拖动校验',
            link: '/components/core/drag-verify',
          },
          {
            text: 'Time 相对时间',
            link: '/components/core/time',
          },
          {
            text: 'Transition 组件切换动画',
            link: '/components/core/transition',
          },
        ],
      },
      {
        text: '函数式组件',
        children: [
          {
            text: '前言',
            link: '/components/functional/introduction',
          },
          {
            text: 'ContextMenu 右键菜单',
            link: '/components/functional/context-menu',
          },
        ],
      },
      {
        text: '拓展组件',
        children: [
          {
            text: '前言',
            link: '/components/extend/introduction',
          },
          {
            text: 'Tinymce 富文本编辑器',
            link: '/components/extend/tinymce',
          },
          {
            text: 'Markdown 编辑器',
            link: '/components/extend/markdown',
          },
          {
            text: 'QrCode 二维码生成器',
            link: '/components/extend/qrcode',
          },
          {
            text: 'Excel 表格导入导出',
            link: '/components/extend/excel',
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
            text: '赞助',
            link: '/other/donate',
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
