<script setup lang="ts">
import Icon from '@/components/common/icon/Icon.vue'

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  iconWidth: {
    type: String,
    default: '24'
  },
  iconHeight: {
    type: String,
    default: '24'
  }
})
</script>

<template>
  <button>
    <Icon :name="props.iconName" :width="props.iconWidth" :height="props.iconHeight" />
  </button>
</template>

<style scoped lang="less"></style>
