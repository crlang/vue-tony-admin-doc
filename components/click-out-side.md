# ClickOutSide 监听点击区域

## Usage

```vue
<template>
  <ClickOutSide @click-outside="() => (showRef = false)">
    <div @click="() => (showRef = true)">
      {{ showRef ? '当前点击区域外' : '当前点击区域内(默认)' }}
    </div>
  </ClickOutSide>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ClickOutSide } from '@/components/ClickOutSide'

export default defineComponent({
  components: { ClickOutSide },
  setup() {
    const showRef = ref(false)

    return {
      showRef,
    }
  },
})
</script>
```

## Events

| 事件         | 回调参数   | 说明                     |
| ------------ | ---------- | ------------------------ |
| click-outside | `()=>void` | 点击包裹元素外部区域触发 |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| - | 被包裹的内容 |
