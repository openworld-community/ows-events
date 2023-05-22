<script setup lang="ts">
import { watch } from 'vue'
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  inputType: {
    type: String,
    default: 'search'
  },
  inputClass: {
    type: String,
    required: true
  },
  inputPlaceholder: {
    type: String,
    default: ''
  },
  inputName: {
    type: String,
    required: true
  },
  optionsList: {
    type: [Array, String],
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const modelValue = ref(props.modelValue)

watch(modelValue, () => {
  emit('update:modelValue', modelValue.value)
})
</script>

<template>
  <input
    :placeholder="props.inputPlaceholder"
    :class="props.inputClass"
    :type="props.inputType"
    :list="props.inputName"
    v-model="modelValue"
    @change="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
  <datalist :id="props.inputName">
    <option v-for="i in props.optionsList" :value="i" :key="i as string" />
  </datalist>
</template>

<style scoped lang="less">
.search-input {
  max-width: 300px;
}
</style>
