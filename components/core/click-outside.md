# ClickOutside 监听点击外区域

:::tip 温馨提示

对用于弹窗、提示等弹出形式会很有用

:::

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <ClickOutside @click-outside="handleClick(false)">
    <div @click="handleClick(true)">
      {{ showRef ? '当前点击区域外' : '当前点击区域内(默认)' }}
    </div>
  </ClickOutside>
</template>

<script>
import { defineComponent, ref } from 'vue'

import { ClickOutside } from '@/components/ClickOutside'

export default defineComponent({
  components: { ClickOutside },
  setup() {
    const showRef = ref(false)

    function handleClick(v:boolean) {
      showRef.value = v
    }

    return {
      showRef,
      handleClick,
    }
  },
})
</script>
```

</details>

## Events

| 事件         | 参数   | 说明                     |
| ------------ | ---------- | ------------------------ |
| click-outside | - | 点击容器区域以外时触发 |
| mounted | - |  onMounted 时触发 |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| - | 容器区域 |
