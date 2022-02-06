

# Authority 鉴权

用于项目权限的鉴权组件，一般用于按钮级等细粒度权限管理

## Usage

```vue
<template>
  <div>
    <Authority :value="RoleEnum.ADMIN">
      <ElButton type="primary"> 只有admin角色可见 </ElButton>
    </Authority>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import Authority from '@/components/Authority'

export default defineComponent({
  components: { Authority, ElButton },
})
</script>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `RoleEnum,RoleEnum[],string,string[]` | - | 角色信息或者权限编码。会自动区分权限模式 |
