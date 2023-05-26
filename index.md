---
layout: home

title: Vue Tony Admin
titleTemplate: 一个基于 Element Plus 框架的免费开源的中后台模版。使用了最新的 Vue3、Vite4、TypeScript 等主流技术开发，是开箱即用的中后台前端解决方案

hero:
  name: Tony Admin
  text: 一个免费开源的中后台模版
  tagline: 基于 Element Plus 框架并使用了最新的主流技术开发，是开箱即用的中后台前端解决方案。
  image:
    src: /logo.png
    alt: Tony Admin
  actions:
    - theme: brand
      text: 预览
      link: https://crlang.gitee.io/vue-tony-admin-site
    - theme: alt
      text: 开始使用
      link: /guide/
    - theme: alt
      text: 预览1
      link: https://crlang.github.io/vue-tony-admin-site
    - theme: alt
      text: 预览2
      link: https://tony.crlang.com/vue-tony-admin-site

features:
  - icon: 🎉
    title: 技术栈
    details: 使用 Vue3/vite4/TypeScript 等前端前沿技术开发
  - icon: 🧪
    title: 场景
    details: 多达60+的真实场景示例
  - icon: 🎨
    title: 主题
    details: 可配置的主题及灵活的布局
  - icon: 👓
    title: 暗黑模式
    details: 友好的暗黑模式支持
  - icon: 🌐
    title: 国际化
    details: 内置完善的国际化中文方案
  - icon: 🧩
    title: 交互
    details: 拟真实的数据交互
  - icon: 🔒
    title: 权限
    details: 内置完善的动态路由权限生成方案
  - icon: 🎫
    title: 组件
    details: 封装30+常见易用的组件
---

<script setup>
import { onMounted } from 'vue'
import { fetchReleaseTag } from './.vitepress/utils/fetchReleaseTag.js'

onMounted(() => {
  fetchReleaseTag()
})
</script>
