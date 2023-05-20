<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserLocation } from '@/services/location.services';

const countryCode = ref('');

onMounted(async () => {
  countryCode.value = await getUserLocation();
})
</script>

<template>
  <flag :iso="countryCode" />
</template>