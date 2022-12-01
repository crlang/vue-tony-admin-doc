# CollapseContainer 区域折叠容器

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <CollapseContainer>content</CollapseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { CollapseContainer } from '@/components/CollapseContainer'

export default defineComponent({
  components: {
    CollapseContainer
  }
})
</script>
```

</details>

## Props

| 属性        | 类型              | 默认值  | 说明             |
| ----------- | ----------------- | ------- | ---------------- |
| title       | `string\|slot`    | -       | 标题             |
| helpMessage | `string,string[]` | -       | 标题右侧温馨提示 |
| canExpan    | `boolean`         | `true`  | 是否可以展开     |
| loading     | `boolean`         | `false` | 显示加载骨架     |

## Slots

| 名称    | 说明               |
| ------- | ------------------ |
| title   | 自定义标题         |
| extra   | 自定义右侧操作按钮 |
| default | 默认区域           |
| footer  | 自定义底部区域     |

## Events

| 名称   | 参数 | 说明            |
| ------ | ---- | --------------- |
| expand | -    | 展开/收缩时触发 |
