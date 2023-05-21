<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userLocation, UserLocation } from '@/services/location.services'

const countryCode = ref<UserLocation>(null)

onMounted(async () => {
  countryCode.value = userLocation
})
</script>

<template>
  <div>
    <div v-if="countryCode?.city">{{ countryCode?.country }}, {{ countryCode?.city }}</div>
    <div v-else-if="countryCode?.country">{{ countryCode.country }}</div>
    <flag class="flag" :iso="countryCode?.code" />
  </div>
</template>

<style lang="less" scoped></style>
