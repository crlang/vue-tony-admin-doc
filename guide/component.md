# 组件注册

## 按需引入

项目目前的组件注册机制是按需注册，是在需要用到的页面才引入。

```vue
<template>
  <ElButton> Yo <ElButton>
</template>
<script>
import { ElButton } from 'element-plus';
export default defineComponent({
  components: {
    ElButton
  },
})
</script>
```

### tsx 文件注册

**tsx 文件内不能使用全局注册组件**

```jsx
import { ElButton } from 'element-plus'

export default defineComponent({
  setup() {
    return () => <ElButton>{'Yo'}</ElButton>
  }
})
```

## 全局注册

如果不习惯按需引入方式，可以进行全局注册。全局注册也分两种方式

### 全局按需注册

只注册需要的组件

代码地址：[src/components/registerGlobComp.ts](https://github.com/crlang/vue-tony-admin/blob/main/src/components/registerGlobComp.ts)

```ts
import { ElButton, ElSelect } from 'element-plus'

export function registerGlobComp(app: App) {
  app.use(ElButton).use(ElSelect)
}
```

### 全量注册

- 在`main.ts`内

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(ElementPlus)
```
