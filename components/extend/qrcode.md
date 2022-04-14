# QrCode 二维码生成器

## Usage

```vue
<template>
  <QrCode :value="qrCodeUrl" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { QrCode } from '@/components/QrCode';

  export default defineComponent({
    components: { QrCode },
    setup() {
      const qrCodeUrl = 'https://www.crlang.com';

      return {
        qrCodeUrl,
      };
    },
  });
</script>
```

**自定义绘制示例**

```vue
<template>
  <QrCode :value="qrCodeUrl" :width="200" @done="onQrcodeDone" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { QrCode } from '@/components/QrCode';

  export default defineComponent({
    components: { QrCode },
    setup() {
      const qrCodeUrl = 'https://www.crlang.com';

      function onQrcodeDone({ ctx }) {
        if (ctx instanceof CanvasRenderingContext2D) {
          ctx.fillStyle = 'black';
          ctx.font = '16px "微软雅黑"';
          ctx.textBaseline = 'bottom';
          ctx.textAlign = 'center';
          ctx.fillText('Tony', 100, 195, 200);
        }
      }

      return {
        qrCodeUrl,
        onQrcodeDone,
      };
    },
  });
</script>
```


## Props

| 属性    | 类型                     | 默认值   | 说明                               |
| ------- | ------------------------ | -------- | ---------------------------------- |
| value   | `string`                 | -        | 二维码地址                         |
| options | `QRCodeRenderersOptions` | -        | 二维码配置                         |
| width   | `number`                 | `200`    | 宽度                               |
| logo    | `string / LogoType`      | -        | 中间 logo 配置                     |
| tag     | `string`                 | `canvas` | 渲染标签，可选 img 不支持内嵌 logo |

**QRCodeRenderersOptions**

| 属性        | 类型     | 默认值    | 说明           |
| ----------- | -------- | --------- | -------------- |
| margin      | `number` | `4`       | 边框留白大小   |
| scale       | `number` | `4`       | 像素颗粒大小   |
| width       | `number` | -         | 二维码大小     |
| color       | `object` | -         | 颜色           |
| color.dark  | `string` | -         | 二维码前景色   |
| color.light | `string` | `#ffffff` | 二维码背景颜色 |

**LogoType**

| 属性         | 类型     | 默认值    | 说明              |
| ------------ | -------- | --------- | ----------------- |
| src          | `string` | -         | logo 图片         |
| logoSize     | `number` | `0.15`    | logo 大小系数     |
| bgColor      | `string` | `#ffffff` | logo 背景颜色     |
| borderSize   | `number` | `0.05`    | logo 边框系数     |
| crossOrigin  | `string` | -         | logo 地址跨域选项 |
| borderRadius | `number` | `8`       | logo 背景圆角     |
| logoRadius   | `number` | `0`       | logo 图片圆角     |

## Methods

| 名称     | 参数                | 说明           |
| -------- | ------------------- | -------------- |
| download | `(fileName:string)` | 下载二维码图片 |

## Events

| 名称  | 参数                              | 说明                     |
| ----- | --------------------------------- | ------------------------ |
| done  | `({data: QrcodeDoneEventParams})` | 绘制完成触发             |
| error | `(error)`                         | 生成二维码时发生错误触发 |

**QrcodeDoneEventParams**

```js
{
  url: string;  // 二维码DataURL数据
  ctx?: CanvasRenderingContext2D;  // 该对象为画布的2D渲染上下文，仅在tag为canvas时有效，可用于自定义绘制
}
```

有关 `CanvasRenderingContext2D` 的更多资料以及绘制方法，请[参考 MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)
