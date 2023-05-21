<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserLocation, type UserLocation } from '@/services/location.services'

const location = ref<UserLocation | null>(null)

onMounted(async () => {
  location.value = getUserLocation()
})
</script>

<template>
  <div>
    <div v-if="location?.city">{{ location?.country }}, {{ location?.city }}</div>
    <div v-else-if="location?.country">{{ location.country }}</div>
    <flag class="flag" :iso="location?.code" />
  </div>
</template>

<style lang="less" scoped></style>
