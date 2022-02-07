# Basic 基础组件

一些比较基础的通用组件使用方式


## BasicArrow 带动画箭头


### Usage

```vue
<template>
  <div>
    <BasicArrow :expand="false" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { BasicArrow } from '@/components/Baisc'

export default defineComponent({
  components: { BasicArrow },
})
</script>
```

### Props

| 属性   | 类型      | 默认值  | 说明                          |
| ------ | --------- | ------- | ----------------------------- |
| expand | `boolean` | `false` | 箭头展开状态                  |
| default | `string` | `down` | 箭头默认朝向，可选 `up`/`down`/`left`/`right` |


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
import { BasicHelp } from '@/components/Baisc'

export default defineComponent({
  components: { BasicHelp },
})
</script>
```

### Props

| 属性      | 类型               | 默认值  | 可选值 | 说明                                     |
| --------- | ------------------ | ------- | ------ | -------------------------------------- |
| text      | `string｜string[]` | -       | -      | 文本列表                                |
| showIndex | `boolean`          | `true`    | -      | 是否显示序号,在 text 为 string[]情况下生效 |
| effect     | `string`          | `dark`    | `light/dark` | 主题色 |
| placement | `string`           | `right` | `- 参考 Tooltip 组件 -` | 显示方向              |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | `Help` 图标 |


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
  components: { BasicTitle },
})
</script>
```

### Props

| 属性        | 类型               | 默认值  | 说明                     |
| ----------- | ------------------ | ------- | ------------------------ |
| helpMessage | `string｜string[]` | -       | 标题右侧帮助(`Help`)按钮信息 |
| span        | `boolean`          | `false` | 是否显示标题左侧蓝色色块   |
| bold      | `boolean`            | `false`  | 是否加粗标题            |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 标题文本 |
