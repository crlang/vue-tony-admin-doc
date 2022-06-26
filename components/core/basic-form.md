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
      :actionColProps="{ span: 24 }"
    />
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
          clearable: true
        }
      }
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
      setProps
    }
  }
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
    <BasicForm class="mt-4" @register="register" @submit="handleSubmit" />
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
          clearable: true
        }
      }
    ]

    const [register, { setFormProps }] = useForm({
      labelWidth: 100,
      schemas,
      actionColProps: {
        span: 24
      }
    })

    function handleSubmit(values) {
      console.info('submit values', values)
    }
    return {
      register,
      handleSubmit,
      setFormProps
    }
  }
})
</script>
```

</details>

**render 方式渲染表单项**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="m-4">
    <BasicForm @register="register" @submit="handleSubmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { ElInput } from 'element-plus'

import { BasicForm, BasicFormSchema, useForm } from '@/components/BasicForm'
import { useMessage } from '@/hooks/web/useMessage'

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
          span: 8
        },
        rules: [{ required: true }],
        render: ({ model, field }) => {
          return h(ElInput, {
            placeholder: '请输入',
            modelValue: model[field],
            onInput: (v: string) => {
              model[field] = v
            }
          })
        }
      },
      {
        field: 'field2',
        component: 'ElInput',
        label: '字段2',
        colProps: {
          span: 8
        },
        required: true,
        renderComponentContent: () => {
          return {
            suffix: () => 'suffix'
          }
        }
      }
    ]

    const [register] = useForm({
      labelWidth: 120,
      schemas,
      actionColProps: {
        span: 24
      }
    })
    return {
      register,
      handleSubmit: (values) => {
        console.info('submit values', values)
        createMessage.success('submit success')
      }
    }
  }
})
</script>
```

</details>

**slot 方式渲染表单项**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="m-4">
    <BasicForm @register="register" @submit="handleSubmit">
      <template #customSlot="{ model, field }">
        <el-input v-model:modelValue="model[field]" />
      </template>
    </BasicForm>
    <ElButton type="primary" @click="handleSubmit2">查询2</ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElInput, ElButton } from 'element-plus'

import { BasicForm, useForm } from '@/components/BasicForm'
import { useMessage } from '@/hooks/web/useMessage'

