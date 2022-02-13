# Cropper 图片/头像裁剪


:::tip 温馨提示
测试此方法需要在启动测试服务器，启动方法请看 ` 指南 -> 其它 -> 测试服务 `
:::


## CropperImage 裁剪图片

### Usage

```vue
<template>
  <CropperImage ref="refCropper" :src="img" @cropend="handleCropend"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CropperImage } from '@/components/Cropper'
import img from '@/assets/images/header.jpg'

export default defineComponent({
  components: {
    CropperImage,
  },
  setup() {
    function handleCropend(data) {
      console.log(data)
    }

    return {
      img,
      handleCropend,
    }
  },
})
</script>
```

### Props

| 属性            | 类型      | 默认值           | 说明             |
| --------------- | --------- | ---------------- | ---------------- |
| src             | `string`  | -                | 图片 URL           |
| alt             | `string`  | -                | 图片 alt         |
| circled         | `boolean` | `false`          | 圆形裁剪框       |
| realTimePreview | `boolean` | `true`           | 是否实时返回数据，否则需要执行 `croppered()` 才会返回数据     |
| size           | `number`  | `300`            | 图片展示尺寸(px)             |
| crossorigin     | `string`  | -                | 跨域源，可选`anonymous`/`use-credentials`      |
| imageStyle      | `object`  | -               | 图片样式         |
| options         | `object`  | `DefaultOptions` | corpperjs 配置项 |

#### DefaultOptions

```ts
{
  aspectRatio: 1,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true,
}
```

文档参考👉👉👉 [cropperjs 文档](https://github.com/fengyuanchen/cropperjs/blob/main/README.md#options)


### Events

| 名称      | 参数                             |  说明         |
| --------- | --------------------------------  | ------------ |
| ready    | `(cropper)`                         |  载入图像之后触发  |
| cropend    | `(base64Img, imgInfo)`               | 裁剪完成时触发   |
| cropendError    | -              | 裁剪失败时触发   |


### Methods

| 名称      | 参数                     |  说明         |
| --------- | ----------------------- | ------------ |
| croppered    | -                    | `realTimePreview` 为 `false` 时，需要执行此方法裁剪，才会返回数据   |



## CropperAvatar 裁剪头像

### Usage

```vue
<template>
  <CropperAvatar :uploadApi="uploadApi" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CropperAvatar } from '@/components/Cropper'
import { uploadApi } from '@/api/sys/upload'

export default defineComponent({
  components: {
    CropperAvatar,
  },
  setup() {
    return { uploadApi }
  },
})
</script>
```

### Props

| 属性      | 类型                                  | 默认值  | 说明         |
| --------- | -------------------------------------  | ------- | ------------ |
| size     | `number`                              | `200`   | 头像尺寸       |
| value   | `string` | -       | 默认头像URL地址 |
| showBtn     | `boolean`                        | -       | 是否显示上传按钮 |
| btnType   | `string`                            | true    | 按钮类型（参考按钮类型） |
| btnText   | `string`                       | -       | 按钮文字    |
| uploadName  | `string`                    | -       | 上传的文件参数名 |
| uploadApi | `(params: UploadFileParams) => Promise<void>` | -       | 上传的接口方法 |

**UploadFileParams**

```ts
{
  // 上传的文件
  file: File | Blob;
  // 其它参数
  data?: Recordable;
  // 上传的文件参数名
  name?: string;
  // 上传的文件名
  filename?: string;
}
```


### Events

| 名称      | 参数                                |  说明         |
| --------- | -----------------------------------------  | ------------ |
| change    | `({base64Img,responseData})`               | 当头像上传完成时触发   |
