# Basic 标题及帮助

:::tip 温馨提示

一些比较基础的通用组件

:::

## BasicHelp 帮助按钮

### Usage

```vue
<template>
  <div>
    <BasicHelp :text="['提示1', '提示2']" />
    <BasicHelp text="提示" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { BasicHelp } from '@/components/Basic'

export default defineComponent({
  components: { BasicHelp }
})
</script>
```

### Props

| 属性      | 类型               | 默认值  | 说明                                |
| --------- | ------------------ | ------- | ----------------------------------- |
| text      | `string｜string[]` | -       | 文本列表                            |
| showIndex | `boolean`          | `true`  | 是否显示序号,文本为数组才能生效     |
| effect    | `string`           | `dark`  | 主题色，可选 `light`、`dark`        |
| placement | `string`           | `right` | 弹出显示方向，参考 `ElTooltip` 组件 |

### Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 默认为 `Help` 图标 |

## BasicTitle 基础标题，带帮助按钮

### Usage

```vue
<template>
  <div>
    <BasicTitle helpMessage="提示1">标题</BasicTitle>
    <BasicTitle :helpMessage="['提示1', '提示2']">标题</BasicTitle>
  </div>
</template>

<script>
import { BasicTitle } from '@/components/Basic'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BasicTitle }
})
</script>
```

### Props

| 属性        | 类型               | 默认值  | 说明                         |
| ----------- | ------------------ | ------- | ---------------------------- |
| bold        | `boolean`          | `false` | 是否加粗标题                 |
| span        | `boolean`          | `false` | 是否显示标题左侧色块         |
| helpMessage | `string｜string[]` | -       | 标题右侧帮助(`Help`)按钮信息 |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 放置标题文本内容 |
