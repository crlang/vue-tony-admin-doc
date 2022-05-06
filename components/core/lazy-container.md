# LazyContainer 区域延时加载容器

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div>
    <h1>向下滚动</h1>
    <div style="height: 1000px"></div>
    <LazyContainer>
      <img src="https://cn.bing.com/th?id=0&rf=LaDigue_1920x1080.jpg" />
      <template #skeleton>
        <el-skeleton :rows="20" />
      </template>
    </LazyContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElSkeleton } from 'element-plus'
import { LazyContainer } from '@/components/LazyContainer'

export default defineComponent({
  components: { ElSkeleton, LazyContainer }
})
</script>
```

</details>


## Props

| 属性           | 类型          | 默认值           | 说明                                                 |
| -------------- | ------------- | ---------------- | ---------------------------------------------------- |
| timeout        | `number`      | -                | 等待时间                                             |
| viewport       | `HTMLElement` | -                | 组件所在的视口                                       |
| threshold      | `string`      | `0px`            | 距离多少开始预加载，CSS 单位                         |
| direction      | `string`      | `vertical`       | 视口的滚动方向，可选 `vertical`垂直/`horizontal`水平 |
| tag            | `string`      | `div`            | 包裹组件的外层容器的标签名                           |
| transitionName | `string`      | `lazy-container` | 组件动画名称                                         |
| maxWaitingTime | `number`      | `120`            | 最大等待时间                                         |

:::tip 温馨提示

**timeout** 如果指定了时间，不论可见与否，在指定时间之后自动加载

**viewport** 如果组件是在页面容器内滚动，视口就是该容器

:::

## Events

| 事件 | 参数 | 说明         |
| ---- | ---- | ------------ |
| init | -    | 初始化后触发 |

## Slots

| 名称     | 说明         |
| -------- | ------------ |
| default  | 默认区域     |
| skeleton | 懒加载骨架屏 |
