# Transition 组件切换动画

:::tip 温馨提示

Transition 组件下级根节点只能存在一个 DOM 元素

:::

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div>
    <el-button type="primary" @click="start">start</el-button>
    <ScaleTransition>
      <div class="box" v-if="show">动画内容区</div>
    </ScaleTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

import { ScaleTransition } from '@/components/Transition'

export default defineComponent({
  components: { ElButton, ScaleTransition },
  setup() {
    const show = ref(false)

    function start() {
      show.value = true
      setTimeout(() => {
        show.value = false
      }, 500)
    }
    return { show, start }
  }
})
</script>

<style lang="scss" scoped>
.box {
  width: 236px;
  height: 236px;
  margin-top: 20px;
  background-color: #7eaaec;
}
</style>
```

</details>

## Components

| 名称       | 组件                       | 说明 |
| ---------- | -------------------------- | ---- |
| 淡入       | `FadeTransition`           | -    |
| 侧边淡入   | `FadeSlideTransition`      | -    |
| 底部淡入   | `FadeBottomTransition`     | -    |
| 顶部淡入   | `FadeTopTransition`        | -    |
| 放大并淡入 | `FadeScaleTransition`      | -    |
| 放大       | `ScaleTransition`          | -    |
| 旋转并放大 | `ScaleRotateTransition`    | -    |
| 下滑       | `SlideTransition`          | -    |
| 左滑       | `SlideXTransition`         | -    |
| 上滑       | `SlideReverseTransition`   | -    |
| 右滑       | `SlideXReverseTransition`  | -    |
| 下滚       | `ScrollTransition`         | -    |
| 左滚       | `ScrollXTransition`        | -    |
| 上滚       | `ScrollReverseTransition`  | -    |
| 右滚       | `ScrollXReverseTransition` | -    |
| 淡入并缩放 | `ZoomFadeTransition`       | -    |
| 放大       | `ZoomOutTransition`        | -    |
| 向下展开   | `ExpandTransition`         | -    |
| 向右展开   | `ExpandXTransition`        | -    |
