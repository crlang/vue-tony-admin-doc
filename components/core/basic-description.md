# BasicDescription 详情描述

对 `Element Plus` 的 Descriptions 组件进行二次封装，**用法更简洁**。

::: tip 前言

由于在中后台开发的时候，数据详情是出现最多的页面，因此，为了能有效减少详情页面的重复开发工作，这个组件能有效减少重复的代码量，仅需要配置几个字段，就能达到效果。

:::

## Usage

**Template 方式**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="p-4">
    <BasicDescription
      title="基础示例"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="3"
      :data="demoData"
      :schema="schema"
    >
      <template #age="val">{{ val }} 岁</template>
    </BasicDescription>
  </div>
</template>

<script lang="ts">
import type { DescItem } from '@/components/BasicDescription'

import { defineComponent } from 'vue'

import { BasicDescription } from '@/components/BasicDescription'

export default defineComponent({
  components: { BasicDescription },
  setup() {
    const demoData: Recordable = {
      username: 'tony',
      nickName: 'Tony Stark ',
      age: 123,
      tag: 'orange'
    }
    const schema: DescItem[] = [
      {
        field: 'username',
        label: '用户名'
      },
      {
        field: 'tag',
        label: '标签',
        show: (item) => {
          return item.age > 99
        }
      },
      {
        field: 'nickName',
        label: '昵称',
        render: (val, item) => {
          return `${item.username}-${val}`
        }
      },
      {
        field: 'age',
        label: '年龄',
        isSlot: true
      }
    ]
    return { demoData, schema }
  }
})
</script>
```

</details>

**useDescription 方式**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="p-4">
    <BasicDescription @register="register">
      <template #age="val">{{ val }} 岁</template>
    </BasicDescription>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { BasicDescription, DescItem, useDescription } from '@/components/BasicDescription'

export default defineComponent({
  components: { BasicDescription },
  setup() {
    const demoData: Recordable = {
      username: 'tony',
      nickName: 'Tony Stark ',
      age: 123,
      tag: 'orange'
    }
    const schema: DescItem[] = [
      {
        field: 'username',
        label: '用户名'
      },
      {
        field: 'tag',
        label: '标签',
        show: (item) => {
          return item.age > 99
        }
      },
      {
        field: 'nickName',
        label: '昵称',
        render: (val, item) => {
          return `${item.username}-${val}`
        }
      },
      {
        field: 'age',
        label: '年龄',
        isSlot: true
      }
    ]
    const [register] = useDescription({
      title: '基础示例',
      data: demoData,
      schema,
      column: 3,
      collapseOptions: {
        canExpand: true,
        helpMessage: 'help me'
      }
    })
    return { demoData, schema, register }
  }
})
</script>
```

</details>

## Props

::: tip 温馨提示

- **保持** [Element Plus Descriptions 组件](https://element-plus.org/zh-CN/component/descriptions.html) **原有功能**的情况下扩展以下属性

:::

| 属性            | 类型      | 默认值  | 说明                                                    |
| --------------- | --------- | ------- | ------------------------------------------------------- |
| schema          | `array`   | -       | 详情描述项的配置，见下方 `DescItem` 配置                |
| data            | `object`  | -       | 详情描述数据                                            |
| useCollapse     | `boolean` | `false` | 默认用`CollapseContainer`容器包裹着并隐藏了展开收缩按钮 |
| collapseOptions | `object`  | `null`  | `CollapseContainer`组件属性                             |

## Events

| 事件           | 回调参数                  | 说明               |
| -------------- | ------------------------- | ------------------ |
| register       | -               | `useDescription()` 时，通过 `@register` 注册组件 |

**DescItem**

- **保持** [Element Plus DescriptionsItem 组件](https://element-plus.org/zh-CN/component/descriptions.html) **原有功能**的情况下扩展以下属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| field | `string` | - | 字段名 |
| show | `(data)=>boolean` | - | 是否显示当前组件 |
| isSlot | `boolean` | `(curValue)` | 是否为插槽模式，默认插槽可用当前字段的值 |
| render | `(curValue, curItem)=>VNode,undefined,Element,string,number` | - | 自定义渲染内容 |