export default defineComponent({
  name: 'FormDemo',
  components: { ElInput, ElButton, BasicForm },
  setup() {
    const { createMessage } = useMessage()

    const [register, { submit, validate, getFieldsValue }] = useForm({
      labelWidth: 100,
      actionColProps: {
        span: 24
      },
      schemas: [
        {
          field: 'field1',
          label: '字段1',
          required: true,
          component: 'ElInput', // 随便填写一项
          slot: 'customSlot'
        },
        {
          field: 'field2',
          component: 'ElInput',
          label: '字段2',
          colProps: {
            span: 8
          },
          required: true
        }
      ]
    })

    function handleSubmit(values: any) {
      console.table('submit values', values)
      createMessage.success('submit success')
    }

    async function handleSubmit2() {
      await validate()

      const values = getFieldsValue()
      console.info('submit values', values)

      submit()
    }

    return {
      register,
      handleSubmit,
      handleSubmit2
    }
  }
})
</script>
```

</details>

**ifShow/show/dynamicDisabled 联合**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="m-4">
    <BasicForm @register="register" />
    <el-alert title="如何启动 '字段4' ？提示： 字段1输入 show" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAlert } from 'element-plus'

import { BasicForm, BasicFormSchema, useForm } from '@/components/BasicForm'

export default defineComponent({
  components: { ElAlert, BasicForm },
  setup() {
    const schemas: BasicFormSchema[] = [
      {
        field: 'field1',
        component: 'ElInput',
        label: '字段1',
        colProps: {
          span: 8
        }
      },
      {
        field: 'field2',
        component: 'ElInput',
        label: '字段2',
        colProps: {
          span: 8
        },
        ifShow: ({ model }) => {
          return model.field1 === 'show'
        }
      },
      {
        field: 'field3',
        component: 'ElSwitch',
        label: '字段3',
        colProps: {
          span: 8
        },
        show: ({ model }) => {
          return !!model.field2
        }
      },
      {
        field: 'field4',
        component: 'ElDatePicker',
        label: '字段4',
        colProps: {
          span: 8
        },
        dynamicDisabled: ({ model }) => {
          return !model.field3
        }
      }
    ]
    const [register] = useForm({
      labelWidth: 120,
      schemas,
      actionColProps: {
        span: 24
      }
    })

    return {
      register
    }
  }
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
| schemas | `array` | - | 表单数据结构，配置参考下方 [BasicFormSchema](#basicformschema) |
| rowProps | `object` | - | 配置全局的`row`，配置参考`ElRow` |
| rowStyle | `object` | - | 配置全局的`row`样式 |
| colProps | `object` | - | 配置全局的`col`，子项也可单独配置，配置参考`ElCol` |
| mergeDynamicData | `object` | - | 额外传递到子组件的参数 |
| autoSetPlaceHolder | `boolean` | `true` | 是否自动设置占位符 |
| autoSubmitOnEnter | `boolean` | `false` | 是否在 input 中输入时按回车提交 |
| submitAfterReset | `boolean` | `false` | 重置时是否提交表单 |
| rulesMessageJoinLabel | `boolean` | `false` | 如果表单项有校验时，是否把验证信息附加到标签中 |
| showActionButtonGroup | `boolean` | `false` | 是否显示操作按钮(重置/查询/折叠) |
| actionColOptions | `object` | - | 操作按钮外层的`col`，配置参考`ElCol` |
| showSubmitButton | `boolean` | `true` | 是否显示提交按钮 |
| submitButtonOptions | `object` | - | 配置提交按钮，配置参考`ElButton` |
| showResetButton | `boolean` | `true` | 是否显示重置按钮 |
| resetButtonOptions | `object` | - | 配置重置按钮，配置参考`ElButton` |
| showAdvancedButton | `boolean` | `false` | 是否显示展开/收起按钮 |
| alwaysShowLines | `number` | `1` | 在支持展开/收起模式下，收起时显示多少行 |
| transformDateFn | `(date:any)=>string` | - | 存在 day.js 对象，则返回`YYYY-MM-DD HH:mm:ss`格式 |
| resetFn | `() => Promise<void>` | - | 自定义重置按钮方法 |
| submitFn | `() => Promise<void>` | - | 自定义提交按钮方法 |
| tableAction | `object` | - | 表格操作项，当和表格组合时存在，配置参考表格的 `TableActionMethods` |

### Methods

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| submit | `() => Promise<Recordable>` | 提交表单，点击提交时返回表单内容 |
| reset | `() => void` | 重置表单 |
| setFormProps | `(formProps: Partial<BasicProps>) => void` | 设置表单的 props |
| getFieldsValue | `() => Recordable` | 获取表单值 |
| setFieldsValue | `(values: Recordable) => void` | 设置表单字段值 |
| updateSchema | `(schema: Partial<BasicFormSchema>) => boolean` | 更新表单的结构数据, 只更新所传的参数结构数据 |
| resetSchema | `(schemaData: BasicFormSchema[]) => void` | 重置表单的结构数据 ，需要传入重置的数据 |
| appendSchemaByField | `(schema: BasicFormSchema, beforeField?: string, first?: boolean) => void` | 插入到指定 filed 后面，如果没传指定 field，则插入到最后，当 first = true 时插入到第一个位置 |
| removeSchemaByField | `(field: string \| string[]) => void` | 根据 field 删除表单的结构数据 |

:::warning 温馨提示

设置表单的 props 有三个方式

> 1.直接在标签上传递 `<BasicForm v-bind="props"></BasicForm>`

> 2.使用 `setProps(props)`

> 3.通过初始化 `useForm(props)`

:::

**以下官方的方法均已支持**

<details>
<summary>展开支持的方法</summary>

:::tip 温馨提示

> validate 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。

> validateField 验证具体的某个字段

> resetFields 重置该表单项，将其值重置为初始值，并移除校验结果

> scrollToField 滚动到指定的字段

> clearValidate 清理某个字段的表单验证信息

:::

</details>

## Events

| 事件            | 回调参数         | 说明                                     |
| --------------- | ---------------- | ---------------------------------------- |
| submit          | `()=>Recordable` | 提交时触发                               |
| reset           | -                | 重置时触发                               |
| advanced-change | `()=>boolean`    | 展开/收起时触发                          |
| register        | -                | `useForm()`时，通过 `@register` 注册组件 |

**以下官方的事件均已支持**

<details>
<summary>展开支持的事件</summary>

:::tip 温馨提示

> validate 任一表单项被校验后触发

:::

</details>

## Slots

| 名称          | 说明           |
| ------------- | -------------- |
| formFooter    | 表单底部区域   |
| formHeader    | 表单顶部区域   |
| resetBefore   | 重置按钮前区域 |
| submitBefore  | 提交按钮前区域 |
| advanceBefore | 展开按钮前区域 |
| advanceAfter  | 展开按钮后区域 |

### BasicFormSchema

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| field | `string` | - | 字段 |
| label | `string` | - | 标签 |
| subLabel | `string` | - | 标签右侧的副标签 |
| changeEvent | `string` | - | 表单更新事件名称，ElInput/ElInputNumber 标签为`input`，其余默认为`change` |
| valueField | `string` | `modelValue` | v-model 的字段 |
| defaultValue | `any` | - | 字段所在的初始值 |
| helpMessage | `string\|string[]\|(rcp: RenderCallbackParams) => string\|string[]` | - | 标签右侧温馨提示 |
| labelWidth | `string\|number` | - | 标签宽度，优先级最高 |
| component | `string` | - | 支持渲染的表单组件，配置参考下方 `ComponentType` |
| componentProps | `object` | - | 所渲染的组件的 props |
| required | `boolean\|(rcp: RenderCallbackParams) => boolean` | - | 字段是否必填，当 rules 为空时生效 |
| rules | `array` | - | 校验规则，配置同 ElFormItem 验证规则，更多参考[async-validator](https://github.com/yiminghe/async-validator) |
| rulesMessageJoinLabel | `boolean` | `false` | 校验信息是否加入标签名称，优先级最高 |
| itemProps | `object` | - | 配置参考官方的 `ElFormItem` |
| colProps | `object` | - | 配置参考官方的 `col`，优先级最高 |
| isAdvanced | `boolean` | `true` | 展开/收起状态，当 `showAdvancedButton` 为 true 时生效 |
| show | `boolean\|(rcp: RenderCallbackParams) => boolean` | - | 判断当前组件是否显示，css 控制，不会删除 dom |
| ifShow | `boolean\|(rcp: RenderCallbackParams) => boolean` | - | 判断当前组件是否显示，js 控制，会删除 dom |
| renderColContent | `(rcp: RenderCallbackParams) => VNode \| VNode[] \| string` | - | 自定义渲染表单项 |
| colSlot | `string` | - | 自定义渲染表单项插槽 |
| render | `(rcp: RenderCallbackParams) => VNode \| VNode[] \| string` | - | 自定义渲染表单项组件 |
| slot | `string` | - | 自定义渲染表单项组件插槽 |
| renderComponentContent | `((rcp: RenderCallbackParams) => any) | VNode | VNode[] | string` | - | 自定义渲染表单项组件内容 |
| dynamicDisabled | `boolean \| ((rcp: RenderCallbackParams) => boolean)` | - | 是否禁用当前表单项 |
| dynamicRules | `(rcp: RenderCallbackParams) => rules[]` | - | 动态返回当前表单项的校验规则 |

### useForm()

<details>
<summary>展开查看说明</summary>

**示例**

```ts
const [register, methods] = useForm()
```

**解释**

**register**

`register` 用于注册 `useForm`，将 `register` 传入组件的 `onRegister`，如 `@register="register"`。

**methods**

`methods` 支持上方[Methods](#methods)全部方法

</details>

**RenderCallbackParams**

```ts
interface RenderCallbackParams {
  schema: BasicFormSchema
  model: Recordable
  field: string
}
```

**componentProps**

- a.当值为对象类型时，该对象将作为`component`所对应组件的的 props

- a.1. 当组件为 `ElRadioGroup`、`ElCheckboxGroup` 时，对象里面必须包含一个 `options` 数组，基础内容为 `{label: string,value: any}`，组件会根据 `options` 的数量，渲染对应的 `ElRadio`、`ElCheckbox` 个数

- b.当值为一个函数时候，参数有 4 个

> `schema`: 表单的整个 schemas

> `formAction`: 操作表单的函数。与 useForm 返回的操作函数一致

> `formModel`: 表单的双向绑定对象，这个值是响应式的。所以可以方便处理很多操作

> `tableAction`: 操作表格的函数，与 useTable 返回的操作函数一致。注意该参数只在表格内开启搜索表单的时候有值，其余情况为`null`,

```tsx
// a.作为对象
componentProps: {
  type: 'password',
  placeholder: '密码',
}

