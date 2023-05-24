<script setup lang="ts">
import { type PropType } from 'vue'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

const props = defineProps({
  buttonType: {
    type: String as PropType<ButtonType>,
    default: 'button'
  },
  buttonClass: {
    type: [String, Array<string>],
    required: true
  },
  buttonText: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    :type="props.buttonType"
    :class="[props.buttonClass, { 'is-loading': isLoading }]"
    :disabled="!props.isActive"
  >
    {{ props.buttonText }}
  </button>
</template>

<style lang="less" scoped></style>
