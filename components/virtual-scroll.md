# VirtualScroll 虚拟滚动容器


:::tip 温馨提示
用于大量数据纯展示时使用
:::


## Usage

```vue
<template>
  <div>
    <VScroll
      :itemHeight="60"
      :items="data"
      :height="300">
      <template #default="{ item }">
        <div>
          {{ item.title }}
        </div>
      </template>
    </VScroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VScroll } from '@/components/VirtualScroll'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { VScroll, PageWrapper },
  setup() {
    const data = []
    for (let index = 1; index < 20000; index++) {
      data.push({
        title: '列表项' + index,
      })
    }

    return { data }
  },
})
</script>
```

## Props

| 属性       | 类型             | 默认值 | 说明               |
| ---------- | ---------------- | ------  | ------------------ |
| height     | `string/number` | -       | 高度               |
| width      | `string/number` | -       | 宽度               |
| maxHeight  | `string/number` | -       | 最大高度           |
| maxWidth   | `string/number` | -       | 最大宽度           |
| minHeight  | `string/number` | -       | 最小高度           |
| minWidth   | `string/number` | -       | 最小宽度           |
| itemHeight | `string/number` | -       | 每个选项高度，必填 |
| items      | `any[]`          | -       | 选项列表           |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | 默认 |
