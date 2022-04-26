# Excel 表格导入导出

:::tip 温馨提示

👉👉👉 项目中使用到的是 XLSX，具体文档可以参考[XLSX 文档](https://docs.sheetjs.com/)

:::

## Import 导入

### Usage

```vue
<template>
  <ImpExcel @success="loadDataSuccess">
    <Button>导入Excel</Button>
  </ImpExcel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ImpExcel, ExcelData } from '@/components/Excel'

export default defineComponent({
  components: { ImpExcel },
  setup() {
    function loadDataSuccess(excelDataList: ExcelData[]) {
      console.table(excelDataList)
    }

    return {
      loadDataSuccess
    }
  }
})
</script>
```

### Events

| 事件    | 参数              | 说明         |
| ------- | ----------------- | ------------ |
| success | `(res:ExcelData)` | 导入成功回调 |
| error   | -                 | 导出错误     |

## Export 导出

### Usage

**数组格式数据导出**

```ts
import { aoaToSheetXlsx } from '@/components/Excel'

// data 示例
const header = ['ID', 'Name', 'Age']
const data = [
  [1, 'tony', 18],
  [2, 'lit tony', 6]
]

aoaToSheetXlsx({
  data: [],
  header: [],
  filename: '二维数组方式导出excel.xlsx'
})
```

**自定义导出格式**

```ts
import { jsonToSheetXlsx } from '@/components/Excel'

// data 示例
const data = [
  { id: 1, name: 'tony', age: 14 },
  { id: 2, name: 'lit tony', age: 12 }
]

jsonToSheetXlsx({
  data,
  filename: 'name.xlsx',
  write2excelOpts: {
    // 可以是 xlsx/html/csv/txt
    bookType: 'xlsx'
  }
})
```

**json 格式导出**

```ts
import { jsonToSheetXlsx } from '@/components/Excel'

// data 示例
const data = [
  { id: 1, name: 'tony', age: 14 },
  { id: 2, name: 'lit tony', age: 12 }
]

jsonToSheetXlsx({
  data,
  filename: '默认key为头部.xlsx'
})

jsonToSheetXlsx({
  data,
  header: {
    id: 'ID',
    name: '姓名',
    age: '年龄'
  },
  filename: '自定义头部.xlsx',
  json2sheetOpts: {
    // 指定顺序
    header: ['name', 'id', 'age']
  }
})
```

### Methods

| 方法            | 参数          | 说明                        |
| --------------- | ------------- | --------------------------- |
| jsonToSheetXlsx | `JsonToSheet` | json 格式数据，导出到 excel |
| aoaToSheetXlsx  | `AoAToSheet`  | 数组格式，导出到 excel      |

**JsonToSheet 类型说明**

| 属性            | 类型             | 默认值                 | 说明                                               |
| --------------- | ---------------- | ---------------------- | -------------------------------------------------- |
| data            | `T[]`            | -                      | JSON 对象数组                                      |
| header          | `T`              | -                      | 表头未设置则取 JSON 对象的 `key` 作为 `header`     |
| filename        | `string`         | `excel-list.xlsx`      | 导出的文件名                                       |
| json2sheetOpts  | `JSON2SheetOpts` | -                      | 调用 `XLSX.utils.json_to_sheet` 的可选参数         |
| write2excelOpts | `WritingOptions` | `{ bookType: 'xlsx' }` | 调用 `XLSX.writeFile` 的可选参数，具体参 XLSX 文档 |

**AoAToSheet 类型说明**

| 属性            | 类型             | 默认值                 | 说明                             |
| --------------- | ---------------- | ---------------------- | -------------------------------- |
| data            | `T[][]`          | -                      | 二维数组                         |
| header          | `T`              | -                      | 表头 ；未设置则没有表头          |
| filename        | `string`         | `excel-list.xlsx`      | 导出的文件名                     |
| write2excelOpts | `WritingOptions` | `{ bookType: 'xlsx' }` | 调用 `XLSX.writeFile` 的可选参数 |
