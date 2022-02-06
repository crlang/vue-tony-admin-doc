# CountDown 倒计时

## CountButton 倒计时按钮

### Usage

```vue
<template>
  <CountButton />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CountButton } from '@/components/CountDown'

export default defineComponent({
  components: { CountButton },
})
</script>
```

### Props

| 属性            | 类型          | 默认值 | 可选值 | 说明                                         |
| --------------- | ------------- | ------ | ------ | -------------------------------------------- |
| count           | `number`      | `60`   | -      | 倒计时时间                                   |
| beforeStartFunc | `()=>promise` | -      | -      | 倒计时之前执行的函数，返回 true 才会开始执行倒计时 |

## CountDownInput 带输入框倒计时

### Usage

```vue
<template>
  <CountdownInput />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CountdownInput } from '@/components/CountDown'

export default defineComponent({
  components: { CountdownInput },
})
</script>
```

### Props

参考 CountButton
