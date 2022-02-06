# Button 自定义按钮

对 `Element Plus` 的 `Button` 组件二次封装，且已经全局注册，直接使用 `Button` 标签即可


::: warning

- 注意 Button 大小写

- 如果是 Tsx 文件，需要手动 import

:::

## Usage

```vue
<template>
  <Button type="success" preIcon="ion:layers-outline">成功按钮</Button>
  <Button type="error">错误按钮</Button>
  <Button :iconSize="16" sufIcon="ion:layers-outline">警告按钮</Button>
</template>
```

## Props

::: tip 温馨提示

- 这是一个基础全局组件示例，更多实际场景常用的组件，给予参考

- **保持** [Element Plus button 组件](https://element-plus.gitee.io/zh-CN/component/button.html) **原有功能**的情况下扩展以下属性

:::

| 属性     | 类型                           | 默认值 | 说明                           |
| -------- | ------------------------------ | ------ | ------------------------------ |
| iconSize | `number`                       | `14`   | 按钮图标大小                   |
| preIcon  | `string`                       | -      | 按钮文本前图标，参考 Icon 组件 |
| sufIcon  | `string`                       | -      | 按钮文本后图标，参考 Icon 组件 |
| shadow   | `boolean`                      | `false`  | 按钮阴影                   |
