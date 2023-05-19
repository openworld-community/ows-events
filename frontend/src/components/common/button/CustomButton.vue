<script setup lang="ts">
  const props = defineProps({
    buttonType: {
      type: String,
      default: 'button'
    },
    buttonClass: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  })
</script>

<template>
  <button
    :type="props.buttonType"
    :class="[props.buttonClass, props.isActive ? '' : 'is-light']"
    :disabled="!props.isActive"
  >
    {{ props.buttonText }}
  </button>
</template>

<style lang="less" scoped>

</style>