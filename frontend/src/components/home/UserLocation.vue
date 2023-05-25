<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store'
import { storeToRefs } from 'pinia'
import Icon from '@/components/common/icon/Icon.vue'

const { userLocation } = storeToRefs(useLocationStore())
</script>

<template>
  <div class="user-location__container">
    <Icon class="user-location__pin" name="map-pin" width="24" height="24" />
    <p v-if="userLocation?.city" class="user-location__text">
      {{ userLocation?.country }}, {{ userLocation?.city }}
    </p>
    <p v-else-if="userLocation?.country" class="user-location__text">
      {{ userLocation.country }}
    </p>
    <p v-else class="user-location__text">Мы не смогли найти вас(</p>
  </div>
</template>

<style lang="less" scoped>
.user-location {
  &__container {
    display: flex;
  }

  &__pin {
    color: var(--color-accent-green-main);
    margin-left: 5px;
    margin-right: 13px;
  }

  &__text {
    font-size: var(--font-size-XS);
  }
}
</style>
