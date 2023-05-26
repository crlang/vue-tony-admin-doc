# 引入外部模块

除了自带组件以外，有时我们还需要引入其他外部模块。我们以 `element-plus` 为例：

## 安装

安装 `element-plus`

```bash
# 在终端输入下面的命令完成安装
pnpm add element-plus
```

## 使用

### 全局使用

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

### 局部使用

```vue
<template>
  <ElButton>text</ElButton>
</template>

<script>
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  components: {
    ElButton
  }
})
</script>
```

## 注意

- 如果组件有依赖样式，则需要再引入样式文件
