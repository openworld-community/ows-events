<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'vue-final-modal/style.css'
import CommonHeader from '@/components/header/CommonHeader.vue'

// todo - delete this
import LanguageSelector from './components/header/languageSelector.vue'
</script>

<template>
  <LanguageSelector />
  <CommonHeader />
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="less" scoped></style>
