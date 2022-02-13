# ScrollContainer 区域滚动容器


## Usage

```vue
<template>
  <Button @click="scrollTo(100)">滚动到100px位置</Button>
  <Button @click="scrollTo(800)">滚动到800px位置</Button>
  <Button @click="scrollTo(0)">滚动到顶部</Button>
  <Button @click="scrollBottom()">滚动到底部</Button>
  <ScrollContainer ref="scrollRef">
    <div v-for="index in 100" :key="index" style="height: 50px;border-bottom: 1px solid #bbb"></div>
  </ScrollContainer>
</template>

<script lang="ts">
import type { ScrollActionType } from '@/components/Container'

import { defineComponent, ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { ScrollContainer } from '@/components/Container'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  components: { ElButton, ScrollContainer, PageWrapper },
  setup() {
    const scrollRef = ref<Nullable<ScrollActionType>>(null)
    const getScroll = () => {
      const scroll = unref(scrollRef)
      if (!scroll) {
        throw new Error('scroll is Null')
      }
      return scroll
    }

    function scrollTo(top: number) {
      getScroll().scrollTo(top)
    }
    function scrollBottom() {
      getScroll().scrollBottom()
    }
    return {
      scrollTo,
      scrollRef,
      scrollBottom,
    }
  },
})
</script>
```


## Methods

| 名称          | 参数                             | 说明            |
| ------------- | ------------------------------------ | --------------- |
| getScrollWrap | -                  | 获取滚动容器 |
| scrollBottom  | -                           | 滚动到底部      |
| scrollTo      | `(to:number,duration = 500)` | 滚动到指定位置  |


## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认区域 |
