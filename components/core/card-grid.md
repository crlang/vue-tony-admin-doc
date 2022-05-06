# CardGrid 栅格卡片

## CardGrid 栅格卡片

### Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <CardGrid center title="标题">
    <CardGridItem>项目A</CardGridItem>
    <CardGridItem>项目B</CardGridItem>
    <CardGridItem>项目C</CardGridItem>
  </CardGrid>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { CardGrid, CardGridItem } from '@/components/CardGrid'

export default defineComponent({
  components: { CardGrid, CardGridItem }
})
</script>
```

</details>

### Props

| 属性   | 类型           | 默认值  | 说明           |
| ------ | -------------- | ------- | -------------- |
| title  | `string\|slot` | -       | 卡片标题       |
| center | `boolean`      | `false` | 内容项是否居中 |

### Slots

| 名称  | 说明                         |
| ----- | ---------------------------- |
| extra | 标题右侧区域                 |
| -     | 存放 `CardGridItem` 组件列表 |

## CardGridItem 栅格项

### Slots

| 名称 | 说明       |
| ---- | ---------- |
| -    | 格子内容项 |