// b.作为函数
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

| 字段            | 类型       | 说明                      |
| --------------- | ---------- | ------------------------- |
| ElCascader      | `official` | 官方 ElCascader 组件      |
| ElCheckboxGroup | `official` | 官方 ElCheckboxGroup 组件 |
| ElDatePicker    | `official` | 官方 ElDatePicker 组件    |
| ElDivider       | `official` | 官方 ElDivider 组件       |
| ElInput         | `official` | 官方 ElInput 组件         |
| ElInputNumber   | `official` | 官方 ElInputNumber 组件   |
| ElRadioGroup    | `official` | 官方 ElRadioGroup 组件    |
| ElRate          | `official` | 官方 ElRate 组件          |
| ElSelect        | `official` | 官方 ElSelect 组件        |
| ElSlider        | `official` | 官方 ElSlider 组件        |
| ElSwitch        | `official` | 官方 ElSwitch 组件        |
| ElTimePicker    | `official` | 官方 ElTimePicker 组件    |

**ComponentType 引用说明**

**统一注册**

这种方式适用于使用频率较高的组件，如`ElInput`

例如： 在 BasicForm/src/componentMap.ts 文件中插入如下示例

```tsx
import { ElInput } from 'element-plus'
componentMap.set('ElInput', ElInput)
```

