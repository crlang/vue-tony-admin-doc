# BasicModal 弹窗

:::tip 温馨提示

对 `Element Plus` 的 Dialog 组件进行二次封装，**用法简单，内容丰富**

**由于弹窗内代码一般作为单文件组件存在，推荐这种做法，示例都以单文件组件形式展示**

:::

## Usage

**常规示例**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div>
    <BasicModal
      destroyOnClose
      draggable
      title="弹窗标题"
      @register="register"
      @cancel="closeModal()"
      :helpMessage="['提示1', '提示2']">
      <template #prependFooter>
        <el-button type="danger">New Btn</el-button>
      </template>
    </BasicModal>
    <el-button
      type="primary"
      class="my-4"
      @click="openModal(true)">打开弹窗</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicModal, useModal } from '@/components/BasicModal'
export default defineComponent({
  components: { ElButton, BasicModal },
  props: {
    modalValue: Boolean,
  },
  setup() {
    const [register, { openModal, closeModal }] = useModal()

    return { register, openModal, closeModal }
  },
})
</script>
```

</details>


**拆分单文件组件示例(建议)**

<details>
<summary>展开查看 Demo 示例</summary>

**某个页面使用**

```vue
<template>
  <div>
    <ElButton @click="openModal(true)">打开弹窗</ElButton>
    <Modal @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { useModal } from '@/components/BasicModal'

import Modal from './Modal.vue'

export default defineComponent({
  components: { ElButton, Modal },
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

同级目录下创建 **Modal.vue** 文件

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

</details>

## Props

::: tip 温馨提示

- **保持** [Element Plus Dialog 组件](https://element-plus.org/zh-CN/component/dialog.html) **原有功能**的情况下扩展以下属性

:::

| 属性 | 类型 | 默认值  | 说明 |
| --- | --- | --- | ---|
| modelValue     | `boolean`                | `false`       | 弹窗可见状态               |
| title          | `string`                 | -       | 弹窗标题                   |
| scrollTop | `string` | `true` | 是否关闭后滚回顶部 |
| showFooter | `boolean` | `true` | 显示底部区域 |
| showClose | `boolean` | `true` | 是否显示关闭图标 |
| showFullscreen | `boolean` | `true` | 是否显示全屏图标 |
| helpMessage | `string\|string[]` | -  | 标题右侧提示文本 |
| dyncHeight | `boolean` | `true`  | 是否开启自适应高度，开启后会跟随屏幕变化自适应内容，并出现滚动条 |
| loading | `boolean` | `false` | 内容区是否显示 loading |
| loadingText | `string` | `加载中` | loading 文本 |
| showConfirmBtn | `boolean` | `true`  | 是否显示确认按钮 |
| confirmOptions | `object` | `{type:'primary',text:'确定'}` | 确认按钮属性，参考 ElButton |
| showCancelBtn | `boolean` | `true` | 显示关闭按钮 |
| cancelOptions | `object` | `{type:'default',text:'取消'}` | 关闭按钮属性，参考 ElButton |
| closeFunc | `() => Promise<boolean>` |   | 关闭前执行的函数 |


## Events

| 事件           | 回调参数                | 说明             |
| -------------- | ----------------------- | ---------------- |
| confirm             | -           | 点击确定回调     |
| cancel         | -           | 点击取消回调     |
| register       | -                   | `useModal()`时，通过 `@register` 注册组件 |
| visible-change | `(visible:boolean)` | 打开或者关闭触发 |
| height-change | `(height:number)` | 弹窗内容区域高度变化时触发 |

## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认区域 |
| title |头部标题区域 |
| footer | 底部区域，具有高优先级 |
|prependFooter|关闭按钮的左边位置 |
|centerFooter| 关闭按钮和确认按钮的中间位置 |
|appendFooter| 确认按钮的右边位置 |


### useModal()

用于外部组件调用

<details>
<summary>展开查看更多</summary>

```ts
const [register, methods] = useModal()
```

**register**

`register` 用于注册 `useModal`，将 `register` 传入组件的 `onRegister`。

独立出去的组件需要将 `attrs` 绑定到 `BasicModal` 上面。

**methods**

`methods` 支持以下方法


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
