<script setup lang="ts">
import { IconDefaultParams } from '@/constants/defaultValues/icon';

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  iconWidth: {
    type: String,
    default: IconDefaultParams.WIDTH
  },
  iconHeight: {
    type: String,
    default: IconDefaultParams.HEIGHT
  }
});
</script>

<template>
  <button>
    <CommonIcon
      :name="props.iconName"
      :width="props.iconWidth"
      :height="props.iconHeight"
    />
  </button>
</template>

<style scoped lang="less"></style>
