<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'vue-final-modal/style.css'
import '@/assets/less/app.less'
import CommonHeader from '@/components/header/CommonHeader.vue'
</script>

<template>
  <LanguageSelector />
  <CommonHeader />
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="less" scoped></style>
