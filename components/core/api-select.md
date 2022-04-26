# ApiSelect 远程下拉框

:::tip 温馨提示

对 `Element Plus` 的 `Select` 组件进行二次封装，**用法简洁，内容丰富**。

:::

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <ApiSelect
    :api="optionsListApi"
    filterable
    v-model:modelValue="valueRef"
    resultField="list"
    labelField="name"
    valueField="id"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ApiSelect } from '@/components/ApiSelect'

import { optionsListApi } from '@/api/demo/select'

export default defineComponent({
  components: { ApiSelect },
  setup() {
    const valueRef = ref('')

    return {
      valueRef,
      optionsListApi
    }
  }
})
</script>
```

</details>

## Props

::: tip 温馨提示

- **保持** [Element Plus Select 组件](https://element-plus.gitee.io/zh-CN/component/select.html) **原有功能**的情况下扩展以下属性

:::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| api | `(arg?: Recordable) => Promise<Recordable[]>` | - | 数据接口，接受一个 Promise 对象 |
| params | `object` | - | 接口参数。此属性改变时会自动重新加载接口数据 |
| resultField | `string` | - | 接口返回的字段，如果接口返回数组，可以不填。支持`x.x.x`格式 |
| labelField | `string` | `label` | 下拉数组项内`label`显示文本的字段，支持`x.x.x`格式 |
| valueField | `string` | `value` | 下拉数组项内`value`实际值的字段，支持`x.x.x`格式 |
| valueToString | `boolean` | `false` | 是否将`number`值转化为`string` |
| immediate | `boolean` | `true` | 是否立即请求接口，否则将在第一次点击时候触发请求 |

**支持`x.x.x`格式特别说明**

<details>
<summary>展开查看 Demo 示例</summary>

::: warning 温馨提示

例如返回数据如下：

```js
{
  result: {
    data: {
      list: [{ id: 'valueItem', name: 'labelItem' }]
    }
  }
}
```

- 则 `resultField` 应填写为 `result.data.list`
- 则 `labelField` 应填写为 `name`
- 则 `valueField` 应填写为 `id`

如果返回输入如下内容，则只需要保持默认即可

```js
;[
  { id: 'valueItem', name: 'labelItem' },
  { id: 'valueItem2', name: 'labelItem2' }
]
```

:::

</details>

## Events

| 事件          | 参数 | 说明               |
| ------------- | ---- | ------------------ |
| change        | -    | 内容改变时触发     |
| option-change | -    | 选项数据改变后触发 |
