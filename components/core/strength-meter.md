# StrengthMeter 校验密码强度

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <StrengthMeter placeholder="默认" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { StrengthMeter } from '@/components/StrengthMeter'

export default defineComponent({
  components: {
    StrengthMeter
  }
})
</script>
```

</details>

## Props

| 属性       | 类型      | 默认值  | 说明           |
| ---------- | --------- | ------- | -------------- |
| modelValue | `string`  | -       | 校验的值       |
| showInput  | `boolean` | `true`  | 是否显示输入框 |
| disabled   | `boolean` | `false` | 是否禁用       |

## Events

| 事件         | 参数              | 说明                 |
| ------------ | ----------------- | -------------------- |
| score-change | `(value: number)` | 密码强度值改变时触发 |
| change       | `(value: string)` | 输入框值改变时触发   |
