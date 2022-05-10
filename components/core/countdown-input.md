# CountdownInput 验证码输入框

::: tip 温馨提示

- **💡💡💡保持💡💡💡** [Element Plus Input 组件](https://element-plus.org/zh-CN/component/input.html) **原有功能**的情况下扩展以下属性

:::

### Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <CountdownInput v-model="smsCode" placeholder="请输入验证码" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CountdownInput } from '@/components/CountdownInput'

export default defineComponent({
  components: { CountdownInput },
  setup() {
    const smsCode = ref('')

    return {
      smsCode
    }
  }
})
</script>
```

</details>

### Props

| 属性        | 类型                   | 默认值 | 说明                 |
| ----------- | ---------------------- | ------ | -------------------- |
| modelValue  | `number\|string`       | -      | 输入框的值           |
| count       | `number`               | `60`   | 倒计时时间           |
| sendCodeApi | `()=>promise(boolean)` | -      | 发送倒计时的函数方法 |
