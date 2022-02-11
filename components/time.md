# Time 相对时间


## Usage

```vue
<template>
  <Time :value="time" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Time } from '@/components/Time'

export default defineComponent({
  components: { Time },
  setup() {
    const now = new Date().getTime()
    const time = now - 60 * 3 * 1000

    return {
      time,
      now,
    }
  },
})
</script>
```

## Props

| 属性 | 类型 | 默认值 |  说明 |
| --- | --- | --- | --- |
| value | `string,date,number` | - | 时间值 |
| step | `number` | `60` | - | 刷新时间 |
| mode | `string` | `relative` | 显示模式，可选 `date`日期/`datetime`时间戳/`relative`相对时间 |