**单独注册**

使用 **useComponentRegister** 进行注册

这种方式适用于使用频率较低的组件，如`ApiSelect`

这种写法只能在当前页使用，页面销毁之后会从 componentMap 删除相应的组件

```tsx
import { useComponentRegister } from '@/components/BasicForm'
import ApiSelect from '@/components/ApiSelect'

useComponentRegister('ApiSelect', ApiSelect)
```

:::tip 温馨提示

`单独注册`能有效减少打包体积，如果某个组件体积很大，用`统一注册`的话可能会使首屏体积增加

:::

**ElDivider 组件说明**

`ElDivider`类型用于在`schemas`中占位，将会渲染成一个分割线（始终占一整行的版面），可以用于较长表单的版面分隔。请只将 Divider 类型的 schema 当作一个分割线，而不是一个常规的表单字段。

- `ElDivider`仅在`showAdvancedButton`为 false 时才会显示，也就是说如果启用了表单收起和展开功能，`ElDivider`将不会显示
- `ElDivider` 使用`schema`中的`label`以及`helpMessage`来渲染分割线中的提示内容
- `ElDivider` 可以使用`componentProps`来设置除`type`之外的 props
- `ElDivider` 不会渲染`FormItem`，因此`schema`中除`label`、`componentProps`、`helpMessage`、`helpComponentProps`以外的属性不会被用到
