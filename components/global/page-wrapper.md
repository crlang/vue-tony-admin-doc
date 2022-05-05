# PageWrapper 页面外层容器

:::tip 温馨提示

用于包裹页面组件，统一化页面布局。

PS: 组件已全局注册，直接使用即可

:::

### Usage

```vue
<template>
  <PageWrapper title="页面标题" description="页面描述">
    <template #extra>header extra</template>
  </PageWrapper>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    return {}
  }
})
</script>
```

### Props

| 属性              | 类型      | 默认值  | 说明                 |
| ----------------- | --------- | ------- | -------------------- |
| title             | `string\|slot`  | -       | 头部标题         |
| description       | `string\|slot`  | -       | 头部描述         |
| headerClass       | `boolean` | `false` | 头部 class     |
| headerFixed       | `boolean` | `false` | 头部是否固定     |
| contentClass      | `string`  | -       | 内容区 class       |
| contentBackground | `boolean` | `false` | 内容区是否添加背景 |
| contentFullHeight | `boolean` | `false` | 内容区是否高度占满 |

### Slots

| 名称        | 说明                     |
| ----------- | ------------------------ |
| extra       | 头部描述下方拓展区域     |
| toolbar     | 头部右侧区域             |
| footer      | 底部区域 |
| default     | 主体区域                 |
