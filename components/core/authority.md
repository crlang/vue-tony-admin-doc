# Authority 鉴权容器

:::tip 温馨提示

用于页面内容权限的鉴权组件，常用于按钮级细粒度权限管理

:::

## Usage

<details>
<summary>展开查看 Demo 示例</summary>

```vue
<template>
  <Authority :value="RoleEnum.ADMIN">
    <ElButton type="primary">只有admin角色可见</ElButton>
  </Authority>
</template>

<script>
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

import Authority from '@/components/Authority'
import { RoleEnum } from '@/enums/roleEnum'

export default defineComponent({
  components: { ElButton, Authority },
  setup() {
    return { RoleEnum }
  }
})
</script>
```

</details>

## Props

| 属性  | 类型                                  | 默认值 | 说明                 |
| ----- | ------------------------------------- | ------ | -------------------- |
| value | `RoleEnum,RoleEnum[],string,string[]` | -      | 角色信息或者权限编码 |
