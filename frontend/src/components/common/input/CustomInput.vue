<script setup lang="ts">
import { computed } from 'vue'

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

const inputData = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <label :for="props.inputName" class="label">
    {{ props.inputLabel }}
  </label>
  <input
    v-if="props.inputType !== 'textarea'"
    :class="props.inputClass"
    :name="props.inputName"
    :type="props.inputType"
    :placeholder="props.inputPlaceholder"
    :required="props.isRequired"
    v-model="inputData"
  />
  <textarea
    v-else
    class="textarea"
    :class="props.inputClass"
    :name="props.inputName"
    :placeholder="props.inputPlaceholder"
    :required="props.isRequired"
    v-model="inputData"
  ></textarea>
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

.textarea {
  width: 100%;
  min-width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
