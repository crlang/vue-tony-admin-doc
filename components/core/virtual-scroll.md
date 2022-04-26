# VirtualScroll 虚拟滚动容器

:::tip 温馨提示

适用于大量数据，能有效改善浏览器加载导致的卡顿

:::

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <VirtualScroll :itemHeight="60" :listData="data" :height="300">
    <template #default="{ item, index }">
      <div>{{ index }} - {{ item.title }}</div>
    </template>
  </VirtualScroll>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VirtualScroll } from '@/components/VirtualScroll'

export default defineComponent({
  components: { VirtualScroll },
  setup() {
    const data = []
    for (let index = 1; index < 20000; index++) {
      data.push({
        title: '列表项' + index
      })
    }

    return { data }
  }
})
</script>
```

</details>

## Props

| 属性       | 类型             | 默认值 | 说明                                  |
| ---------- | ---------------- | ------ | ------------------------------------- |
| height     | `string\|number` | -      | 滚动容器高度，支持数字或 CSS 单位     |
| width      | `string\|number` | -      | 滚动容器宽度，支持数字或 CSS 单位     |
| itemHeight | `number`         | -      | 每个选项高度，必填                    |
| listData   | `Recordable[]`   | -      | 选项数据列表                          |
| maxHeight  | `string\|number` | -      | 滚动容器最大高度，支持数字或 CSS 单位 |
| maxWidth   | `string\|number` | -      | 滚动容器最大宽度，支持数字或 CSS 单位 |
| minHeight  | `string\|number` | -      | 滚动容器最小高度，支持数字或 CSS 单位 |
| minWidth   | `string\|number` | -      | 滚动容器最小宽度，支持数字或 CSS 单位 |

## Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 存放每个数据项内容 |
