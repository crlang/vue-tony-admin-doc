# icon 图标


## Icon 文本图标

::: tip 温馨提示
用于项目内组件的展示，基本支持所有图标库（按需加载）
:::


:::tip 温馨提示
Icon 的值可以在下方图标库中查看

👉👉👉 [Iconify 图标库](https://iconify.design)

👉👉👉 [Netlify 图标库](https://icones.netlify.app)
:::


### Usage

```vue
<template>
  <Icon icon="ep:view"></Icon>
</template>

<script>
import { defineComponent } from 'vue'
import { Icon } from '@/components/Icon'

export default defineComponent({
  components: { Icon },
})
</script>
```

### Props

| 属性   | 类型     | 默认值 | 说明     |
| ------ | -------- | ------ | -------- |
| icon   | `string` | -      | 图标名   |
| color  | `string` | -      | 图标颜色 |
| size   | `number,string` | `16`     | 图标大小 |
| spin   | `boolean` | `false`     | 图标是否旋转 |
| prefix | `string` | -      | 图标前缀，如 `ep:view` 中的 `ep` |


::: tip 温馨提示
如果 `icon` 值以 `|svg` 结尾，则会渲染成 [SvgIcon 组件](#SvgIcon)

如果 `icon` 值填写了完整的 `ep:view` ，那么 `prefix` 不需要填写 `ep`
:::



## SvgIcon SVG图标

::: tip 温馨提示
用于项目内 svg 图标的展示，svg存放在 `src/assets/icons` 目录下
:::


### Usage

```vue
<template>
  <div>
    <SvgIcon name="test"> </SvgIcon>
  </div>
</template>

<script>
import { SvgIcon } from '@/components/Icon'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { SvgIcon },
})
</script>
```


### Props

| 属性 | 类型     | 默认值 | 说明       |
| ---- | -------- | ------ | ---------- |
| name | `string` | -      | svg 图标名，名称对应svg文件的名称 |
| size | `number,string` | 16     | 图标大小   |
| spin   | `boolean` | `false`     | 图标是否旋转 |
| prefix | `string` | -      | 图标前缀 |


## IconPicker 图标选择器


:::tip 温馨提示
本组件详细说明请参阅[图标选择器](../dep/icon.html#图标选择器)
:::


### Usage

```vue
<template>
  <div>
    <IconPicker />
  </div>
</template>

<script>
import { IconPicker } from '@/components/Icon'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { IconPicker },
})
</script>
```

### Props

| 属性     | 类型      | 默认值    | 说明                                          |
| -------- | --------- | --------- | --------------------------------------------- |
| value    | `string`  | -      | 默认icon值                                          |
| width    | `string`  | `300px`      | 宽度                                          |
| copy     | `boolean` | `false`     | 是否可以复制                                  |
| mode     | `string`  | `iconify` | 备选图标池，可选`svg`时，会读取所有 svg 图标 |


:::tip 温馨提示
- `mode`为`iconify`时，会使用预生成的[图标集数据](../dep/icon.html#图标集预生成)作为备选图标池

- `mode`为`svg`时，会使用 `/src/assets/icons` 下的所有svg图标（可包含一级子目录）作为备选图标池，详见[vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md#vite-plugin-svg-icons)。
:::
