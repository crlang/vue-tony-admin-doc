# Progress 进度条图形


## CircleProgress 圆形进度


### Usage

```vue
<template>
  <CircleProgress />
</template>

<script>
import { CircleProgress } from '@/components/Progress'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CircleProgress },
  setup() {
    return {}
  },
})
</script>
```


### Props

| 属性              | 类型               | 默认值 | 说明                            |
| ----------------- | ------------------ | ------ | ------------------------------- |
| size             | `number` | `32`      | 圆形大小(px)                 |
| progress      | `boolean` | `100`      | 圆形百分比进度，最大值 100 (%)                    |
| isAnimation | `boolean` | `true`      | 是否开启进度动画                    |
| width           | `string` | `2`      | 进度条大小(px)         |
| color       | `boolean` | `#22CCE2`  | 进度条颜色                |
| background      | `string` | `#EFF4F8`      | 进度条背景颜色                  |
| barStyle | `string` | `round`  | 进度条样式，可选 `butt`/`round`/`square` (参考 svg stroke-linecap)    |
| duration | `number` | `1000`  | 进度条持续时间(ms)    |
| delay | `number` | `200`  | 进度条延后执行时间(ms)    |
| timeFunction | `string` | `cubic-bezier(0.99, 0.01, 0.22, 0.94)`  | 进度条动画方法   |
