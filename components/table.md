# Table 表格

:::tip 温馨提示
对 `Element Plus` 的 `Table` 组件进行二次封装，**用法简洁，功能丰富**。
:::


## Usage

### 基础示例

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="p-4">
    <BasicTable
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :loading="loading"
      :api="demoListApi"
      :pagination="{ pageSize: 20 }">
      <template #toolbar>
        <el-button @click="changeLoading"> 操作按钮 </el-button>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable } from '@/components/Table'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const loading = ref(false)
    const columns = [
      {
        label: 'ID',
        prop: 'id',
      },
      {
        label: '姓名',
        prop: 'name',
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' },
        ],
      },
      {
        actions: [
          {
            text: '查看',
            callback: handleView,
          },
        ],
      },
    ]

    function changeLoading() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    function handleView(scope) {
      console.table('view ', scope)
    }

    return {
      loading,
      demoListApi,
      columns,
      changeLoading,
    }
  },
})
</script>
```

</details>


### useTable 方式

<details>
<summary>展开查看 Demo 示例</summary>

:::warning 温馨提示

`const [register, methods] = useTable(props)`

> useTable -> 用于调用 Table 内部方法及 table 参数配置

> methods -> 表格的 props 也可以直接注册到 useTable 内部

> register -> 用于注册 useTable，如果需要使用`useTable`提供的 api，必须将 register 传入组件的 onRegister ，如 `<BasicTable @register="register" />`

:::

```vue
<template>
  <div class="p-4">
    <el-button @click="changeLoading()"> 操作按钮 </el-button>
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import type { BasicColumn } from '@/components/Table'

import { defineComponent, h } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable, useTable } from '@/components/Table'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const columns:BasicColumn[] = [
      {
        label: 'ID',
        prop: 'id',
        customRender: ({ text }) => {
          return h(ElButton, { type: 'info' }, () => text)
        },
      },
      {
        label: '姓名',
        prop: 'name',
      },
      {
        actions: [
          {
            text: '查看',
            callback: handleView,
          },
        ],
      },
    ]

    const [registerTable, { setLoading }] = useTable({
      api: demoListApi,
      columns,
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

    return {
      registerTable,
      changeLoading,
    }
  },
})
</script>
```

</details>


### template 方式

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
      :rowSelection="{ type: 'checkbox' }">
      <template #toolbar>
        <el-button @click="changeLoading"> 操作按钮 </el-button>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
import type { BasicColumn, TableActionType } from '@/components/Table'

import { defineComponent, ref, unref, h } from 'vue'
import { ElButton } from 'element-plus'
import { BasicTable } from '@/components/Table'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { ElButton, BasicTable },
  setup() {
    const tableRef = ref<Nullable<TableActionType>>(null)
    const columns:BasicColumn[] = [
      {
        label: 'ID',
        prop: 'id',
        width: 150,
        customRender: ({ text }) => {
          return h(ElButton, { type: 'info' }, () => text)
        },
      },
      {
        label: '姓名',
        prop: 'name',
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' },
        ],
      },
    ]

    function getTableAction() {
      const tableAction = unref(tableRef)
      if (!tableAction) {
        throw new Error('tableAction is null')
      }
      return tableAction
    }
    function changeLoading() {
      getTableAction().setLoading(true)
      setTimeout(() => {
        getTableAction().setLoading(false)
      }, 1000)
    }
    return {
      tableRef,
      demoListApi,
      columns,
      changeLoading,
    }
  },
})
</script>
```

</details>


### 通过权限或业务控制

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <div class="p-4">
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
import type { BasicColumn } from '@/components/Table'

