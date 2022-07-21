# BasicDrawer 抽屉

:::tip 温馨提示

对 `Element Plus` 的 `Drawer` 组件进行二次封装，**用法简洁，内容丰富**。

:::

## Usage

**常规示例**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div>
    <el-button @click="handleOpen">打开Drawer</el-button>
    <BasicDrawer @register="register" title="Drawer Title" size="50%">
      <p>Drawer Info.</p>
      <el-button @click="closeDrawer">关闭 Drawer</el-button>
    </BasicDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { BasicDrawer, useDrawer } from '@/components/BasicDrawer'

export default defineComponent({
  components: { ElButton, BasicDrawer },
  setup() {
    const [register, { openDrawer, setDrawerProps, closeDrawer }] = useDrawer()

    function handleOpen() {
      openDrawer()
      setDrawerProps({ loading: true })
      setTimeout(() => {
        setDrawerProps({ loading: false })
      }, 2000)
    }

    return {
      register,
      handleOpen,
      closeDrawer
    }
  }
})
</script>
```

</details>

**拆分文件示例(建议)**

<details>
<summary>展开查看 Demo 示例</summary>

**某个页面使用**

```vue
<template>
  <div>
    <el-button type="primary" class="my-4" @click="handleOpen">打开Drawer</el-button>
    <Drawer @register="register" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { useDrawer } from '@/components/BasicDrawer'

import Drawer from './Drawer.vue'

export default defineComponent({
  components: {
    ElButton,
    Drawer
  },
  setup() {
    const [register, { openDrawer }] = useDrawer()

    function handleOpen() {
      openDrawer(true, {
        data: 'content',
        info: 'Info'
      })
    }

    return {
      register,
      handleOpen
    }
  }
})
</script>
```

同级目录下创建 **Drawer.vue** 文件

```vue
<template>
  <BasicDrawer
    v-bind="$attrs"
    title="Modal Title"
    width="50%"
    ref="basicDrawer"
    showFooter
    @register="register"
    @confirm="handleConfirm"
  >
    <template #toolbar>
      <el-button>btn</el-button>
      <el-button>btn2</el-button>
    </template>
    <p class="p-20" v-for="index in 100" :key="index">超多的内容</p>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { BasicDrawer, useDrawerInner } from '@/components/BasicDrawer'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton, BasicDrawer },
  setup() {
    const { createMessage } = useMessage()
    const [register, { changeConfirmLoading }] = useDrawerInner((data) => {
      createMessage.info('传递了内容==>' + JSON.stringify(data))
    })

    function handleConfirm() {
      changeConfirmLoading(true)
      setTimeout(() => {
        changeConfirmLoading(false)
        createMessage.success('点击了提交')
      }, 3e3)
    }

    return { register, handleConfirm }
  }
})
</script>
```

</details>

## Props

::: tip 温馨提示

- **保持** [Element Plus Drawer 组件](https://element-plus.org/zh-CN/component/drawer.html) **原有功能**的情况下扩展以下属性

:::

| 属性           | 类型                     | 默认值  | 说明                       |
| -------------- | ------------------------ | ------- | -------------------------- |
| modelValue     | `boolean`                | `false`       | 抽屉可见状态               |
| title          | `string`                 | -       | 抽屉标题                   |
| isDetail       | `boolean`                | `false` | 是否为详情模式(带返回按钮) |
| loading        | `boolean`                | `false` | loading 状态               |
| loadingText    | `string`                 | -       | loading 文本               |
| closeFn      | `() => Promise<boolean>` | -       | 自定义关闭函数，关闭前执行 |
| showFooter     | `boolean`                | `false`       | 是否显示底部区域           |
| showConfirmBtn | `boolean`                | `true`  | 是否显示确定按钮           |
| confirmOptions | `object`                 | `{text: '确定',type:'primary'}`       | 确定按钮(配置同 ElButton)  |
| showCancelBtn  | `boolean`                | `true`  | 是否显示取消按钮           |
| cancelOptions  | `object`                 | `{text: '取消',type:'default'}`       | 取消按钮(配置同 ElButton)  |


## Events

| 事件           | 回调参数            | 说明                                       |
| -------------- | ------------------- | ------------------------------------------ |
| confirm        | -                   | 点击确定时回调                             |
| cancel         | -                   | 点击关闭时回调                             |
| register       | -                   | `useDrawer()`时，通过 `@register` 注册组件 |
| visible-change | `(visible:boolean)` | 弹窗打开/关闭时触发                        |

## Slots

| 名称          | 说明                         |
| ------------- | ---------------------------- |
| default       | 默认区域                     |
| header         | 头部标题区域                 |
| toolbar         | 头部右侧工具栏区域                 |
| footer         | 脚部区域                 |
| prependFooter         | 脚部按钮左侧区域                 |
| centerFooter         | 脚部按钮中间区域                 |
| appendFooter         | 脚部按钮右侧区域                 |
