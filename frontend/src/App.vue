<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'vue-final-modal/style.css'
import '@/assets/less/app.less'
import CommonHeader from '@/components/header/CommonHeader.vue'
</script>

<template>
  <CommonHeader />
  <main class="main">
    <RouterView />
  </main>
</template>

<style lang="less" scoped>
.main {
  padding-top: var(--header-height);
}
</style>
