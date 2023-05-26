import { defineConfig } from 'vitepress'
import renderPermaLink from './render-perma-link'
import MarkDownItCustomAnchor from './markdown-it-custom-anchor'

const ogDescription = 'A free and open source mid-backend template'
const ogImage = 'https://tony.crlang.com/images/logo.png'
const ogTitle = 'Vue Tony Admin'
const ogUrl = 'https://tony.crlang.com'

export default defineConfig({
  title: 'Tony Admin 官方中文文档',
  description: '一个免费开源的中后台模版',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/crlang/vue-tony-admin-doc/edit/main/:path',
      text: '为此页提供修改建议'
    },

    outline: {
      label: '本页目录'
    },

    socialLinks: [
      { icon: {svg: '<svg t="1685091975530" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2506" width="128" height="128"><path d="M512 992C246.895625 992 32 777.104375 32 512S246.895625 32 512 32s480 214.895625 480 480-214.895625 480-480 480z m242.9521875-533.3278125h-272.56875a23.7121875 23.7121875 0 0 0-23.71125 23.7121875l-0.024375 59.255625c0 13.08 10.6078125 23.7121875 23.6878125 23.7121875h165.96c13.104375 0 23.7121875 10.6078125 23.7121875 23.6878125v11.855625a71.1121875 71.1121875 0 0 1-71.1121875 71.1121875h-225.215625a23.7121875 23.7121875 0 0 1-23.6878125-23.7121875V423.1278125a71.1121875 71.1121875 0 0 1 71.0878125-71.1121875h331.824375a23.7121875 23.7121875 0 0 0 23.6878125-23.71125l0.0721875-59.2565625a23.7121875 23.7121875 0 0 0-23.68875-23.7121875H423.08a177.76875 177.76875 0 0 0-177.76875 177.7921875V754.953125c0 13.1034375 10.60875 23.7121875 23.713125 23.7121875h349.63125a159.984375 159.984375 0 0 0 159.984375-159.984375V482.36a23.7121875 23.7121875 0 0 0-23.7121875-23.6878125z" p-id="2507"></path></svg>'}, link: 'https://gitee.com/crlang/vue-tony-admin' },
      { icon: 'github', link: 'https://github.com/crlang/vue-tony-admin' }
    ],

    // algolia: {
    //   appId: '',
    //   apiKey: '',
    //   indexName: '',
    //   searchParameters: {
    //     facetFilters: ['tags:cn']
    //   },
    //   placeholder: '搜索文档',
    //   translations: {
    //     button: {
    //       buttonText: '搜索'
    //     },
    //     modal: {
    //       searchBox: {
    //         resetButtonTitle: '清除查询条件',
    //         resetButtonAriaLabel: '清除查询条件',
    //         cancelButtonText: '取消',
    //         cancelButtonAriaLabel: '取消'
    //       },
    //       startScreen: {
    //         recentSearchesTitle: '搜索历史',
    //         noRecentSearchesText: '没有搜索历史',
    //         saveRecentSearchButtonTitle: '保存到搜索历史',
    //         removeRecentSearchButtonTitle: '从搜索历史中移除',
    //         favoriteSearchesTitle: '收藏',
    //         removeFavoriteSearchButtonTitle: '从收藏中移除'
    //       },
    //       errorScreen: {
    //         titleText: '无法获取结果',
    //         helpText: '你可能需要检查你的网络连接'
    //       },
    //       footer: {
    //         selectText: '选择',
    //         navigateText: '切换',
    //         closeText: '关闭',
    //         searchByText: '搜索供应商'
    //       },
    //       noResultsScreen: {
    //         noResultsText: '无法找到相关结果',
    //         suggestedQueryText: '你可以尝试查询',
    //         reportMissingResultsText: '你认为这个查询应该有结果？',
    //         reportMissingResultsLinkText: '向我们反馈'
    //       }
    //     }
    //   }
    // },

    footer: {
      copyright: 'CC BY-NC-SA 4.0 Licensed | Power by VitePress | Copyright CRLANG 2023'
    },

    nav: [
      {
        text: '指南',
        items: [
          {
            text: '指南',
            link: '/guide/introduction'
          },
          {
            text: '深入',
            link: '/dep/icon'
          },
          {
            text: '其他',
            link: '/other/faq'
          }
        ]
      },
      {
        text: '组件',
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
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            {
              text: '介绍',
              link: '/guide/introduction'
            },
            {
              text: '开始',
              link: '/guide/'
            },
            {
              text: '项目配置',
              link: '/guide/settings'
            },
            {
              text: '路由',
              link: '/guide/router'
            },
            {
              text: '菜单',
              link: '/guide/menu'
            },
            {
              text: '权限',
              link: '/guide/auth'
            },
            {
              text: 'Mock&联调',
              link: '/guide/mock'
            },
            {
              text: '组件注册',
              link: '/guide/component'
            },
            {
              text: '样式',
              link: '/guide/design'
            },
            {
              text: '外部模块',
              link: '/guide/lib'
            },
            {
              text: '构建&部署',
              link: '/guide/deploy'
            }
          ]
        },
        {
          text: '深入',
          items: [
            {
              text: '跨域处理',
              link: '/dep/cors'
            },
            {
              text: '图标',
              link: '/dep/icon'
            },
            {
              text: '国际化',
              link: '/dep/i18n'
            },
            {
              text: '项目规范',
              link: '/dep/lint'
            },
            {
              text: '黑暗主题',
              link: '/dep/dark'
            }
          ]
        },
        {
          text: '其他',
          items: [
            {
              text: '常见问题',
              link: '/other/faq'
            },
            {
              text: '赞助',
              link: '/other/donate'
            },
            {
              text: '常见疑点',
              link: '/other/doubt'
            },
            {
              text: '测试服务',
              link: '/other/server'
            }
          ]
        }
      ],
      '/components/': [
        {
          text: '全局组件',
          items: [
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
          items: [
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
          items: [
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
          items: [
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
    }
  },

  markdown: {
    anchor: {
      permalink: renderPermaLink
    },
    config: (md) => {
      md.use(MarkDownItCustomAnchor)
    }
  }
})
