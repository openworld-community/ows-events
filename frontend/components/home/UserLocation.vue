<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import { storeToRefs } from 'pinia';

const { userLocation } = storeToRefs(useLocationStore());
</script>

<template>
  <div class="user-location__container">
    <CommonIcon
      class="user-location__pin"
      name="map-pin"
      width="24"
      height="24"
    />
    <div
      v-if="userLocation?.city"
      class="user-location__text"
    >
      {{ userLocation?.country }}, {{ userLocation?.city }}
    </div>
    <div
      v-else-if="userLocation?.country"
      class="user-location__text"
    >
      {{ userLocation.country }}
    </div>
    <div
      v-else
      class="user-location__text"
    >
      {{ $translate('component.user_location.not_found') }}
    </div>
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
