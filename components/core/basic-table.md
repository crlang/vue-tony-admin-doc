# BasicTable 表格

:::tip 温馨提示

对 `Element Plus` 的 `Table` 组件进行二次封装，**代码简洁，功能丰富**。

:::

## Usage

**常规示例**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="p-4">
    <BasicTable title="基础示例" titleHelpMessage="温馨提醒" :columns="columns" :loading="loading" :api="demoListApi">
      <template #toolbar>
        <el-button @click="changeLoading">操作按钮</el-button>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

import { BasicTable } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const loading = ref(false)
    const columns = [
      {
        label: 'ID',
        prop: 'id'
      },
      {
        label: '姓名',
        prop: 'name',
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' }
        ]
      },
      {
        actions: [
          {
            text: '查看',
            callback: handleView
          }
        ]
      }
    ]

    function changeLoading() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    function handleView(scope) {
      console.log('view ', scope)
    }

    return {
      loading,
      demoListApi,
      columns,
      changeLoading
    }
  }
})
</script>
```

</details>

**useTable 示例(推荐)**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="p-4">
    <el-button @click="changeLoading()">操作按钮</el-button>
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import type { BasicColumn } from '@/components/BasicTable'

import { defineComponent, h } from 'vue'
import { ElButton } from 'element-plus'

import { BasicTable, useTable } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const columns: BasicColumn[] = [
      {
        label: 'ID',
        prop: 'id',
        customRender: ({ text }) => {
          return h(ElButton, { type: 'info' }, () => text)
        }
      },
      {
        label: '姓名',
        prop: 'name'
      },
      {
        actions: [
          {
            text: '查看',
            callback: handleView
          },
          {
            text: '删除',
            type: 'danger',
            callback: handleDelate,
            popConfirm: {
              type: 'error',
              title: '是否删除?'
            }
          }
        ]
      }
    ]

    const [registerTable, { setLoading }] = useTable({
      api: demoListApi,
      columns
    })

    function changeLoading() {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    function handleView(scope) {
      console.table('view ', scope)
    }

    function handleDelate(scope) {
      console.table('view ', scope)
    }
    return {
      registerTable,
      changeLoading
    }
  }
})
</script>
```

</details>

**常规示例(拓展)**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="p-4">
    <BasicTable
      :canResize="false"
      title="RefTable示例"
      titleHelpMessage="使用Ref调用表格内方法"
      ref="tableRef"
      :api="demoListApi"
      :columns="columns"
      rowKey="id"
      :rowSelection="{ type: 'checkbox' }"
    >
      <template #toolbar>
        <el-button @click="changeLoading">操作按钮</el-button>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
import type { BasicColumn, TableActionMethods } from '@/components/BasicTable'

import { defineComponent, ref, unref, h } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const tableRef = ref<Nullable<TableActionMethods>>(null)
    const columns: BasicColumn[] = [
      {
        label: 'ID',
        prop: 'id',
        width: 150,
        customRender: ({ text }) => {
          return h(ElButton, { type: 'info' }, () => text)
        }
      },
      {
        label: '姓名',
        prop: 'name',
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' }
        ]
      }
    ]

    function getTable() {
      const table = unref(tableRef)
      if (!table) {
        throw new Error('table instance does not exist!')
      }
      return table
    }
    function changeLoading() {
      getTable().setLoading(true)
      setTimeout(() => {
        getTable().setLoading(false)
      }, 1000)
    }
    return {
      tableRef,
      demoListApi,
      columns,
      changeLoading
    }
  }
})
</script>
```

</details>

**权限或业务控制**

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="p-4">
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import type { BasicColumn } from '@/components/BasicTable'

import { defineComponent } from 'vue'

import { BasicTable, useTable } from '@/components/BasicTable'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const columns: BasicColumn[] = [
      {
        label: '编号',
        prop: 'no',
        width: 100
      },
      {
        label: '姓名',
        prop: 'name',
        auth: 'test' // 根据权限控制是否显示: 无权限，不显示
      },
      {
        label: '地址',
        prop: 'address',
        auth: 'admin',
        ifShow: true // 同时根据权限和业务控制是否显示
      },
      {
        actions: [
          {
            text: '启用',
            callback: handleOpen,
            popConfirm: {
              title: '是否启用?',
              type: 'success'
            }
          },
          {
            text: '编辑',
            callback: handleEdit,
            auth: 'test' // 根据权限控制是否显示: 无权限，不显示
          },
          {
            text: '删除',
            callback: handleDelete,
            popConfirm: {
              title: '是否删除?',
              type: 'warning'
            },
            auth: 'admin' // 根据权限控制是否显示: 有权限，会显示
          }
        ]
      }
    ]

    const [registerTable] = useTable({
      title: 'TableAction组件及固定列示例',
      api: demoListApi,
      columns: columns,
      border: true
    })

    function handleEdit(record: Recordable) {
      console.log('点击了编辑', record)
    }

    function handleDelete(record: Recordable) {
      console.log('点击了删除', record)
    }
    function handleOpen(record: Recordable) {
      console.log('点击了启用', record)
    }

    return {
      registerTable,
      handleEdit,
      handleDelete,
      handleOpen
    }
  }
})
</script>
```

