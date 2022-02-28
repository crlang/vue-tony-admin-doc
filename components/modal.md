# Modal 弹窗

:::tip 温馨提示
对 `Element Plus` 的 Dialog 组件进行二次封装，**内容更丰富**

**由于弹窗内代码一般作为单文件组件存在，也推荐这样做，所以示例都为单文件组件形式**
:::

## Usage

**Modal.vue**
```vue
<template>
  <BasicModal v-bind="$attrs" title="Modal Title" @register="register" :helpMessage="['提示1', '提示2']">
    Modal Info. <Button @click="closeModal()">内部操作关闭</Button>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicModal, useModalInner } from '@/components/Modal'
export default defineComponent({
  components: { BasicModal },
  setup() {
    const [register, { closeModal }] = useModalInner()

    return { register, closeModal }
  },
})
</script>
```

**页面引用弹窗**
```vue
<template>
  <Modal @register="register" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from '@/components/Modal'
import Modal from './Modal.vue'
export default defineComponent({
  components: { Modal },
  setup() {
    const [register, { openModal }] = useModal()
    return {
      register,
      openModal,
    }
  },
})
</script>
```


### useModal()

用于外部组件调用

<details>
<summary>展开查看更多</summary>

```ts
const [register, { openModal, setModalProps }] = useModal()
```

**useModal**

用于操作组件

**register**

register 用于注册 `useModal`，如果需要使用 `useModal` 提供的 api，必须将 `register` 传入组件的 `onRegister`。

原理其实很简单，就是 vue 的组件子传父通信，内部通过 `emit("register"，instance)` 实现。

同时独立出去的组件需要将 `attrs` 绑定到 `BasicModal` 上面。

**openModal**

用于打开/关闭弹窗

```ts
// true/false: 打开关闭弹窗
// data: 传递到子组件的数据
openModal(true, data)
```

**closeModal**

用于关闭弹窗

```ts
closeModal()
```

**setModalProps**

用于更改 modal 的 props 参数因为 modal 内容独立成组件，如果在外部页面需要更改 props 可能比较麻烦，所以提供 **setModalProps** 方便更改内部 modal 的 props

[Props](#Props) 内容可以见下方

```ts
setModalProps(props)
```

</details>


## useModalInner()

用于独立的 Modal 内部调用

<details>
<summary>展开查看更多</summary>

**useModalInner**

用于操作独立组件

```ts
const [register, { closeModal, setModalProps }] = useModalInner(callback)
```

**callback**

type: `(data:any)=>void`

回调函数用于接收 openModal 第二个参数传递的值

```ts
useModal((data: any) => {
  console.table(data)
})
```

**closeModal**

用于关闭弹窗

```ts
closeModal()
```

**changeConfirmLoading**

用于修改确认按钮的 loading 状态

```ts
changeOkLoading(true)
```

**changeLoading**

用于修改 modal 的 loading 状态

```tsx
changeLoading(true)
```

**setModalProps**

用于更改 modal 的 props 参数因为 modal 内容独立成组件，如果在外部页面需要更改 props 可能比较麻烦，所以提供 **setModalProps** 方便更改内部 modal 的 props

[Props](#Props) 内容可以见下方

```ts
setModalProps(props)
```

</details>


## Props

::: tip 温馨提示

- **保持** [Element Plus Dialog 组件](https://element-plus.gitee.io/zh-CN/component/dialog.html) **原有功能**的情况下扩展以下属性

:::

| 属性 | 类型 | 默认值  | 说明 |
| --- | --- | --- | ---|
| scrollTop | `string` | - | 是否关闭后滚回顶部 |
| showClose | `boolean` | `true` | 是否显示关闭图标 |
| showFullscreen | `boolean` | `true` | 是否显示全屏图标 |
| helpMessage | `string/string[]` | -  | 标题右侧提示文本 |
| draggable | `boolean` | `true`  | 是否开启拖拽 |
| useWrapper | `boolean` | `true`  | 是否开启自适应高度，开启后会跟随屏幕变化自适应内容，并出现滚动条 |
| footerOffset | `number` | `0`  | 开启是适应高度后，如果超过屏幕高度，底部和顶部会保持一样的间距，该参数可以用来缩小底部的间距 |
| loading | `boolean` | `false` | 是否显示 loading |
| loadingTip | `string` | `加载中` | loading 文本 |
| modalHeaderHeight | `number` | `56` | 模块的头部高度 |
| modalFooterHeight | `number` | `70` | 模块的脚部高度 |
| showFooter | `boolean` | true | 显示关闭按钮 |
| showCancel | `boolean` | true | 显示关闭按钮 |
| cancelText | `string` | `取消` | 取消按钮文本 |
| cancelButton | `object` | - | 取消按钮属性，参考 ElButton |
| showConfirm | `boolean` | `true`  | 是否显示确认按钮 |
| confirmText | `string` | `确认` | 确认文本 |
| confirmButton | `object` | -  | 确认按钮属性，参考 ElButton |
| closeFunc | `() => Promise<boolean>` |   | 关闭函数，关闭前执行，返回 true 则关闭，否则不关闭 |


## Events

| 事件           | 回调参数                | 说明             |
| -------------- | ----------------------- | ---------------- |
| ok             | -           | 点击确定回调     |
| cancel         | -           | 点击取消回调     |
| visible-change | `(visible:boolean)` | 打开或者关闭触发 |


## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认区域 |
| title |头部标题区域 |
| footer | 底部区域 |
|insertFooter|关闭按钮的左边（不使用footer插槽时有效，下同） |
|centerFooter| 关闭按钮和确认按钮的中间 |
|appendFooter| 确认按钮的右边 |
