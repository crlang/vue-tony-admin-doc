# BasicForm 表单

:::tip 温馨提示

对 `Element Plus` 的 `Form` 组件进行二次封装，**用法简洁，功能丰富**。

:::

## Usage

**常规示例**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="m-4">
    <ElButton @click="setProps({ showSubmitButton: false })">隐藏查询按钮</ElButton>
    <ElButton @click="setProps({ showSubmitButton: true })">显示查询按钮</ElButton>
    <BasicForm
      :schemas="schemas"
      ref="formElRef"
      class="mt-4"
      :labelWidth="100"
      @submit="handleSubmit"
      :actionColProps="{ span: 24 }" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'
import { BasicForm, BasicFormSchema, FormActionMethods, BasicProps } from '@/components/BasicForm'

export default defineComponent({
  components: { ElButton, BasicForm },
  setup() {
    const formElRef = ref<Nullable<FormActionMethods>>(null)
    const schemas: BasicFormSchema[] = [
      {
        field: 'field',
        component: 'ElInput',
        label: '字段1',
        componentProps: {
          clearable: true,
        },
      },
    ]

    function setProps(props: Partial<BasicProps>) {
      const formEl = formElRef.value
      if (!formEl) return

      formEl.setFormProps(props)
    }

    function handleSubmit(values: any) {
      console.info('submit values', values)
    }

    return {
      formElRef,
      schemas,
      handleSubmit,
      setProps,
    }
  },
})
</script>
```

</details>

**useForm 方式(推荐)**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="m-4">
    <ElButton @click="setFormProps({ showSubmitButton: false })">隐藏查询按钮</ElButton>
    <ElButton @click="setFormProps({ showSubmitButton: true })">显示查询按钮</ElButton>
    <BasicForm
      class="mt-4"
      @register="register"
      @submit="handleSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import { BasicForm, BasicFormSchema, useForm } from '@/components/BasicForm'

export default defineComponent({
  components: { ElButton, BasicForm },
  setup() {
    const schemas: BasicFormSchema[] = [
      {
        field: 'field',
        component: 'ElInput',
        label: '字段1',
        componentProps: {
          clearable: true,
        },
      },
    ]

    const [register, { setFormProps }] = useForm({
      labelWidth: 100,
      schemas,
      actionColProps: {
        span: 24,
      },
    })

    function handleSubmit(values) {
      console.info('submit values', values)
    }
    return {
      register,
      handleSubmit,
      setFormProps,
    }
  },
})
</script>
```

</details>


### render 方式渲染表单子项

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="m-4">
    <BasicForm
      @register="register"
      @submit="handleSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { BasicForm, BasicFormSchema, useForm } from '@/components/Form'
import { useMessage } from '@/hooks/web/useMessage'
import { ElInput } from 'element-plus'

export default defineComponent({
  components: { BasicForm },
  setup() {
    const { createMessage } = useMessage()
    const schemas: BasicFormSchema[] = [
      {
        field: 'field1',
        component: 'ElInput',
        label: '字段1',
        colProps: {
          span: 8,
        },
        rules: [{ required: true }],
        render: ({ model, field }) => {
          return h(ElInput, {
            placeholder: '请输入',
            modelValue: model[field],
            onInput: (v: any) => {
              model[field] = v
            },
          })
        },
      },
      {
        field: 'field2',
        component: 'ElInput',
        label: '字段2',
        colProps: {
          span: 8,
        },
        required: true,
        renderComponentContent: () => {
          return {
            suffix: () => 'suffix',
          }
        },
      },
    ]

    const [register] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 24,
      },
    })
    return {
      register,
      handleSubmit: (values: any) => {
        console.table('submit values', values)
        createMessage.success('submit success')
      },
    }
  },
})
</script>
```

</details>

### slot 方式渲染表单子项

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="m-4">
    <BasicForm
      @register="register"
      @submit="handleSubmit">
      <template #customSlot="{ model, field }">
        <el-input v-model:modelValue="model[field]" />
      </template>
    </BasicForm>
    <Button @click="handleSubmit2">自定义提交</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElInput } from 'element-plus'
import { BasicForm, useForm } from '@/components/Form'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'FormDemo',
  components: { ElInput, BasicForm },
  setup() {
    const { createMessage } = useMessage()

    const [register, { submit, validate, getFieldsValue }] = useForm({
      labelWidth: 100,
      actionColOptions: {
        span: 24,
      },
      schemas: [
        {
          field: 'field1',
          label: '字段1',
          required: true,
          component: 'ElInput', // 随便填写一项
          slot: 'customSlot',
        },
      ],
    })

    function handleSubmit(values: any) {
      console.table('submit values', values)
      createMessage.success('submit success')
    }

    async function handleSubmit2() {
      await validate()

      const values = getFieldsValue()
      console.table('submit values', values)

      submit()
    }

    return {
      register,
      handleSubmit,
      handleSubmit2,
    }
  },
})
</script>
```

