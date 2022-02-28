# Tinymce 富文本编辑器


## Usage

```vue
<template>
  <Tinymce v-model:value="value" @change="handleChange" width="100%" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tinymce } from '@/components/Tinymce'

export default defineComponent({
  components: { Tinymce },
  setup() {
    const value = ref('hello world!')
    function handleChange(value: string) {
      console.log(value)
    }
    return { handleChange, value }
  },
})
</script>
```


## Props

| 属性            | 类型              | 默认值 | 说明             |
| --------------- | ----------------- | ------ | ---------------- |
| options         | `any`             | {}     | tinymce 的配置项 |
| modelValue  | `string`          | -      | 编辑器内容       |
| height          | `number / string` | 400    | 高度             |
| width           | `number / string` | auto   | 宽度             |
| toolbar         | `string[]`        | -      | tinymce 工具栏           |
| plugins         | `string[]`        | -      | tinymce 插件             |
| showImageUpload | `boolean`         | true   | 是否显示上传按钮 |


## Events

| 事件   | 参数           | 返回值 | 说明                   |
| ------ | ------------------ | ------ | ---------------------- |
| change | `(value:string)` |        | 富文本内容改变触发事件 |
