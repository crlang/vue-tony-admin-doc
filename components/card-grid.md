# CardGrid 栅格卡片


## CardGrid 栅格卡片

### Usage

```vue
<template>
  <CardGrid
    center
    header="标题"
    shadow="always">
    <CardGridItem>项目A</CardGridItem>
    <CardGridItem>项目B</CardGridItem>
    <CardGridItem>项目C</CardGridItem>
  </CardGrid>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CardGrid, CardGridItem } from '@/components/CardGrid'

export default defineComponent({
  components: { CardGrid, CardGridItem },
})
</script>
```

### Props

| 属性            | 类型          | 默认值  | 说明                   |
| --------------- | ------------- | ------  | -------------------------- |
| header          | `string` \| `slot`     | - | 卡片标题 |
| center          | `boolean`      | `false`  | 格子内容项是否居中 |
| rows            | `number`      | `3`   | - | 每行格子数量 |
| shadow          | `string`      | `never`  | 卡片阴影，可选 `always`/`hover`/`never` |

### Slots

| 名称          | 说明                |
| ------------- | ------------------- |
| -             | 存放 `CardGridItem` 组件列表 |


## CardGridItem 栅格项

### Slots

| 名称          | 说明                |
| ------------- | ------------------- |
| -             | 格子内容项  |