</details>

### ifShow/show/dynamicDisabled 趣味联合

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="m-4">
    <BasicForm @register="register" />
    <el-alert title="测试提示：当字段1输入内容为 show 时， 字段2将会动态显示" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAlert } from 'element-plus'
import { BasicForm, BasicFormSchema, useForm } from '@/components/Form'

export default defineComponent({
  components: { ElAlert, BasicForm },
  setup() {
    const schemas: BasicFormSchema[] = [
      {
        field: 'field1',
        component: 'ElInput',
        label: '字段1',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'field2',
        component: 'ElInput',
        label: '字段2',
        colProps: {
          span: 8,
        },
        ifShow: ({ values }) => {
          return values.field1 === 'show'
        },
      },
      {
        field: 'field3',
        component: 'ElSwitch',
        label: '字段3',
        colProps: {
          span: 8,
        },
        show: ({ values }) => {
          console.log('444aaaa', values)
          return !!values.field2
        },
      },
      {
        field: 'field4',
        component: 'ElDatePicker',
        label: '字段4',
        colProps: {
          span: 8,
        },
        dynamicDisabled: ({ values }) => {
          return !values.field3
        },
      },
    ]
    const [register] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 24,
      },
    })

    return {
      register,
    }
  },
})
</script>
```

</details>

## Props

:::tip 温馨提示

- **保持** [Element Plus Form 组件](https://element-plus.org/zh-CN/component/form.html) **原有功能**的情况下扩展以下属性

:::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| schemas | `BasicFormSchema[]` | - | 表单配置，见下方 `BasicFormSchema` 配置 |
| rowProps | `object` | - | 配置全局的`row`，配置参考`ElRow` |
| rowStyle | `object` | - | 配置全局的`row`样式 |
| colProps | `object` | - |  配置全局的`col`,子项也可单独配置并优先于全局，配置参考`ElCol` |
| mergeDynamicData | `object` | - | 额外传递到子组件的参数 values |
| autoSetPlaceHolder | `boolean` | `true` | 自动设置表单内组件的 placeholder |
| autoSubmitOnEnter | `boolean` | `false` | 是否在input中输入时按回车提交 |
| submitOnReset | `boolean` | `true` | 重置时是否提交表单 |
| emptySpan | `object` | `0` | 配置空白`col`，配置参考`ElCol` |
| rulesMessageJoinLabel | `boolean` | `false` | 如果表单项有校验时，是否将字段中文名字拼接到自动生成的校验信息后方 |
| showAdvancedButton | `boolean` | `false` | 是否显示展开收起按钮 |
| autoAdvancedLine | `number` | `3` | 如果 `showAdvancedButton` 为 `true`，超过指定行数行默认折叠 |
| alwaysShowLines  | `number` | `1` | 折叠时始终保持显示的行数  |
| autoFocusFirstItem | `boolean` | `false` | 是否聚焦第一个输入框，只在第一个表单项为 input 的时候起作用 |
| actionColOptions | `object` | - | 操作按钮外层 ElCol 组件配置，如果开启 `showAdvancedButton`，则不用设置 |
| showActionButtonGroup | `boolean` | `true` | 是否显示操作按钮(重置/提交) |
| showSubmitButton | `boolean` | `true` | 是否显示提交按钮 |
| submitButtonOptions | `object`| - | 配置确认按钮，配置参考`ElButton` |
| showResetButton | `boolean` | `true` | 是否显示重置按钮 |
| resetButtonOptions | `object` | - | 配置重置按钮，配置参考`ElButton` |
| resetFunc | `() => Promise<void>` | - | 自定义重置按钮方法 |
| submitFunc | `() => Promise<void>` | - | 自定义提交按钮方法 |

<!-- | transformDateFunc | `(date:any)=>string` | - | 存在 moment.js 对象，则返回`YYYY-MM-DD HH:mm:ss`格式 | -->

### Methods

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| setProps | - | 设置表单的 props |
| getFieldsValue | - | 获取表单值 |
| setFieldsValue | - | 设置表单字段值 |
| updateSchema | `(data: Partial<BasicFormSchema> \| Partial<BasicFormSchema>[])` | 更新表单的 schema, 只更新函数所传的参数 |
| resetSchema | - | 重置表单的 schema |
| appendSchemaByField | `(schema: BasicFormSchema, prefixField: string \| undefined, first?: boolean \| undefined)` | 插入到指定 filed 后面，如果没传指定 field，则插入到最后,当 first = true 时插入到第一个位置 |
| removeSchemaByField | `(field: string \| string[])` | 根据 field 删除 Schema |

:::warning 设置表单的 props 有三个方式


> 1.直接在标签上传递 `<BasicForm v-bind="props"></BasicForm>`

> 2.使用 `setProps(props)`

> 3.通过初始化 `useForm(props)`


:::

updateSchema 方法示例

```ts
// 单个
updateSchema({ field: 'field', componentProps: { disabled: true } })
// 多个
updateSchema([
  { field: 'field', componentProps: { disabled: true } },
  { field: 'field1', componentProps: { disabled: false } },
])
```

**额外说明**

:::tip 支持 ElForm 原生方法

> submit 提交表单

> validate 验证表单

> validateField 验证部分表单

> resetFields 重置表单

> scrollToField 滚动至某个表单字段

> clearValidate 清空表单校验信息

详细信息请参考 [💡💡💡官网文档](https://element-plus.org/zh-CN/component/form.html#form-%E6%96%B9%E6%B3%95)

:::

### BasicFormSchema

| 属性 | 类型 | 默认值 |  说明 |
| --- | --- | --- | --- |
| field | `string` | -  | 字段 |
| label | `string` | - | 标签 |
| subLabel | `string` | - | 标签右侧的副标签 |
| changeEvent | `string` | - | 表单更新事件名称，ElInput/ElInputNumber标签为`input`，其余默认为`change` |
| valueField | `string` | `modelValue` | v-model 的字段 |
| defaultValue | `any` | - | 字段所在的初始值 |
| helpMessage | `string\|string[]\|(rcp: RenderCallbackParams) => string\|string[]` | -| 标签名右侧温馨提示 |
| helpComponentProps | `object` | - | 标签右侧温馨提示，更多参考 [BasicHelp](./basic.html) |
| labelWidth | `string\|number` | - | 覆盖统一设置的 labelWidth |
| component | `string` | - | 组件类型，配置参考下方 ComponentType |
| componentProps | `object` | - | 所渲染的组件的 props |
| required | `boolean\|(rcp: RenderCallbackParams) => boolean` | - | 字段是否必填 |
| rules | `array` | - | 校验规则，配置同 ElFormItem 验证规则，更多参考[async-validator](https://github.com/yiminghe/async-validator)  |
| rulesMessageJoinLabel | `boolean` | `false` | 校验信息是否加入 label |
| itemProps | `object` | - | 配置参考下方 FormItem |
| colProps | `object` | - | 配置同全局的`col`,并优先于全局 |
| isAdvanced | `boolean` | `true` | 展开收起默认状态 |
| show | `boolean\|(rcp: RenderCallbackParams) => boolean` | -| 判断当前组件是否显示，css 控制，不会删除 dom |
| ifShow | `boolean\|(rcp: RenderCallbackParams) => boolean` | - | 判断当前组件是否显示，js 控制，会删除 dom |
| render | `(rcp: RenderCallbackParams) => VNode \| VNode[] \| string` | - | 自定义渲染组件 |
| renderColContent | `(rcp: RenderCallbackParams) => VNode \| VNode[] \| string` | - | 自定义渲染组件（需要自行包含 formItem） |
| renderComponentContent | ` VNode \| VNode[] \| string \| (rcp: RenderCallbackParams) => any` | - | 自定义渲染组内部的 slot |
| slot | `string` | - | 自定义 slot，渲染组件 |
| colSlot | `string` | - | 自定义 slot，渲染组件 （需要自行包含 formItem） |
| dynamicDisabled | `boolean \| ((rcp: RenderCallbackParams) => boolean)` | - | 动态判断当前组件是否禁用 |
| dynamicRules | `(rcp: RenderCallbackParams) => rules[]` | - | 动态返回当前组件校验规则 |


**RenderCallbackParams**

```ts
interface RenderCallbackParams {
  schema: BasicFormSchema
  values: Recordable
  model: Recordable
  field: string
}
```

**componentProps**

- a.当值为对象类型时,该对象将作为`component`所对应组件的的 props 传入组件

- b.当值为一个函数时候, 参数有 4 个

> `schema`: 表单的整个 schemas

> `formActionType`: 操作表单的函数。与 useForm 返回的操作函数一致

> `formModel`: 表单的双向绑定对象，这个值是响应式的。所以可以方便处理很多操作

> `tableAction`: 操作表格的函数，与 useTable 返回的操作函数一致。注意该参数只在表格内开启搜索表单的时候有值，其余情况为`null`,

```tsx
{
  // 示例，值改变的时候操作表格
  component:'ElInput',
  componentProps: ({ schema, tableAction, formActionType, formModel }) => {
    return {
      onChange:(e)=>{
        const {reload}=tableAction
        reload()
      }
    };
  };
}
```

### ComponentType

表单子项组件支持类型如下

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| ApiSelect | `custom` | 接口 Select 组件 |
| IconPicker | `custom` | 图标选择组件 |
| InputCountDown | `custom` | 带倒计时输入框组件 |
| StrengthMeter | `custom` | 密码强度组件 |
| Upload | `custom` | 上传组件 |
| ElCascader | `official` | 官方 ElCascader 组件 |
| ElCheckbox | `official` | 官方 ElCheckbox 组件 |
| ElCheckboxGroup | `official` | 官方 ElCheckboxGroup 组件 |
| ElDatePicker | `official` | 官方 ElDatePicker 组件 |
| ElDivider | `official` | 官方 ElDivider 组件 |
| ElInput | `official` | 官方 ElInput 组件 |
| ElInputNumber | `official` | 官方 ElInputNumber 组件 |
| ElRadio | `official` | 官方 ElRadio 组件 |
| ElRadioButton | `official` | 官方 ElRadioButton 组件 |
| ElRadioGroup | `official` | 官方 ElRadioGroup 组件 |
| ElRate | `official` | 官方 ElRate 组件 |
| ElSelect | `official` | 官方 ElSelect 组件 |
| ElSlider | `official` | 官方 ElSlider 组件 |
| ElSwitch | `official` | 官方 ElSwitch 组件 |
| ElTimePicker | `official` | 官方 ElTimePicker 组件 |

**ComponentType 引用说明**

**统一注册**

这种方式适用于使用频率较高的组件，如`ElInput`

```tsx
import { ElInput } from 'element-plus'
componentMap.set('ElInput', ElInput)
```

**单独注册**

使用 **useComponentRegister** 进行注册

这种方式适用于使用频率较低的组件，如`ApiSelect`

这种写法只能在当前页使用，页面销毁之后会从 componentMap 删除相应的组件

```tsx
import { useComponentRegister } from '@/components/form';
import ApiSelect from './components/ApiSelect.vue'

