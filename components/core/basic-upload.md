# BasicUpload 文件上传

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <BasicUpload
    @change="handleChange"
    :api="uploadApi"
    :modelValue="uploadList"
    uploadName="file"
    :maxSize="5"
    :maxNumber="3"
    @delete="handleDelete"
    :accept="['png', 'jpg', 'jpeg', 'webp', 'svg']"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BasicUpload } from '@/components/BasicUpload'
import { useMessage } from '@/hooks/web/useMessage'
import { uploadApi } from '@/api/sys/upload'

export default defineComponent({
  components: { BasicUpload },
  setup() {
    const { createMessage } = useMessage()
    const uploadList = ref<string[]>()
    function handleDelete(record: Recordable) {
      createMessage.info(`移除文件${JSON.stringify(record)}`)
    }
    function handleChange(list: Recordable) {
      createMessage.info(`已上传文件${JSON.stringify(list)}`)
    }

    return {
      uploadList,
      handleChange,
      handleDelete,
      uploadApi
    }
  }
})
</script>
```

</details>

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| api | `Fn` | - | 必填，上传接口函数 |
| uploadName | `string` | `file` | 必填，上传文件参数名 |
| modelValue | `string[]` | - 已上传的文件列表 |
| showPreview | `boolean` | `true` | 是否显示预览入口 |
| showPreviewNumber | `boolean` | `true` | 是否显示预览数量 |
| emptyHidePreview | `boolean` | `false` | 没有上传文件时是否隐藏预览 |
| helpText | `string` | - | 上传按钮左侧的帮助文本 |
| maxSize | `number` | `2` | 单个文件最大支持大小(MB) |
| maxNumber | `number` | `Infinity` | 最大上传数量，Infinity 则不限制 |
| accept | `string[]` | - | 限制上传格式，可使用文件后缀名(点号可选)或 MIME 字符串。例如 `['.doc,','application/msword','image/*']` |
| multiple | `boolean` | - | 是否支持多文件上传 |
| disabled | `boolean` | - | 是否禁用上传 |
| uploadParams | `object` | - | 上传携带的参数 |
| showThumb | `boolean` | `false` | 是否为缩略图模式 |
| thumbSize | `number` | `200` | 缩略图尺寸大小(px) |

## Events

| 事件           | 参数           | 说明                                 |
| -------------- | -------------- | ------------------------------------ |
| change         | `(string[])`   | 文件列表(包括预览列表)内容改变时触发 |
| delete         | `(record)`     | 在上传列表中删除文件时触发           |
| preview-delete | `(url:string)` | 在预览列表中删除文件时触发           |

## Config

**配置开发环境**

添加一个**上传地址数组**到 VITE_PROXY

```bash
# 打开文件 .env.development

# /upload 和下方 VITE_GLOB_UPLOAD_URL 的保持一致
# http://example.com/upload 为真实上传地址，请根据实际修改
VITE_PROXY=[["/upload","http://example.com/upload"]]

# IF 如果跨域，地址保持 VITE_PROXY 中的一致
VITE_GLOB_UPLOAD_URL=/upload

# ELSE 如果真实上传地址不存在跨域问题，请改成如下
VITE_GLOB_UPLOAD_URL=http://example.com/upload
```

**配置生产环境**

直接修改为真实的上传地址即可，如下

```bash
# 打开文件 .env.production

VITE_GLOB_UPLOAD_URL=http://example.com/upload
```
