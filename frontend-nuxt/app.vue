<script setup>
import './assets/less/app.less';
import 'vue-final-modal/style.css';
import 'virtual:svg-icons-register';
import { useLocationStore } from './stores/location.store';
await useLocationStore().init();
</script>
<template>
  <HeaderCommon />
  <main class="main">
    <NuxtPage />
  </main>
</template>

<style lang="less" scoped>
.main {
  height: 100%;
  padding-top: var(--header-height);
}
</style>
