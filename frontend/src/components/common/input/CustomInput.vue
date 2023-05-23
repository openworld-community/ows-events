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
  optionsList: {
    type: [Array, String],
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
        v-model="inputData"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <datalist :id="props.inputName">
        <option v-for="i in props.optionsList" :value="i" :key="i as string" />
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
      <!--      <a v-if="inputData" class="custom-input__button--cancel"> Отмена </a>-->
    </div>
  </label>
</template>

<style lang="less" scoped>
.custom-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 0;
  padding: 0;

  &__label {
    margin-left: 15px;
    margin-bottom: 10px;
  }

  &__container {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 12px;
  }

  &__field {
    appearance: none;
    width: 100%;
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    height: 40px;
    border: 1px solid #dbdbdb;
    border-radius: 24px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    color: #4e4e4e;
    font-size: 16px;
    padding-left: 12px;
    padding-right: 12px;

    &--textarea {
      min-height: 80px;
      padding-top: 8px;
      overflow: visible;
      resize: vertical;

      &::-webkit-resizer {
        display: none;
      }
    }

    &::placeholder {
      font-size: 16px;
    }

    &:active,
    &:focus {
      outline: none;
      border: 1px solid #48c78e;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      top: 10px;
      right: 14px;
      opacity: 0;
      z-index: 1;
    }
  }

  &__button {
    display: block;
    width: 26px;
    height: 26px;
    text-align: center;
    vertical-align: middle;
    margin: 0; //временно, чтобы перебить стили Bulma
    padding: 0;
    line-height: 0;
    position: absolute;
    top: 9px;
    right: 12px;
    background-color: #ffffff;

    //На будущее, для дизайна инпутов с кнопкой "Отмена":
    //&--cancel {
    //  color: #363636;
    //  opacity: 0.3;
    //  margin-left: 8px;
    //}

    &--icon {
      z-index: 0;
    }

    &--clear {
      z-index: 2;
    }
  }
}
</style>
