# Tinymce 富文本编辑器

:::tip 温馨提示

基于 [Tinymce](https://github.com/tinymce/tinymce) 的富文本编辑器

:::

## Usage

```vue
<template>
  <Tinymce v-model:modelValue="value" @change="handleChange" width="100%" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tinymce } from '@/components/Tinymce';

  export default defineComponent({
    components: { Tinymce },
    setup() {
      const value = ref('hello world!');
      function handleChange(value: string) {
        console.table(value);
      }
      return { handleChange, value };
    },
  });
</script>
```

## Props

| 属性            | 类型              | 默认值  | 说明             |
| --------------- | ----------------- | ------- | ---------------- |
| options         | `any`             | `{}`    | tinymce 的配置项 |
| modelValue      | `string`          | -       | 编辑器内容       |
| height          | `number\|string`  | `400`   | 高度             |
| width           | `number\|string`  | `auto`  | 宽度             |
| menubar         | `string\|boolean` | `false` | tinymce 菜单栏   |
| toolbar         | `string[]`        | -       | tinymce 工具栏   |
| plugins         | `string[]`        | -       | tinymce 插件     |
| showImageUpload | `boolean`         | `true`  | 是否显示上传按钮 |

## Events

| 事件       | 参数             | 说明                     |
| ---------- | ---------------- | ------------------------ |
| change     | `(value:string)` | 富文本内容改变触发事件   |
| inited     | -                | 富文本初始化完成触发事件 |
| init-error | -                | 富文本初始化失败触发事件 |
