# StrengthMeter 校验密码强度

## Usage

```vue
<template>
  <StrengthMeter placeholder="默认" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StrengthMeter from '@/components/StrengthMeter'

export default defineComponent({
  components: {
    StrengthMeter,
  },
});
</script>
```

## Props

| 属性      | 类型      | 默认值 | 可选值 | 说明           |
| --------- | --------- | ------ | ------ | -------------- |
| value     | `string`  | -      | -      | 校验的值       |
| showInput | `boolean` | `true`   | -      | 是否显示 input |
| disabled  | `boolean` | `false`  | -      | 是否禁用       |

## Events

| 事件         | 参数 | 说明             |
| ------------ | -------- | ---------------- |
| score-change | `(value: number)` | 强度值改变触发   |
| change       | `(value: string)` | input 值改变触发 |