useComponentRegister('ApiSelect', ApiSelect);
```

:::tip 温馨提示

`单独注册`能有效减少打包体积，如果某个组件体积很大，用`统一注册`的话可能会使首屏体积增加

:::


**ElDivider 组件说明**

`ElDivider`类型用于在`schemas`中占位，将会渲染成一个分割线（始终占一整行的版面），可以用于较长表单的版面分隔。请只将Divider类型的schema当作一个分割线，而不是一个常规的表单字段。

- `ElDivider`仅在`showAdvancedButton`为false时才会显示，也就是说如果启用了表单收起和展开功能，`ElDivider`将不会显示
- `ElDivider` 使用`schema`中的`label`以及`helpMessage`来渲染分割线中的提示内容
- `ElDivider` 可以使用`componentProps`来设置除`type`之外的 props
- `ElDivider` 不会渲染`FormItem`，因此`schema`中除`label`、`componentProps`、`helpMessage`、`helpComponentProps`以外的属性不会被用到

## Slots

| 名称          | 说明         |
| ------------- | ------------ |
| formFooter    | 表单底部区域 |
| formHeader    | 表单顶部区域 |
| resetBefore   | 重置按钮前区域   |
| submitBefore  | 提交按钮前区域   |
| advanceBefore | 展开按钮前区域   |
| advanceAfter  | 展开按钮后区域   |


## 表单项组件拓展


## ApiSelect 远程下拉加载组件

### Usage

```ts
const schemas: BasicFormSchema[] = [
  {
    field: 'field',
    component: 'ApiSelect',
    label: '字段',
  },
]
```


### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| numberToString | `boolean` | `false` | 是否将`number`值转化为`string` |
| api | `(arg?: Recordable) => Promise<OptionsItem[]>` | - | 数据接口，接受一个 Promise 对象 |
| params | `object` | - | 接口参数。此属性改变时会自动重新加载接口数据 |
| resultField | `string` | - | 接口返回的字段，如果接口返回数组，可以不填。支持`x.x.x`格式 |
| labelField | `string` | `label` | 下拉数组项内`label`显示文本的字段，支持`x.x.x`格式 |
| valueField | `string` | `value` | 下拉数组项内`value`实际值的字段，支持`x.x.x`格式 |
| immediate | `boolean` | `true` | 是否立即请求接口，否则将在第一次点击时候触发请求 |

**OptionsItem**

```ts
{
  label: string;
  value: string;
  disabled?: boolean
}
```


:::warning 特别说明
所有可调用函数见下方 [Methods](#Methods)

参数 props 内的值可以是 computed 或者 ref 类型

register 用于注册 `useForm`，如果需要使用 `useForm` 提供的 api，必须将 register 传入组件的 `onRegister`
:::
