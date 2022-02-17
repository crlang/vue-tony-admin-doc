# Markdown 编辑器

:::tip 温馨提示
基于 [Vditor](https://github.com/Vanessa219/vditor) 的 MarkDown 编辑器
:::


## Usage

```vue
<template>
  <Button @click="toggleTheme" class="mb-6">黑暗主题</Button>
  <MarkDown
    v-model:value="markdownValue"
    ref="markDownRef"
    placeholder="这是占位文本" />
</template>

<script lang="ts">
import type { MarkDownActionType } from '@/components/Markdown'

import { defineComponent, ref, unref } from 'vue'
import { MarkDown } from '@/components/Markdown'

export default defineComponent({
  components: { MarkDown },
  setup() {
    const markDownRef = ref<Nullable<MarkDownActionType>>(null)
    const themeName = ref<'classic'|'dark'>('dark')
    const markdownValue = ref(`
# title

# content
`)
    function toggleTheme() {
      const markDown = unref(markDownRef)
      if (!markDown) return
      const vditor = markDown.getVditor()
      themeName.value = themeName.value === 'dark' ? 'classic' : 'dark'
      vditor.setTheme(themeName.value)
    }

    return {
      markdownValue,
      toggleTheme,
      markDownRef
    }
  },
})
</script>
```


## Props

::: tip 温馨提示
- **保持** [vidtor 编辑器](https://b3log.org/vditor/) **原有功能**的情况下扩展以下属性
:::

| 属性    | 类型     | 默认值 | 说明           |
| ------- | -------- | ------| -------------- |
| value | `string` | -    | 文本值 |
| height  | `number` | -   | 高度           |


## Events

| 名称  | 参数   | 说明         |
| ----- | ---------- | ------------ |
| change | `(value)` | 修改时触发 |
| get | `(vidtor)` | 初始化后触发 |


### Methods

| 名称      | 参数   | 说明             |
| --------- | ---------- | ---------------- |
| getVditor | `(vditorOption)` | 获取 vditor 实例 |
