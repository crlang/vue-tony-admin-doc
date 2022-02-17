# Page 页面容器


## PageWrapper 页面外层容器

:::tip 温馨提示
用于包裹页面组件，统一化页面布局
:::

### Usage

```vue
<template>
  <PageWrapper title="页面标题" description="页面描述">
    <template #extra>header extra</template>
  </PageWrapper>
</template>

<script>
import { PageWrapper } from '@/components/Page'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { PageWrapper },
  setup() {
    return {}
  },
})
</script>
```


### Props

| 属性              | 类型               | 默认值 | 说明                            |
| ----------------- | ------------------ | ------ | ------------------------------- |
| title             | `string`           | -      | 页面头部标题                |
| description           | `string`           | -      | 页面头部描述         |
| headerFullHeight      | `boolean`           | `false`      | 头部区域是否去除 padding                    |
| headerFixed       | `boolean`          | `false`  | 固定头部区域                |
| contentClass      | `string`           | -      | 主体区域 class                  |
| contentBackground | `boolean`          | `false`      | 主体区域是否添加背景                    |
| contentFullHeight | `boolean`          | `false`  | 主体区域是否去除 padding    |


### Slots

| 名称          | 说明                |
| ------------- | ------------------- |
| footer       | 底部区域，此具有高优先级 |
| leftFooter    | 底部左侧区域 |
| rightFooter   | 底部右侧区域 |
| title | 头部标题区域 |
| description | 头部描述区域 |
| extra | 头部拓展区域 |
| default       | 主体区域            |
