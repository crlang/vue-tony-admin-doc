# List 数据列表


### Usage

```vue
<template>
  <div class="p-4">
    <List>
      <ListItem
        v-for="k in 20"
        :key="k"
        title="Tony Admin"
        thumb="https://himg.bdimg.com/sys/portrait/hotitem/wildkid/31`">
        <template #description>
          基于 Vue3, TypeScript, Element Plus 实现的一套完整的企业级后台管理系统
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { List, ListItem } from '@/components/List'

export default defineComponent({
  components: { List, ListItem },
  setup() {
    return {}
  },
})
</script>
```


## ListItem 列表项

### Props

| 属性            | 类型          | 默认值  | 说明                   |
| --------------- | ------------- | ------  | -------------------------- |
| thumb          | `string`     | - | 缩略图 |
| title          | `string`      | -  | 列表标题 |
| description            | `string`      | -    | 列表描述 |


### Slots

| 名称          | 说明                |
| ------------- | ------------------- |
| thumb            | 自定义缩略图 |
| title          | 自定义标题 |
| description           | 自定义描述 |
