# 项目配置项

用于修改项目的配色、布局、缓存、多语言、组件默认配置

## 环境变量配置

项目的环境变量配置位于项目根目录下的 [.env](https://github.com/crlang/vue-tony-admin/blob/main/.env)、[.env.development](https://github.com/crlang/vue-tony-admin/blob/main/.env.development)、[.env.production](https://github.com/crlang/vue-tony-admin/blob/main/.env.production)

具体可以参考 [Vite 文档](https://github.com/vitejs/vite#modes-and-environment-variables)

```bash

.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

```

::: tip 温馨提示

- 只有以 `VITE_ ` 开头的变量会被嵌入到客户端侧的包中，你可以项目代码中这样访问它们：

```js
console.log(import.meta.env.VITE_PROT)
```

- 以 `VITE_GLOB_*` 开头的的变量，在打包的时候，会被加入[app.config.js](#生产环境动态配置)配置文件当中.

:::

### 配置项说明

### .env

所有环境适用

```bash
# 端口号
VITE_PORT=12321
# 网站标题
VITE_GLOB_APP_TITLE='Tony Admin'
# 简称，用于配置文件名字 不要出现空格、数字开头等特殊字符
VITE_GLOB_APP_SHORT_NAME=vue_tony_admin
```

### .env.development

开发环境适用

```bash
# 是否开启mock数据，关闭时需要自行对接后台接口
VITE_USE_MOCK=true
# 资源公共路径,需要以 /开头和结尾
VITE_PUBLIC_PATH=/
# 是否删除Console.log
VITE_DROP_CONSOLE=false
# 本地开发代理，可以解决跨域及多地址代理
# 如果接口地址匹配到，则会转发到http://localhost:3000，防止本地出现跨域问题
# 可以有多个，注意多个不能换行，否则代理将会失效
VITE_PROXY=[["/api","http://localhost:3000"],["/upload","http://localhost:3001/upload"]]
# 接口地址
# 如果没有跨域问题，直接在这里配置即可
VITE_GLOB_API_URL=/api
# 文件上传接口  可选
VITE_GLOB_UPLOAD_URL=/upload
# 接口地址前缀，有些系统所有接口地址都有前缀，可以在这里统一加，方便切换
VITE_GLOB_API_URL_PREFIX=
```

::: warning 注意

这里配置的 `VITE_PROXY` 以及 `VITE_GLOB_API_URL`, /api 需要是唯一的，不要和接口有的名字冲突

如果你的接口是 `http://localhost:3000/api` 之类的，请考虑将 `VITE_GLOB_API_URL=/xxxx` 换成别的名字

:::

### .env.production

生产环境适用

```bash
# 是否开启mock
VITE_USE_MOCK=true
# 接口地址 可以由nginx做转发或者直接写实际地址
VITE_GLOB_API_URL=/api
# 文件上传地址 可以由nginx做转发或者直接写实际地址
VITE_GLOB_UPLOAD_URL=/upload
# 接口地址前缀，有些系统所有接口地址都有前缀，可以在这里统一加，方便切换
VITE_GLOB_API_URL_PREFIX=
# 是否删除Console.log
VITE_DROP_CONSOLE=true
# 资源公共路径,需要以 / 开头和结尾
VITE_PUBLIC_PATH=/
# 打包是否输出gz｜br文件
# 可选: gzip | brotli | none
# 也可以有多个, 例如 ‘gzip’|'brotli',这样会同时生成 .gz和.br文件
VITE_BUILD_COMPRESS = 'gzip'
# 打包是否压缩图片
VITE_USE_IMAGEMIN = false
# 打包是否开启pwa功能
VITE_USE_PWA = false
# 是否兼容旧版浏览器。开启后打包时间会慢一倍左右。会多打出旧浏览器兼容包,且会根据浏览器兼容性自动使用相应的版本
VITE_LEGACY = false
```

## 生产环境动态配置

### 说明

当执行`yarn build`构建项目之后，会自动生成 `app.config.js` 文件并插入 `index.html`。

**注意: 开发环境不会生成**

```js
// app.config.js
// 变量名命名规则  __PRODUCTION__xxx_CONF__   xxx：为.env配置的VITE_GLOB_APP_SHORT_NAME
window.__PRODUCTION__VUE_TONY_ADMIN__CONF__ = {
  VITE_GLOB_APP_TITLE: 'Tony Admin',
  VITE_GLOB_APP_SHORT_NAME: 'vue_tony_admin',
  VITE_GLOB_API_URL: '/app',
  VITE_GLOB_API_URL_PREFIX: '/',
  VITE_GLOB_UPLOAD_URL: '/upload'
}
```

### 作用

`app.config.js` 用于项目在打包后，需要动态修改配置的需求，如接口地址。不用重新进行打包，可在打包后修改 `/dist/app.config.js` 内的变量，刷新即可更新代码内的局部变量。

### 如何获取全局变量

想要获取 `app.config.js` 内的变量，可以使用 [src/hooks/setting/index.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/hooks/setting/index.ts) 提供的函数来进行获取

### 如何新增(新增一个可动态修改的配置项)

1. 首先在 `.env` 或者对应的开发环境配置文件内，新增需要可动态配置的变量，需要以 `VITE_GLOB_`开头

2. `VITE_GLOB_` 开头的变量会自动加入环境变量，通过在 `src/types/config.d.ts` 内修改 `GlobEnvConfig` 和 `GlobConfig` 两个环境变量的值来定义新添加的类型

3. [useGlobSetting](https://github.com/crlang/vue-tony-admin/blob/main/src/hooks/setting/index.ts) 函数中添加刚新增的返回值即可

```js
const {
  VITE_GLOB_APP_TITLE,
  VITE_GLOB_API_URL,
  VITE_GLOB_APP_SHORT_NAME,
  VITE_GLOB_API_URL_PREFIX,
  VITE_GLOB_UPLOAD_URL,
} = ENV;

export const useGlobSetting = (): SettingWrap => {
  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL
  };
  return glob as Readonly<GlobConfig>;
};

```

## 项目配置

::: warning

项目配置文件用于配置项目内展示的内容、布局、文本等效果，存于`localStorage`中。如果更改了项目配置，需要手动**清空** `localStorage` 缓存，刷新重新登录后方可生效。

:::

### 配置文件路径

[src/settings/projectSetting.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/settings/projectSetting.ts)

### 说明

```js
// ! 改动后需要清空浏览器缓存
const setting: ProjectConfig = {
  // 是否显示配置按钮
  showSettingButton: true,
  // 系统默认缓存时间，以秒为单位，默认为7天
  cacheTime: 60 * 60 * 24 * 7,
  // 是否显示暗黑主题切换按钮
  showDarkModeToggle: true,
  // 配置按钮位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // 权限相关的缓存存储在 sessionStorage 或 localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,
  // 处理会话超时方式
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  // 主题颜色
  themeColor: primaryColor,
  // 切换为灰色模式
  grayMode: false,
  // 切换为色弱模式
  colorWeak: false,
  // 隐藏头部、侧边菜单、标签栏等，只显示内容区。通常需要嵌入至第三方时很有用
  fullContent: false,
  // 内容区显示模式
  contentMode: ContentEnum.FULL,
  // 是否显示Logo
  showLogo: true,
  // 是否显示脚部
  showFooter: false,
  // 是否开启KeepAlive缓存，建议在开发时关闭缓存
  openKeepAlive: true,
  // 自动锁屏时间，0不锁屏。单位/分钟 默认 0
  lockTime: 0,
  // 是否显示面包屑
  showBreadCrumb: true,
  // 是否显示面包屑图标
  showBreadCrumbIcon: false,
  // 是否使用错误处理程序插件
  useErrorHandle: true,
  // 是否在打开页面时回到顶部
  useOpenBackTop: true,
  // 是否可以嵌入 iframe 页面
  canEmbedIFramePage: true,
  // 切换界面时是否删除未关闭的提示弹窗
  closeMessageOnSwitch: true,
  // 切换接口时，是否取消已经发送但没有响应的http请求
  removeAllHttpPending: false,

  // 头部内容区配置
  headerSetting: {
    // 是否显示头部
    show: true,
    // 头部高度
    height: 60,
    // 头部背景颜色
    bgColor: headerColor,
    // 是否固定在顶部
    fixed: true,
    // 是否开启锁屏功能
    useLockPage: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示文档按钮
    showDoc: true,
    // 是否显示通知按钮
    showNotice: true,
    // 是否显示菜单搜索
    showSearch: true
  },

  // 菜单内容区配置
  menuSetting: {
    // 是否显示菜单栏
    show: true,
    // 菜单宽度
    menuWidth: 220,
    // 菜单背景颜色
    bgColor: sidebarColor,
    // 是否固定左侧菜单
    fixed: true,
    // 是否默认收起菜单
    collapsed: false,
    // 折叠菜单时是否显示菜单名称
    collapsedShowTitle: false,
    // 是否允许拖动菜单的宽度
    canDrag: true,
    // 是否只隐藏菜单，但 DOM 节点还在
    hidden: false,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单显示模式
    type: MenuTypeEnum.SIDEBAR,
    // 菜单折叠触发位置
    trigger: TriggerEnum.HEADER,
    // 打开手风琴模式，即只显示一个菜单
    accordion: true,
    // 是否在切换页面时关闭菜单
    closeMixSidebarOnChange: false,
    // 顶部菜单 - 分割菜单，主菜单位于头部，二级菜单位于左侧
    split: false,
    // 顶部菜单 - 菜单的位置
    topMenuAlign: 'center',
    // 混合菜单 - 菜单展开方式，支持 click/hover
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 混合菜单 - 是否固定展开的菜单
    mixSideFixed: false
  },

  // 标签栏内容区配置
  multiTabsSetting: {
    // 是否显示标签
    show: true,
    // 标签高度
    height: 40,
    // 是否缓存
    cache: false,
    // 是否显示快捷按钮
    showQuick: true,
    // 是否显示刷新按钮
    showRedo: true,
    // 是否显示折叠按钮
    showFold: true
  },

  // 页面过渡配置
  transitionSetting: {
    // 是否开启页面切换动画
    enable: true,
    // 路由基础切换动画
    openPageLoading: true,
    // 是否打开顶部进度条
    openNProgress: true
  }
}
```

## 主题色配置

- A.（高优先级）默认可变动态的主题色配置位于 [src/settings/projectSetting.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/settings/projectSetting.ts) 内

```ts
// 主题色-由JS动态生成
export const primaryColor = '#0081FF'
```

- B.（低优先级）默认全局固定的主题色配置位于 [src/design/var/color.scss](https://github.com/crlang/vue-tony-admin/blob/main/src/design/var/color.scss)

```scss
// 主题色-由CSS动态生成
$primary-color: #0081ff;
```

::: warning 注意

如果项目没有动态主题修改的必要，只需要修改位于 [src/design/var/color.scss](https://github.com/crlang/vue-tony-admin/blob/main/src/design/var/color.scss) 的 `$primary-color`，同时，请务必将位于 [src/settings/projectSetting.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/settings/projectSetting.ts) 内的 `primaryColor` 设为 `null`。

:::

## 样式配置

### 头部颜色

默认的头部颜色配置位于 [src/settings/designSetting.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/settings/designSetting.ts) ，此颜色为背景颜色，前景、文本色将由系统匹配生成。

```ts
// 头部背景色
export const headerColor = '#ffffff'
```

### 侧边栏颜色

默认的侧边栏颜色配置位于 [src/settings/designSetting.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/settings/designSetting.ts) ，此颜色为背景颜色，前景、文本色将由系统匹配生成。

```ts
// 侧边栏背景色
export const sidebarColor = '#001529'
```

### css 前缀设置

用于修改项目内组件 class 的统一前缀，有 2 个地方需要同步修改。

- 在 [src/settings/designSetting.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/settings/designSetting.ts) 内配置

```ts
export const prefixCls = 'tony'
```

- 在 [src/design/var/config.scss](https://github.com/crlang/vue-tony-admin/blob/main/src/design/var/config.scss) 配置 css 前缀

```scss
$tonyname: tony;
```

### 前缀使用

**在 css 内**

```vue
<style lang="scss" scoped>
/* tonyname已经全局注入，不需要额外在引入 */
$prefix-cls: '#{$tonyname}-app-logo';

.#{$prefix-cls} {
  width: 100%;
}
</style>
```

**在 vue/ts 内**

```ts
import { useDesign } from '@/hooks/web/useDesign'

const { prefixCls } = useDesign('app-logo')
```

## 组件默认参数配置

::: tip 温馨提示

主要用于配置某些`TonyAdmin`组件的常规配置，而无需额外的去修改`TonyAdmin`组件

:::

在 [src/settings/componentSetting.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/settings/componentSetting.ts) 内配置

```ts
export default {
  // 表格组件的配置
  table: {
    // 请求接口的相关字段，支持嵌套格式 xxx.xxx.xxx
    fetchSetting: {
      // 服务端接收的页码字段
      pageField: 'page',
      // 服务端接收的页码大小字段
      sizeField: 'pageSize',
      // 服务端返回的列表字段，可能存在嵌套模式，如 'data.list'
      listField: 'items',
      // 服务端返回的数据总数字段，可能存在嵌套模式，如 'data.totalRow'
      totalField: 'total'
    },
    // 分页导航的对齐方式，可选 'left/center/right'
    defaultPageAlign: 'left',
    // 分页的页码大小
    defaultPageSize: 20,
    // 分页导航的分页切换大小的数组
    pageSizeOptions: ['10', '20', '30', '50', '100'],
    // 根据字段显示哪些分页内容
    pageLayoutOptions: 'total, prev, pager, next, jumper',
    // 默认的排序方法
    defaultSortFn: (sortInfo: ColumnSorterResult) => {
      const { prop, order } = sortInfo
      return {
        order,
        prop
      }
    },
    // 默认的筛选方法
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data
    }
  },
  form: {
    // 每行显示的表单项数量
    defaultItemSize: 4,
    // 表单项的间隔(px)
    defaultItemGutter: 16,
    // 行的列数，一般不需要修改
    fullColumnSize: 24
  },
  upload: {
    // 服务端返回的上传字段，可能存在嵌套模式，如 'data.url'
    urlField: 'url'
  },
  // 滚动组件的配置
  scrollbar: {
    // 是否使用原生滚动条
    native: false
  }
}
```

## 多语言配置

~~考虑到实用性，多语言信息已移除，后续依据实际情况是否添加。~~

~~在 [src/settings/localeSetting.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/settings/localeSetting.ts) 内配置~~

```ts
export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en'
}

export const localeSetting: LocaleSetting = {
  // 是否显示语言选择器
  showPicker: true,
  // 当前语言
  locale: LOCALE.ZH_CN,
  // 默认语言
  fallback: LOCALE.ZH_CN,
  // 允许的语言
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US]
}

// 语言列表
export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN
  },
  {
    text: 'English',
    event: LOCALE.EN_US
  }
]
```
