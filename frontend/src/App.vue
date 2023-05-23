<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'vue-final-modal/style.css'
import CommonHeader from '@/components/header/CommonHeader.vue'
</script>

<template>
  <CommonHeader />
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="less" scoped></style>
