# 路由

项目路由配置存放于 [src/router/routes](https://github.com/crlang/vue-tony-admin/blob/main/src/router/routes) 下面。 [src/router/routes/modules](https://github.com/crlang/vue-tony-admin/blob/main/src/router/routes/modules)用于存放路由模块，在该目录下的文件会自动注册。

## 配置

### 模块说明

在 [src/router/routes/modules](https://github.com/crlang/vue-tony-admin/blob/main/src/router/routes/modules) 内的 `.ts` 文件会被视为一个路由模块。

一个路由模块包含以下结构

```ts
import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 1,
    icon: 'ep:data-line',
    title: '仪表盘'
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        icon: 'ep:data-line',
        title: '分析页'
      }
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        icon: 'ep:cpu',
        title: '工作台'
      }
    }
  ]
}

export default dashboard
```

### 多级路由

::: warning 注意事项

- 整个项目所有路由 `name` 不能重复
- 所有的多级路由最终都会转成二级路由，所以不能内嵌子路由
- 除了 layout 对应的 path 前面需要加 `/`，其余子路由都不要以`/`开头

:::

**示例**

```ts
import type { AppRouteModule } from '@/router/types'

import { getParentLayout, LAYOUT } from '@/router/constant'

const level: AppRouteModule = {
  path: '/level',
  name: 'Level',
  component: LAYOUT,
  redirect: '/level/menu1/menu1-1/menu1-1-1',
  meta: {
    orderNo: 8,
    icon: 'ep:finished',
    title: '多级菜单'
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      component: getParentLayout('Menu1Demo'),
      meta: {
        title: 'Menu1'
      },
      redirect: '/level/menu1/menu1-1/menu1-1-1',
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          component: getParentLayout('Menu11Demo'),
          meta: {
            title: 'Menu1-1'
          },
          redirect: '/level/menu1/menu1-1/menu1-1-1',
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: () => import('@/views/demo/level/Menu111.vue'),
              meta: {
                title: 'Menu111'
              }
            }
          ]
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          component: () => import('@/views/demo/level/Menu12.vue'),
          meta: {
            title: 'Menu1-2'
          }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      component: () => import('@/views/demo/level/Menu2.vue'),
      meta: {
        title: 'Menu2'
        // ignoreKeepAlive: true,
      }
    }
  ]
}

export default level
```

### Meta 配置说明

```ts
export interface RouteMeta {
  // 排序
  orderNo?: number
  // 标题
  title: string
  // 是否忽略权限，只在权限模式为Role的时候有效
  ignoreAuth?: boolean
  // 角色信息，只在权限模式为Role的时候有效
  roles?: RoleEnum[]
  // 是否不缓存
  ignoreKeepAlive?: boolean
  // 是否固定在选项卡上
  affix?: boolean
  // 选项卡上的图标
  icon?: string
  // 如果为框架容器，请填写框架地址
  frameSrc?: string
  // 当前页面过渡动画名称
  transitionName?: string
  // 从不显示在面包屑中
  hideBreadcrumb?: boolean
  // 隐藏子菜单
  hideChildrenInMenu?: boolean
  // 携带参数
  carryParam?: boolean
  // 内部用于标记单级菜单
  single?: boolean
  // 当前活动菜单
  currentActiveMenu?: string
  // 从不显示在选项卡中
  hideTab?: boolean
  // 是否在菜单中隐藏
  hideMenu?: boolean
  // 是否为链接
  isLink?: boolean
  // 忽略路由。用于在ROUTE_MAPPING以及BACK权限模式下，生成对应的菜单而忽略路由。
  ignoreRoute?: boolean
  // 是否在子级菜单的完整path中忽略本级path
  hidePathForChildren?: boolean
}
```

### 外部页面嵌套

只需要将 `frameSrc` 设置为需要跳转的地址即可

```ts
const IFrame = () => import('@/views/sys/iframe/FrameBlank.vue')
{
  path: 'doc',
  name: 'Doc',
  component: IFrame,
  meta: {
    frameSrc: 'http://tony.crlang.com/doc/',
    title: '项目文档(内嵌)',
  },
}
```

### 外链

只需要将 `path` 设置为需要跳转的**HTTP 地址**即可

```ts
const IFrame = () => import('@/views/sys/iframe/FrameBlank.vue')
{
  path: 'http://tony.crlang.com/doc/',
  name: 'DocExternal',
  component: IFrame,
  meta: {
    title: '项目文档(外链)',
  },
}
```

### 动态路由 Tab 自动关闭功能

若需要开启该功能，需要在动态路由的`meta`中设置如下两个参数：

- `dynamicLevel` 最大能打开的 Tab 标签页数
- `realPath` 动态路由实际路径(考虑到动态路由有时候可能存在 N 层的情况, 例：`/:id/:subId/:...`), 为了减少计算开销, 使用配置方式事先规定好路由的实际路径(注意: 该参数若不设置，将无法使用该功能)

```ts
{
  path: 'detail/:id',
  name: 'TabDetail',
  component: () => import('@/views/demo/feat/tabs/TabDetail.vue'),
  meta: {
    currentActiveMenu: '/feat/tabs',
    title: '详情',
    hideMenu: true,
    dynamicLevel: 3,
    realPath: '/feat/tabs/detail',
  },
}
```

## 图标

这里的 `icon` 默认都是配置 `ep:` 官方图标库，如果想显示位于 [src/assets/icons](https://github.com/crlang/vue-tony-admin/blob/main/src/assets/icons) 本地 svg 图标，请在图标名称末尾加 `|svg`。

- 示例

```bash
# 调用ep 图标库
icon: 'ep:setting'

# 调用本地 svg 图标
icon: 'setting|svg'
```

## 新增路由

### 如何新增一个路由模块

1. 在 [src/router/routes/modules](https://github.com/crlang/vue-tony-admin/blob/main/src/router/routes/modules) 内新增一个模块文件。

示例，新增 test.ts 文件

```ts
import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'

const test: AppRouteModule = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  redirect: '/test/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ep:connection',
    title: '测试',
    orderNo: 999
  },
  children: [
    {
      path: 'index',
      name: 'TestPage',
      component: () => import('@/views/sys/test/index.vue'),
      meta: {
        title: '测试',
        icon: 'ep:connection',
        hideMenu: true
      }
    }
  ]
}

export default test
```

此时路由已添加完成，不需要手动引入，放在[src/router/routes/modules](https://github.com/crlang/vue-tony-admin/blob/main/src/router/routes/modules) 内的文件会自动被加载。

- 访问 **ip:端口/test/index** 出现对应组件内容即代表成功

## 路由刷新

项目中采用的是**重定向**方式

### 刷新

```ts
...
async refreshPage(router: Router) {
  const { currentRoute } = router
  const route = unref(currentRoute)
  const name = route.name

  const findTab = this.getCachedTabList.find((item) => item === name)
  if (findTab) {
    this.cacheTabList.delete(findTab)
  }
  const redo = useRedo(router)
  await redo()
},
...
```

### 重定向

[src/views/sys/redirect/index.vue](https://github.com/crlang/vue-tony-admin/blob/main/src/views/sys/redirect/index.vue)

```ts
import { unref } from 'vue'
import { useRouter } from 'vue-router'
const { currentRoute, replace } = useRouter()
const { params, query } = unref(currentRoute)
const { path, _redirect_type = 'path' } = params

Reflect.deleteProperty(params, '_redirect_type')
Reflect.deleteProperty(params, 'path')
const _path = Array.isArray(path) ? path.join('/') : path
if (_redirect_type === 'name') {
  replace({
    name: _path,
    query,
    params
  })
} else {
  replace({
    path: _path.startsWith('/') ? _path : `/${_path}`,
    query
  })
}
```

## 页面跳转

页面跳转建议采用项目提供的 `useGo`

### 方式

```ts
import { PageEnum } from '@/enums/pageEnum'
import { useGo } from '@/hooks/web/usePage'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const go = useGo()

    // 执行刷新
    go()
    go(PageEnum.BASE_HOME)
    return {}
  }
})
```

## 多标签页

标签页使用的是 `keep-alive` 和 `router-view` 实现，实现切换 tab 后还能保存切换之前的状态。

### 如何开启页面缓存

开启缓存有 3 个条件

1. 在 [src/settings/projectSetting.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/settings/projectSetting.ts) 内将`openKeepAlive` 设置为 `true`
2. 路由设置 `name`，且**不能重复**
3. 路由对应的组件加上 `name`，与路由设置的 `name` 保持一致

```ts
  {
    ...
    // name
    name: 'Login',
    // 对应组件组件的name
    component: () => import('@/views/sys/login/index.vue'),
    ...
  },

  // @/views/sys/login/index.vue
  ...
  export default defineComponent({
    // 需要和路由的name一致
    name:"Login"
  });
  ...
```

:::warning 注意

keep-alive 生效的前提是：需要将路由的 `name` 属性及对应的页面的 `name` 设置成一样。因为：**只有名称匹配的组件会被缓存**

:::

### 如何让某个页面不缓存

**可在 router.meta 下配置**

可以将 `ignoreKeepAlive` 配置成 `true` 即可关闭缓存。

```ts
{
  ...
  name: 'Test',
  component: () => import('@/views/demo/test.vue'),
  meta: {
    ignoreKeepAlive: true,
  }
  ...
}
```

## 如何更改首页路由

首页路由指的是应用程序中的默认路由，当不输入其他任何路由时，会自动重定向到该路由下，并且该路由在 Tab 上是固定的，即使设置`affix: false`也不允许关闭

例：首页路由配置的是`/dashboard/analysis`，那么当直接访问 `http://localhost:3100/` 会自动跳转到`http://localhost:3100/#/dashboard/analysis` 上(用户已登录的情况下)

可以将 [src/enums/pageEnum.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/enums/pageEnum.ts) 中的`BASE_HOME`更改为需要你想设置的首页即可

```ts
export enum PageEnum {
  BASE_HOME = '/dashboard'
}
```
