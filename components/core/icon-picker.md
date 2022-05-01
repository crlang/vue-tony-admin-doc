## IconPicker 图标选择器

### Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <IconPicker />
</template>

<script>
import { IconPicker } from '@/components/IconPicker'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { IconPicker }
})
</script>
```

</details>


### Props

| 属性       | 类型      | 默认值    | 说明                        |
| ---------- | --------- | --------- | --------------------------- |
| modelValue | `string`  | -         | 默认 icon 值                |
| width      | `string`  | `300px`   | 选择框宽度                  |
| copy       | `boolean` | `false`   | 是否可以复制                |
| mode       | `string`  | `iconify` | 图标池，可选`svg`/`iconify` |

**`mode`为`iconify`时**

> 会使用预生成的图标集数据作为图标池

> 图标集数据所在位置为`IconPicker`组件下的`data/index.ts`文件

根据所需图标，添加相应的图标名称即可。

:::tip 温馨提示

图标集数据可以在下方图标库中查看

👉👉👉 [Iconify 图标库](https://iconify.design)

👉👉👉 [Netlify 图标库](https://icones.netlify.app)

:::

**`mode`为`svg`时**

> 会使用 `/src/assets/icons` 下的所有 svg 图标（包含一级子目录）作为图标池

<!-- > 详见[vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md) -->
