# 开始

本文会帮助你从头启动项目

## 前言

::: tip 关于组件

项目虽然二次封装了一些组件，但是可能不能满足大部分的要求。如果组件不满足你的要求，完全可以不用甚至删除代码自己写，不必坚持使用项目自带的组件。

:::

## 环境准备

本地环境需要安装 [pnpm](https://pnpm.io//)、[Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/)

::: warning 版本要求

pnpm >= 8.x

node >= 16.x

:::

## 工具配置

如果您使用的 IDE 是[vscode](https://code.visualstudio.com/)(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

**推荐**

- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - vue3 开发必备
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) - vue3 开发必备
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - TS 代码检查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - TS 代码格式化
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - CSS/SASS 格式化

**可选**

- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - .env 文件 高亮
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Iconify 图标插件
- [I18n-ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) - i18n 插件

## 代码获取

::: warning 注意

注意存放代码的目录及所有父级目录不能存在中文、韩文、日文以及空格，否则安装依赖后启动会出错。

:::

### 从 GitHub 获取代码

```bash

git clone https://github.com/crlang/vue-tony-admin

```

### 从 Gitee 获取代码

```bash

git clone https://gitee.com/crlang/vue-tony-admin

```

::: warning 注意

[Gitee](https://gitee.com/crlang/vue-tony-admin)的代码可能不是最新的

:::

## 安装

### 安装 Node.js

如果您电脑未安装[Node.js](https://nodejs.org/en/)，建议安装 >= 16.x 版本。

**验证**

```bash

# 出现相应npm版本即可
npm -v

# 出现相应node版本即可
node -v

```

::: tip 温馨提示

如果你需要同时存在多个 node 版本，可以使用 [Nvm](https://github.com/nvm-sh/nvm) 或者其他工具进行 Node.js 进行版本管理。

[Nvm 安装文档](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)

:::

### 安装依赖

#### pnpm 安装

强烈建议用 [pnpm](https://pnpm.io/)进行依赖安装。

如果未安装 `pnpm`，可以用下面命令来进行全局安装

```bash

# 全局安装pnpm
npm i -g pnpm

# 验证，出现对应版本号即代表安装成功
pnpm -v

```

#### 依赖安装命令

在项目根目录下，执行下方的命令，耐心等待安装完成即可

```bash
# 安装依赖
pnpm install
```

::: tip 安装依赖时 husky 安装失败

请查看你的源码是否从 github 直接下载的，直接下载是没有 `.git` 文件夹的，而 `husky` 需要依赖 `git` 才能安装。此时需使用 `git init` 初始化项目，再尝试重新安装即可。

:::

## npm script

```json
"scripts": {
  // 安装依赖
  "bootstrap": "pnpm install",
  // 运行项目
  "serve": "npm run dev",
  // 运行项目(推荐)
  "dev": "vite",
  // 构建项目
  "build": "cross-env NODE_ENV=production NODE_OPTIONS=--max-old-space-size=8192 pnpm vite build",
  // 构建项目-一个演示的构建拓展
  "build:site": "cross-env NODE_ENV=production NODE_OPTIONS=--max-old-space-size=8192 pnpm vite build --mode site",
  // 测试构建项目
  "build:test": "cross-env NODE_OPTIONS=--max-old-space-size=8192 pnpm vite build --mode test",
  // 清空缓存后构建项目
  "build:no-cache": "pnpm clean:cache && npm run build",
  // 预览构建后的内容（先打包再进行预览）
  "preview": "npm run build && vite preview",
  // 类型检查
  "type:check": "vue-tsc --noEmit --skipLibCheck",
  // 对打包结果进行 gzip 测试
  "test:gzip": "npx http-server dist --cors --gzip -c-1",
  // 对打包目录进行 brotli 测试
  "test:br": "npx http-server dist --cors --brotli -c-1",
  // 执行 eslint
  "lint:eslint": "eslint --max-warnings 0  \"src/**/*.{vue,ts,tsx}\" --fix",
  // 执行 prettier
  "lint:prettier": "prettier --write  \"src/**/*.{js,json,ts,vue,tsx,html,md}\"",
  // 执行 stylelint
  "lint:stylelint": "stylelint --fix \"**/*.{vue,postcss,css,scss}\" --cache-location node_modules/.cache/stylelint/",
  // git commit 规范提交
  "commit": "czg",
  // 生成 ChangeLog
  "log": "conventional-changelog -p angular -i CHANGELOG.md -s",
  // 重新安装依赖
  "reinstall": "rimraf pnpm-lock.yaml && rimraf package.lock.json && rimraf node_modules && npm run bootstrap",
  // 只允许pnpm
  "preinstall": "npx only-allow pnpm",
  // husky 安装
  "prepare": "husky install"
},
```

## 目录说明

```bash

.
├── build # 打包脚本相关
│   ├── script # 脚本
│   └── vite # vite配置
├── mock # mock文件夹
├── public # 公共静态资源目录
├── src # 主目录
│   ├── api # 接口文件
│   ├── assets # 资源文件
│   │   ├── fonts # 字体文件夹
│   │   ├── icons # svg icon 图标文件夹
│   │   ├── images # 项目存放图片的文件夹
│   │   └── svg # 项目存放svg图片的文件夹
│   ├── components # 公共组件
│   ├── design # 样式文件
│   ├── directives # 指令
│   ├── enums # 枚举/常量
│   ├── hooks # hook
│   │   ├── component # 组件相关hook
│   │   ├── core # 基础hook
│   │   ├── event # 事件相关hook
│   │   ├── setting # 配置相关hook
│   │   └── web # web相关hook
│   ├── layouts # 布局文件
│   │   ├── default # 默认布局
│   │   ├── iframe # iframe布局
│   ├── locales # 多语言(pending)
│   ├── logics # 逻辑
│   ├── main.ts # 主入口
│   ├── router # 路由配置
│   ├── settings # 项目配置
│   │   ├── componentSetting.ts # 组件配置
│   │   ├── designSetting.ts # 样式配置
│   │   ├── localeSetting.ts # 多语言配置(pending)
│   │   ├── projectSetting.ts # 项目配置
│   │   └── siteSetting.ts # 站点配置
│   ├── store # 数据仓库
│   ├── utils # 工具类
│   └── views # 页面
├── test # 测试
│   └── server # 测试服务器
├── types # 类型文件
├── .eslintrc.js # eslint配置文件
├── .prettierrc # prettier配置文件
├── stylelint.config.ts # stylelint配置文件
├── tsconfig.json # ts配置文件
└── vite.config.ts # vite配置文件

```

接下来你可以修改代码进行业务开发了。我们内建了模拟数据、HMR 实时预览、状态管理、国际化、全局路由等各种实用的功能辅助开发，请阅读其他章节了解更多。
