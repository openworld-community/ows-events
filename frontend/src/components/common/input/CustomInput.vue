<script setup lang="ts">
import { computed, ref } from 'vue'
import search from '@/assets/img/icon/search.svg'
import calendar from '@/assets/img/icon/calendar.svg'
import clock from '@/assets/img/icon/clock.svg'
import container from '@/assets/img/icon/container.svg'

const ICON_DICTIONARY: { [key: string]: string } = {
  search: search,
  date: calendar,
  endDate: calendar,
  startDate: calendar,
  time: clock,
  endTime: clock,
  startTime: clock,
  country: container,
  city: container
}

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
    default: 'input'
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
  },
  inputDisabled: {
    type: Boolean,
    default: false
  },
  optionsList: {
    type: [Array<string>, String],
    default: null
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

const input = ref<null | HTMLInputElement>(null)

const showPicker = () => {
  if (props.inputType === 'text') {
    input.value?.focus()
  } else {
    input.value?.showPicker()
  }
}
</script>

<template>
  <label class="custom-input">
    <span class="custom-input__label" v-if="props.inputLabel"> {{ props.inputLabel }} </span>
    <div class="custom-input__container">
      <!--      Input: text, number, date, time-->
      <input
        v-if="props.inputType !== 'textarea' && props.inputType !== 'datalist'"
        ref="input"
        class="custom-input__field"
        :name="props.inputName"
        :type="props.inputType"
        :placeholder="props.inputPlaceholder"
        :required="props.isRequired"
        v-model="inputData"
      />

      <!--      Input: textarea-->
      <textarea
        v-if="props.inputType === 'textarea'"
        class="custom-input__field custom-input__field--textarea"
        :name="props.inputName"
        :placeholder="props.inputPlaceholder"
        :required="props.isRequired"
        v-model="inputData"
        contenteditable="true"
      />

      <!--      Input: datalist-->
      <input
        v-if="props.inputType === 'datalist'"
        class="custom-input__field"
        :type="props.inputType"
        :placeholder="props.inputPlaceholder"
        :list="props.inputName"
        :disabled="props.inputDisabled"
        v-model="inputData"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <datalist :id="props.inputName">
        <option v-for="i in props.optionsList" :value="i" :key="i" />
      </datalist>

      <!--      Icons-->
      <a
        v-if="inputData"
        class="custom-input__button custom-input__button--clear"
        @click.prevent="inputData = ''"
      >
        <img src="@/assets/img/icon/delete.svg" width="24" height="24" alt="Очистить" />
      </a>

      <a
        v-if="ICON_DICTIONARY[props.inputName] && !inputData"
        class="custom-input__button custom-input__button--icon"
        @click.prevent="showPicker"
      >
        <img :src="ICON_DICTIONARY[props.inputName]" width="24" height="24" />
      </a>

      <!--    На будущее, для дизайна инпутов с кнопкой "Отмена"-->
      <!-- <a v-if="inputData" class="custom-input__button--cancel"> {{ t('global.button.cancel') }} </a> -->
    </div>
  </label>
</template>

<style lang="less" scoped></style>
