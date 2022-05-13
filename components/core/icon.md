# Icon 图标

::: tip 温馨提示

用于项目内组件的展示，基本支持图标库所有图标（按需加载）

:::

:::tip 温馨提示

Icon 的值可以在下方图标库中查看

👉👉👉 [Iconify 图标库](https://iconify.design)

👉👉👉 [Netlify 图标库](https://icones.netlify.app)

:::

## Usage

```vue
<template>
  <Icon name="ep:view" />
</template>

<script>
import { defineComponent } from 'vue'
import { Icon } from '@/components/Icon'

export default defineComponent({
  components: { Icon }
})
</script>
```

## Props

| 属性   | 类型            | 默认值  | 说明                             |
| ------ | --------------- | ------- | -------------------------------- |
| name   | `string`        | -       | 图标名                           |
| color  | `string`        | -       | 图标颜色                         |
| size   | `number,string` | `16`    | 图标大小                         |
| spin   | `boolean`       | `false` | 图标是否带旋转动画               |
| prefix | `string`        | -       | 图标前缀，如 `ep:view` 中的 `ep` |

::: tip 温馨提示

如果 `name` 值填写了完整带前缀的 `ep:view` ，那么 `prefix` 不需要填写 `ep`

:::