</details>

## Props

::: tip 温馨提示

- **保持** [Element Plus Table 组件](https://element-plus.org/zh-CN/component/table.html) **原有功能**的情况下扩展以下属性

:::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| dataSource | `array` | - | 直接传入表格数据，没有`api`函数的情况 |
| columns | `array` | - | 表格列数据，传入[BasicColumn](#basiccolumn)数组 |
| api | `(...arg: any) => Promise<any>` | - | 请求接口，可以直接将`src/api`内的`Promise`接口函数直接传入 |
| title | `string` | - | 表格标题 |
| titleHelpMessage | `string\|string[]` | - | 表格标题右侧温馨提醒 |
| showTableSetting | `boolean` | `false` | 是否显示表格设置 |
| tableSetting | `object` | - | 表格工具配置，可选： redo(刷新)、size(密度)、fullScreen(全屏) |
| fetchSetting | `object` | - | 接口请求配置，配置请参考 `settings/componentSetting/fetchSetting` |
| autoCreateKey | `boolean` | `true` | 是否自动生成 key |
| beforeFetchFn | `(data: Recordable) => Recordable` | - | 请求之前对参数进行处理 |
| afterFetchFn | `(data: Recordable[]) => Recordable[]` | - | 请求之后对返回值进行处理 |
| searchFn | `(data: Recordable) => Recordable` | - | 开启表单后，在查询请求之前处理搜索条件参数 |
| sortFn | `(data: ColumnSorterResult) => Recordable` | - | 列排序时对排序参数进行处理 |
| filterFn | `(data: Recordable[]) => Recordable[]` | - | 列筛选时对排序参数进行处理 |
| immediate | `boolean` | `true` | 组件加载后是否立即请求接口，有`api`函数的情况 |
| useSearchForm | `boolean` | `false` | 是否使用搜索表单 |
| searchInfo | `object` | - | 额外的搜索表单请求参数 |
| formConfig | `object` | - | 表单配置，配置参考 BasicForm 组件 |
| showIndexColumn | `boolean` | `false` | 是否显示序号列 |
| showCheckboxColumn | `boolean` | `false` | 是否显示复选框列 |
| canResize | `boolean` | `false` | 表格是否自适应高度 |
| pagination | `object\|boolean` | - | 分页信息配置，为 `false` 不显示分页，传入`ElPagination`对象 |
| loading | `boolean` | `false` | 表格 loading 状态 |
| childrenColumnName | `string` | `children` | 子项的所在的字段名称，一般用在展开表格 |

## Methods

| 属性 | 参数 | 说明 |
| --- | --- | --- |
| setTableProps | `(props: Partial<BasicProps>) => void` | 更新表格 props |
| getColumns | `(opt?: GetColumnsParams) => BasicColumn[]` | 获取表格列 |
| setColumns | `(columns: BasicColumn[] \| string[]) => void` | 更新列，支持列数据或者 prop 字段集 |
| getCacheColumns | `() => BasicColumn[]` | 获取缓存列 |
| setLoading | `(loading: boolean) => void` | 更新加载状态 |
| reload | `(opt?: FetchParams) => Promise<void>` | 重载表格数据 |
| getDataSource | `<T = Recordable>() => T[]` | 处理表格数据 |
| getRawDataSource | `<T = Recordable>() => T` | 获取未处理的原始的接口数据 |
| setTableData | `<T = Recordable>(values: T[]) => void` | 更新表格数据 |
| updateTableData | `(index: number, prop: string, value: any) => Recordable` | 更新表格数据，与 `updateTableDataRecord` 不同的是，这个可以单独修改某行的某个字段 |
| updateTableDataRecord | `(rowKey: string \| number, record: Recordable) => Recordable \| void` | 根据 key 更新指定行的整行的记录 |
| deleteTableDataRecord | `(rowKey: string \| number) => Recordable \| void` | 根据 rowKey 删除指定行记录 |
| insertTableDataRecord | `(record: Recordable, index?: number) => Recordable \| void` | 插入一条记录，如果索引存在，则插入索引的位置，否则插入最后的位置 |
| findTableDataRecord | `(rowKey: string \| number) => Recordable \| void` | 根据 rowKey 查找所在行记录 |
| redoHeight | - | 刷新高度-重新计算表格高度 |
| setPagination | `(info: Partial<ElePagination>) => void` | 更新分页信息 |
| getPagination | `() => Partial<ElePagination> \| boolean` | 获取分页信息 |
| expandAll | - | 展开全部-树形表格 |
| collapseAll | - | 收起全部-树形表格 |

**以下官方的方法均已支持**

<details>
<summary>展开支持的方法</summary>

:::tip 温馨提示

> clearSelection -> 用于多选表格，清空用户的选择 getSelectionRows -> 返回当前选中的行

> toggleRowSelection -> 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否

> toggleAllSelection -> 用于多选表格，切换全选和全不选

> toggleRowExpansion -> 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。

> setCurrentRow -> 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。

> clearSort -> 用于清空排序条件，数据会恢复成未排序的状态

> clearFilter -> 传入由 columnKey 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器

> doLayout -> 对 Table 进行重新布局。 当表格可见性变化时，您可能需要调用此方法以获得正确的布局

> sort -> 手动排序表格。 参数 prop 属性指定排序列，order 指定排序顺序。

:::

</details>

## Events

| 事件          | 回调参数               | 说明                                      |
| ------------- | ---------------------- | ----------------------------------------- |
| pagination    | `(ElPagination)`       | 分页发生变化后触发                        |
| fetch-success | `({items,page,total})` | 接口请求成功后触发                        |
| fetch-error   | -                      | 接口请求错误触发                          |
| register      | -                      | `useTable()`时，通过 `@register` 注册组件 |

**以下官方的事件均已支持**

<details>
<summary>展开支持的事件</summary>

:::tip 温馨提示

> select 当用户手动勾选数据行的 Checkbox 时触发的事件

> select-all 当用户手动勾选全选 Checkbox 时触发的事件

> selection-change 当选择项发生变化时会触发该事件

> cell-mouse-enter 当单元格 hover 进入时会触发该事件

> cell-mouse-leave 当单元格 hover 退出时会触发该事件

> cell-click 当某个单元格被点击时会触发该事件

> cell-dblclick 当某个单元格被双击击时会触发该事件

> cell-contextmenu 当某个单元格被鼠标右键点击时会触发该事件

> row-click 当某一行被点击时会触发该事件

> row-contextmenu 当某一行被鼠标右键点击时会触发该事件

> row-dblclick 当某一行被双击时会触发该事件

> header-click 当某一列的表头被点击时会触发该事件

> header-contextmenu 当某一列的表头被鼠标右键点击时触发该事件

> sort-change 当表格的排序条件发生变化的时候会触发该事件

> filter-change column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件

> current-change 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性

> header-dragend 当拖动表头改变了列的宽度的时候会触发该事件

> expand-change 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）

:::

</details>


## BasicColumn

::: tip 温馨提示

- **继承** [Element Plus Table 组件的 Table-column](https://element-plus.org/zh-CN/component/table.html) **原有功能**的情况下扩展以下属性

:::

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| label | `string` | - | 列名称，更多参考 `ElTableColumn` |
| prop | `string` | - | 列字段名称，更多参考 `ElTableColumn` |
| actions | `array` | `TableActionItem[]` | 如果存在，则当前列为操作列，传入`TableActionItem`对象数组 |
| children | `array` | `BasicColumn[]` | 表格子项，传入 `BasicColumn`数组 |
| isSlot | `boolean` | `false` | 是否 slot 模式，默认 slot 名称为 `prop` 值 |
| defaultHidden | `boolean` | `false` | 是否默认默认隐藏 |
| customRender | `object` | `TableColumnRender` | 表单元格的渲染器，传入`TableColumnRender`对象。返回值应该是 VNode |
| auth | `RoleEnum \| RoleEnum[] \| string \| string[]` | - | 根据权限编码来控制当前列是否显示， 传入`RoleEnum`数组或字符串，`RoleEnum`需自定义 |
| ifShow | `boolean\|() => boolean` | `false` | 根据业务状态来控制当前列是否显示 |

## Slots

| 名称       | 说明                     |
| ---------- | ------------------------ |
| title | 表格标题         |
| toolbar    | 表格顶部右侧区域         |
| headerTop  | 表格顶部上方区域 |
| headerBottom | 表格顶部下方区域         |

### useTable()

<details>
<summary>展开查看说明</summary>

**示例**

```ts
const [register, methods] = useTable()
```

**解释**

**register**

`register` 用于注册 `useTable`，将 `register` 传入组件的 `onRegister`，如 `@register="register"`。

**methods**

`methods` 支持上方[Methods](#methods)全部方法，以及下方的方法

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| getFormRef | - | 操作 `BasicForm` 组件实例，支持 `BasicForm` 的方法 |

</details>

**TableActionItem**

| 名称   | 参数          | 说明                              |
| ------ | ------------- | --------------------------------- |
| text   | `string`      | 当前单元格的内容                  |
| index  | `number`      | 当前单元格所在索引                |
| record | `Record`      | 当前行的数据                      |
| scope  | `scopeInfo`   | 继承官方内容，内容为 `{row,column,$index}` |
| column | `BasicColumn` | 当前列的数据                      |

**TableColumnRender**

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| svgName | `string` | Svg 图标的名称 |
| popConfirm | `object` | 如果有，将转为弹窗确认按钮模式，配置参考 `useMessage` 的 `createConfirm` |
| auth | `RoleEnum \| RoleEnum[] \| string \| string[]` | 通过权限判断是否显示当前操作项 |
| ifShow | `boolean \| ((action: TableActionItem) => boolean)` | 通过条件判断是否显示 |
| callback | `(info: scopeInfo, action?: EleActionPopconfirmAction) => void` | 操作列的点击回调，当为确认按钮模式时，将会在确认弹窗操作后触发回调 |

## 全局配置

在`componentsSettings`可以配置全局参数，用于统一整个项目的风格，可以通过 props 传值覆盖
