<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  inputName: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  inputClass: {
    type: String,
    default: 'input is-normal'
  },
  inputLabel: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  inputPlaceholder: {
    type: String,
    default: ''
  },
  isRequired: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <label :for="props.inputName" class="label">
    {{ props.inputLabel }}
  </label>
  <input
    :class="props.inputClass"
    :name="props.inputName"
    :type="props.inputType"
    :placeholder="props.inputPlaceholder"
    :required="props.isRequired"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style lang="less" scoped>
label {
  padding-top: 5px;
  margin-bottom: 5px;
}
.input {
  width: 100%;
  min-width: 100%;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
