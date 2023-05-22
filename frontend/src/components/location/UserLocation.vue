<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store'
import { storeToRefs } from 'pinia'

const { userLocation } = storeToRefs(useLocationStore())
</script>

<template>
  <div class="user-location-container">
    <div v-if="userLocation?.city">{{ userLocation?.country }}, {{ userLocation?.city }}</div>
    <div v-else-if="userLocation?.country">{{ userLocation.country }}</div>
    <div v-else>Мы не смогли найти вас(</div>
    <flag class="flag" :iso="userLocation?.code" />
  </div>
</template>

<style lang="less" scoped>
.user-location-container {
  opacity: 0.5;
}
</style>