import { defineComponent } from 'vue'
import { BasicTable, useTable } from '@/components/Table'
import { demoListApi } from '@/api/demo/table'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const columns: BasicColumn[] = [
      {
        label: '编号',
        prop: 'no',
        width: 100,
      },
      {
        label: '姓名',
        prop: 'name',
        auth: 'test', // 根据权限控制是否显示: 无权限，不显示
      },
      {
        label: '地址',
        prop: 'address',
        auth: 'admin',
        ifShow: true, // 同时根据权限和业务控制是否显示
      },
      {
        actions: [
          {
            text: '启用',
            callback: handleOpen,
          },
          {
            text: '编辑',
            callback: handleEdit,
            auth: 'test', // 根据权限控制是否显示: 无权限，不显示
          },
          {
            text: '删除',
            callback: handleDelete,
            auth: 'super', // 根据权限控制是否显示: 有权限，会显示
          },
        ],
      },
    ]

    const [registerTable] = useTable({
      title: 'TableAction组件及固定列示例',
      api: demoListApi,
      columns: columns,
      border: true,
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
      handleOpen,
    }
  },
})
</script>
```

</details>


## Props

::: tip 温馨提示

- **保持** [Element Plus Table 组件](https://element-plus.org/zh-CN/component/table.html) **原有功能**的情况下扩展以下属性

:::


| 属性   | 类型    | 默认值  | 说明   |
| ------ | -------- | ------- | ---------  |
| dataSource | `array` | - | 表格数据，没有api请求的情况 |
| columns | `array` | - | 表格列数据，传入 `BasicColumn`数组 |
| api | `(...arg: any) => Promise<any>` | - | 请求接口，可以直接将`src/api`内的`Promise`函数直接传入 |
| showTableSetting | `boolean` | `false` | 是否显示表格设置 |
| tableSetting | `object` | - | 表格设置工具配置，传入 `TableSetting`对象 |
| autoCreateKey | `boolean` | `true` | 是否自动生成 key |
| beforeFetch | `(T)=>T` | - | 请求之前对参数进行处理 |
| afterFetch | `(T)=>T` | - | 请求之后对返回值进行处理 |
| handleSearchInfoFn | `(T)=>T` | - | 开启表单后，在请求之前处理搜索条件参数 |
| fetchSetting | `object` | - | 接口请求配置，传入 `FetchSetting`对象 |
| immediate | `boolean` | `true` | 组件加载后是否立即请求接口，有api请求的情况 |
| searchInfo | `object` | - | 额外的请求参数 |
| useSearchForm | `boolean` | `false` | 使用搜索表单 |
| formConfig | `object` | - | 表单配置，传入 `FormProps`对象 |
| showIndexColumn | `boolean` | `true` | 是否显示序号列 |
| showCheckboxColumn | `boolean` | `true` | 是否显示选择列 |
| canResize | `boolean` | `true` | 是否可以自适应高度 |
| title | `string` | - | 表格标题 |
| titleHelpMessage | `string\|string[]` | - | 表格标题右侧温馨提醒 |
| pagination | `object\|boolean` | - | 分页信息配置，为 `false` 不显示分页，传入`ElPagination`对象 |
| loading | `boolean` | `false` | 表格 loading 状态 |
| childrenColumnName | `string` | `children` | 表格子项名称 |


## Methods

| 属性           | 参数                   | 说明                                 |
| -------------- | -------------------- | ------------------------------------ |
| reload       | -           | 刷新表格                       |
| setProps       | `(props:object)`           | 用于设置表格参数                       |
| getColumns       | -           | 获取表头数据                       |
| setColumns       | `(column:array)`           | 设置表头数据                       |
| setLoading       | `(loading:boolean)`           | 设置表格 loading 状态                       |
| getDataSource       | -           | 获取表格数据                       |
| getRawDataSource       | -           | 获取后端接口原始数据                       |
| setTableData       | `(record:array)`           | 设置表格数据                       |
| getCacheColumns       | -           | 获取缓存的表头数据                       |
| redoHeight       | -           | 重新计算表格高度                       |
| setPagination       | `(paginationInfo:object)`           | 设置分页信息，分页配置参考`El  Pagination`                     |
| getPagination       | -           | 获取当前分页信息                       |
| getFormRef       | -           |  如果开启了搜索区域。可以通过该函数获取表单对象 |
| expandAll       | -           | 展开树形表格                       |
| collapseAll       | -           | 折叠树形表格                       |
| deleteTableDataRecord       | `(record:object\|array)`           | 动态删除指定行的数据 |
| insertTableDataRecord       | `(record:object\|array,index:number)`           | 根据传入的 `index` 值决定插入数据行的位置，不传则是顺序插入  |
| updateTableDataRecord       | `(rowkey:string,record:object)`           | 更新指定行的数据 |
| findTableDataRecord       | `(rowkey)`           | 获取指定行的数据 |
| updateTableData       | `(index:number,key:string,value:object)`           | 更新表格数据 |

:::tip 温馨提示

官方以下方法均已支持

> clearSelection -> 多选，清空用户选择

> toggleRowSelection -> 切换用户选择

> toggleAllSelection -> 全选、取消全选

> toggleRowExpansion -> 展开、收起展开表格

> setCurrentRow -> 单选，高亮当前选择

> clearSort -> 清空排序信息

> clearFilter -> 清除筛选信息

> doLayout -> 重新加载表格布局，通常用于表格列改变后执行

> sort -> 根据 prop 排序

:::


## Events

| 事件             | 回调参数                                | 说明                                |
| ---------------- | --------------------------------------- | ----------------------------------- |
| pagination    | `(ElPagination)`               | 分页发生变化后触发                  |
| fetch-success    | `({items,total})`               | 接口请求成功后触发                  |
| fetch-error      | `(error)`                       | 接口请求错误触发                            |
| columns-change | `({prop，fixed, visible})`                | 列发生变化后触发                        |
| register    | -               | 表格注册后触发                  |

:::tip 温馨提示

官方以下事件均已支持

> select 选择时触发

> select-all 全选时触发

> selection-change 选择变化时触发

> cell-mouse-enter 鼠标进入单元格时触发

> cell-mouse-leave 鼠标离开单元格时触发

> cell-click 鼠标点击单元格时触发

> cell-dblclick 鼠标双击单元格时触发

> cell-contextmenu 鼠标右击单元格时触发

> row-click 鼠标点击行时触发

> row-contextmenu 鼠标右击行时触发

> row-dblclick 鼠标双击行时触发

> header-click 鼠标点击列时触发

> header-contextmenu 鼠标右击列时触发

> sort-change 排序改变时触发

> filter-change 筛选改变时触发

> current-change 单选当前行改变时触发

> header-dragend 拖动头部列宽度改变时触发

> expand-change 展开收缩时触发

:::


## BasicColumn

::: tip 温馨提示

- **继承** [Element Plus Table 组件的 Table-column](https://element-plus.org/zh-CN/component/table.html) **原有功能**的情况下扩展以下属性

:::

| 属性               | 类型                                                      | 默认值   | 说明                     |
| ------------------ | --------------------------------------------------------- | ------- --------------------- |

| label      | `string`                                                 | -      | 列名称，更多参考 ElTableColumn 描述 |
| prop      | `string`                                                 | -      | 列字段名称，更多参考 ElTableColumn 描述|
| isSlot      | `boolean`                                                 | `false`      | 是否slot模式，默认slot名称为 prop 值 |
| actions      | `array`                                                 | -      | 如果存在，则当前列为操作列，传入`ActionItem`对象数组 |
| auth               | `string\|string[]`       | -          | 根据权限编码来控制当前列是否显示， 传入`RoleEnum`数组或字符串，`RoleEnum`需自定义   |
| ifShow             | `boolean\|() => boolean`            | -          | 根据业务状态来控制当前列是否显示    |
| defaultHidden      | `boolean`                                                 | `false`      | 默认隐藏，可在列配置显示 |
| customRender      | `({text, record, index},scope,column)=>any`                                                 | `false`      | 表单元格的渲染器。返回值应该是VNode |
| children        | `array`                                        | -          | 表格子项，传入 `BasicColumn`数组|


## Slots

| 名称              | 说明             |
| ----------------- | ---------------- |
| tableTitle        | 表格顶部左侧区域 |
| toolbar           | 表格顶部右侧区域 |
| headerTop | 表格顶部区域（标题上方）       |


## 全局配置

在`componentsSettings`可以配置全局参数，用于统一整个项目的风格，可以通过 props 传值覆盖
