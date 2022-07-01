# ContextMenu 右键菜单

::: tip 温馨提示

函数式创建右键菜单组件，通过 `DOM` 的 `event` 对象创建右键菜单。

:::

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div>
    <el-button type="primary" @contextmenu="handleContext">Right Click on me</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { useContextMenu } from '@/hooks/web/useContextMenu'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  components: { ElButton },
  setup() {
    const [createContextMenu] = useContextMenu()
    const { createMessage } = useMessage()

    function handleContext(e: MouseEvent) {
      createContextMenu({
        event: e,
        items: [
          {
            label: 'New',
            icon: 'bi:plus',
            handler: () => {
              createMessage.success('click new')
            }
          },
          {
            label: 'Open',
            icon: 'bx:bxs-folder-open',
            handler: () => {
              createMessage.success('click open')
            }
          }
        ]
      })
    }
    return { handleContext }
  }
})
</script>
```

</details>

### Methods

```ts
import { useContextMenu } from '@/hooks/web/useContextMenu'
const [createContextMenu, destroyContextMenu] = useContextMenu(autoRemove = true)
```

| 方法               | 类型                                        | 默认值 | 说明                                    |
| ------------------ | ------------------------------------------- | ------ | --------------------------------------- |
| createContextMenu  | `(options: CreateContextMenuOptions)=>void` | -      | 创建右键菜单，配置见下方                |
| destroyContextMenu | `()=>void`                                  | -      | 销毁右键菜单，默认 `onUnmounted` 时销毁 |

**CreateContextMenuOptions**

| 属性     | 类型                | 默认值 | 说明                         |
| -------- | ------------------- | ------ | ---------------------------- |
| event    | `Event`             | -      | 右击的 `DOM` 的 `Event` 对象 |
| items    | `ContextMenuItem[]` | `[]`   | 右击菜单项的数据，配置见下方 |
| width    | `number`            | `156`  | 右击菜单的宽度               |
| showIcon | `boolean`           | `true` | 是否显示图标                 |
| styles   | `object`            | -      | 右击菜单的样式               |

**ContextMenuItem**

| 属性     | 类型                | 说明                   |
| -------- | ------------------- | ---------------------- |
| label    | `string`            | 文本                   |
| icon     | `string`            | 图标,参考图标组件      |
| disabled | `boolean`           | 是否禁用               |
| handler  | `()=>void`          | 菜单项点击触发的函数   |
| divider  | `boolean`           | 菜单项下方是否带分割线 |
| children | `ContextMenuItem[]` | 菜单项的子项           |
