<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'vue-final-modal/style.css'
import CommonHeader from '@/components/header/CommonHeader.vue'
import { useI18n } from 'vue-i18n';
const i18n = useI18n();
i18n.locale.value=navigator.language;
console.log(i18n)
</script>

<template>
  <CommonHeader />
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="less" scoped></style>
