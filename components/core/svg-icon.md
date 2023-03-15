# SvgIcon SVG 图标

::: tip 温馨提示

用于项目内 svg 图标的展示，svg 存放在 `src/assets/icons` 目录下

:::

## Usage

```vue
<template>
  <div>
    <SvgIcon name="test" />
  </div>
</template>

<script>
import { SvgIcon } from '@/components/SvgIcon'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { SvgIcon }
})
</script>
```

### Props

| 属性   | 类型             | 默认值  | 说明                                        |
| ------ | ---------------- | ------- | ------------------------------------------- |
| name   | `string`         | -       | svg 图标名，名称对应 svg 文件的名称         |
| size   | `number\|string` | -       | 图标大小，默认继承上级字体大小              |
| spin   | `boolean`        | `false` | 图标是否带旋转动画                          |
| color  | `string`         | -       | 图标颜色，默认继承                          |
| prefix | `string`         | 'icon'  | SymbolId 命名前缀，如无特殊使用，可不予理会 |
