# Transition 页面/组件切换动画

## Usage

```vue
<template>
  <Button type="primary" @click="start">start</Button>
  <ScaleTransition>
    <span v-show="show">示例</span>
  </ScaleTransition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ScaleTransition } from '@/components/Transition'

export default defineComponent({
  components: { ScaleTransition },
  setup() {
    const show = ref(true)

    function start() {
      show.value = false
      setTimeout(() => {
        show.value = true
      }, 300)
    }
    return { show, start }
  },
})
</script>
```


## Components

:::tip 温馨提示
可用以下组件

`FadeTransition`

`ScaleTransition`

`SlideYTransition`

`ScrollYTransition`

`SlideYReverseTransition`

`ScrollYReverseTransition`

`SlideXTransition`

`ScrollXTransition`

`SlideXReverseTransition`

`ScrollXReverseTransition`

`ScaleRotateTransition`

`ExpandXTransition`

`ExpandTransition`

:::
