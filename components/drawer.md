# Drawer 抽屉

对 `Element Plus` 的 `Drawer` 组件进行二次封装，**用法简洁，内容丰富**。

## Usage

```vue
<template>
  <Button @click="openDrawerLoading">打开Drawer</Button>
  <BasicDrawer @register="register" title="Drawer Title" size="50%">
    <p> Drawer Info.</p>
    <Button @click="closeDrawer">关闭 Drawer</Button>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicDrawer, useDrawer } from '@/components/Drawer'

export default defineComponent({
  components: { BasicDrawer },
  setup() {
    const [register, { openDrawer, setDrawerProps, closeDrawer }] = useDrawer()

    function openDrawerLoading() {
      openDrawer()
      setDrawerProps({ loading: true })
      setTimeout(() => {
        setDrawerProps({ loading: false })
      }, 2000)
    }

    return {
      register,
      openDrawerLoading,
      closeDrawer,
    }
  },
})
</script>
```


## Props

::: tip 温馨提示

- **保持** [Element Plus Drawer 组件](https://element-plus.gitee.io/zh-CN/component/drawer.html) **原有功能**的情况下扩展以下属性

:::

| 属性           | 类型                 | 默认值  | 说明                                 |
| -------------- | -------------------- | ------- | ------------------------------------ |
| isDetail       | `boolean`            | `false` | 是否为详情模式                       |
| showDetailBack | `boolean`            | `true`  | isDetail=true 状态下是否显示返回按钮 |
| loading        | `boolean`            | `false` | loading 状态                         |
| loadingText    | `string`             | -      | loading 文本                       |
| closeFunc      | `() => Promise<boolean>` | -   | 自定义关闭函数                     |
| showFooter     | `boolean`            | -       | 是否显示底部区域                         |
| footerHeight   | `number`             | `60`    | 底部区域高度                         |
| showConfirmBtn   | `boolean`             | `true`    | 是否显示确定按钮                   |
| confirmText   | `string`             | `Ok`    | 确定按钮文本                         |
| confirmType   | `string`             | `primary`    | 确定按钮类型（参考按钮类型）                         |
| confirmLoading   | `boolean`             | `false`    | 确定按钮是否显示加载中         |
| showCancelBtn   | `boolean`             | `true`    | 是否显示取消按钮                         |
| cancelText   | `string`             | `Cancel`    | 取消按钮文本                         |
| cancelType   | `string`             | `default`    | 取消按钮类型（参考按钮类型）                         |


## Events

| 事件           | 回调参数                  | 说明               |
| -------------- | ------------------------- | ------------------ |
| register       | -               | 通过 `@register` 注册组件 |
| close          | -               | 点击关闭时回调       |
| ok             | -               | 点击确定时回调       |
| visible-change | `(visible:boolean)` | 弹窗打开关闭时触发 |
