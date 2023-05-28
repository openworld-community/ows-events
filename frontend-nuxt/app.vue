<script setup>
import { useLocationStore } from './stores/location.store';
await useLocationStore().init();
</script>
<template>
  <div>
    <NuxtPage />
  </div>
</template>
