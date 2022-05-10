# DragVerify 拖动校验


## BasicDragVerify 拖动校验

### Usage

```vue
<template>
  <BasicDragVerify @success="handleSuccess" />
</template>

<script lang="ts">
import type { PassingData } from '@/components/Verify'

import { defineComponent } from 'vue'
import { BasicDragVerify } from '@/components/Verify'

export default defineComponent({
  components: { BasicDragVerify },
  setup() {
    function handleSuccess(data: PassingData) {
      const { time } = data
      createMessage.success(`校验成功,耗时${time}秒`)
    }

    return {
      handleSuccess,
      handleBtnClick,
    }
  },
})
</script>
```

### Props

| 属性         | 类型             | 默认值           | 说明               |
| ------------ | ---------------- | ---------------- | ------------------ |
| value        | `boolean`        | `false`                | 是否通过           |
| text         | `string`         | `请按住滑块拖动` | 未拖动时候显示文字 |
| successText  | `string`         | `验证通过`       | 验证成功后显示文本 |
| height       | `string｜string` | `40`               | 高度               |
| width        | `string｜string` | `220`              | 宽度               |
| circle       | `boolean`        | `false`            | 是否圆角           |
| wrapStyle    | `object`            | -                | 外层容器样式       |
| contentStyle | `object`            | -                | 主体内容样式       |
| barStyle     | `object`            | -                | 拖动条样式           |
| actionStyle  | `object`            | -                | 拖拽按钮样式       |


## Events

| 事件   | 参数            | 说明                   |
| ------ | ------------------ | ---------------------- |
| success | `(isPassing:boolean,time:string)` |   验证成功时触发 |
| change | `(isPassing:boolean)` |   验证改变时触发 |
| start | `(event)` |   拖动开始时触发 |
| move | `({event,moveDistance,moveX})` |     拖动时触发 |
| end | `(event)` |     拖动结束时触发 |


### Methods

| 名称   | 参数 | 说明       |
| ------ | -------- | ---------- |
| resume | - | 还原初始值 |


## RotateDragVerify 图片还原校验

### Usage

```vue
<template>
  <RotateDragVerify :src="img" ref="el" @success="handleSuccess" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RotateDragVerify } from '@/components/Verify'

import img from '@/assets/images/header.jpg'
export default defineComponent({
  components: { RotateDragVerify },
  setup() {
    const handleSuccess = () => {
      console.table('success!')
    }
    return {
      handleSuccess,
      img,
    }
  },
})
</script>
```

:::tip 温馨提示
拖动条属性参考上方 `BasicDragVerify`，此处未列出
:::

### props

| 属性         | 类型             | 默认值           | 说明               |
| ------------ | ---------------- | ---------------- | ------------------ |
| src          | `string`         | -                | 图片地址           |
| imgWidth     | `number`         | `260`                | 图片宽度           |
| imgWrapStyle | `object`            | -                | 图片外层容器样式   |
| minDegree    | `number`         | `90`                | 最小旋转角度       |
| maxDegree    | `number`         | `270`                | 最大旋转角度       |
| diffDegree   | `number`         | `20`                | 误差角度           |


### Methods

| 名称   | 参数   | 说明       |
| ------ | ---------- | ---------- |
| resume | - | 还原初始值 |


## Events

| 事件   | 参数            | 说明                   |
| ------ | ------------------ | ---------------------- |
| success | `(isPassing:boolean,time:string)` |   验证成功时触发 |
| change | `(isPassing:boolean)` |   验证改变时触发 |
