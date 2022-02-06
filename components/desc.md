# Description 详情组件

对 `Element Plus` 的 Descriptions 组件进行二次封装，**用法更简洁**。


::: warning

- 注意 Description 大小写

:::

## Usage

```vue
<template>
  <div class="p-4">
    <Description
      title="基础示例"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="3"
      :data="demoData"
      :schema="schema"
    />
    <Description @register="register" class="mt-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Description, DescItem, useDescription } from '@/components/Description/index'

export default defineComponent({
  components: { Description },
  setup() {
    const demoData: Recordable = {
      username: 'tony',
      nickName: 'Tony Water',
      age: 123,
      tag: 'orange',
    }
    const schema: DescItem[] = [
      {
        field: 'username',
        label: '用户名',
      },
      {
        field: 'tag',
        label: '标签',
        show: (item) => {
          return item.age > 99
        },
      },
      {
        field: 'nickName',
        label: '昵称',
        render: (val, item) => {
          return `${item.username}-${val}`
        },
      },
    ]
    const [register] = useDescription({
      title: 'useDescription',
      data: demoData,
      schema,
    })
    return { demoData, schema, register }
  },
})
</script>
```

## useDescription

参考以上示例

```ts
const [register] = useDescription(Props);
```

## Props

::: tip 温馨提示

- **保持** [Element Plus Descriptions 组件](https://element-plus.gitee.io/zh-CN/component/descriptions.html) **原有功能**的情况下扩展以下属性

:::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| useCollapse | `boolean` | `true` | 是否包裹 CollapseContainer 组件 |
| collapseOptions | `object` | `null` | `CollapseContainer` 组件属性 |
| schema | `DescItem[]` | - | 详情项配置，见下方 `DescItem` 配置 |
| data | `object` | - | 数据源 |

## DescItem

- **保持** [Element Plus DescriptionsItem 组件](https://element-plus.gitee.io/zh-CN/component/descriptions.html#descriptions-item-属性) **原有功能**的情况下扩展以下属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| field | `string` | - | 字段名 |
| show | `(data)=>boolean` | - | 是否显示当前组件 |
| render | `(currentValue, currentItem)=>VNode,undefined,Element,string,number` | - | 自定义渲染 content |
