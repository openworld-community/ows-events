<script setup lang="ts">

import CustomInput from "@/components/common/input/CustomInput.vue";
import {computed, ref} from "vue";
import CustomButton from "@/components/common/button/CustomButton.vue";
import {dateTime} from "@/helpers/dates";
import {postEvent} from "@/services/events.services";

const emit = defineEmits(['closeModal'])

const inputValues = ref({
  title: '',
  description: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  country: '',
  city: '',
  image: '',
  price: 0,
})

// TODO: определить обязательные поля

const checkFormFilling = computed(() => {
  if (inputValues.value.title && inputValues.value.description && inputValues.value.startTime) {
    return true
  } else {
    return false
  }
})

const submitEvent = () => {
  postEvent({title: inputValues.value.title,
    description: inputValues.value.description,
    date: dateTime(inputValues.value.startDate, inputValues.value.startTime).getTime(),
    durationInSeconds: dateTime(inputValues.value.endDate, inputValues.value.endTime).getTime() - dateTime(inputValues.value.startDate, inputValues.value.startTime).getTime(),
    location: {
      country: inputValues.value.country,
      city: inputValues.value.city,
    },
    image: inputValues.value.image,
    price: inputValues.value.price,}
  )
  emit('closeModal')
}

const eventInputs = [
  {
    type: 'text',
    label: 'Title:',
    name: 'title',
    required: true
  },
  {
    type: 'text',
    label: 'Description:',
    name: 'description',
    required: true
  },
  {
    type: 'date',
    label: 'Starts:',
    name: 'startDate',
    required: true,
  },
  {
    type: 'time',
    label: 'Starts:',
    name: 'startTime',
    required: true,
  },
  {
    type: 'date',
    label: 'Ends:',
    name: 'endDate',
    required: true,
  },
  {
    type: 'time',
    label: 'Ends:',
    name: 'endTime',
    required: true,
  },
  {
    type: 'text',
    label: 'Country:',
    name: 'country',
    required: true,
  },
  {
    type: 'text',
    label: 'City:',
    name: 'city',
    required: true,
  },
  {
    type: 'file',
    label: 'Image:',
    name: 'image',
    required: false,
  },
  {
    type: 'text',
    label: 'Price, currency:',
    name: 'price',
    required: true,
  },
]

</script>

<template>
    <div class="modal-card">
      <header class="modal-card-head">
        <h2 class="event-modal__title title is-3">Describe your event</h2>
      </header>
    <form class="modal-card-body">
      <CustomInput
        v-for="input in eventInputs"
        :key="input.name"
        :input-type="input.type"
        :input-label="input.label"
        :input-name="input.name"
        v-model="inputValues[input.name]"
        :is-required="input.required"
      />
    </form>
      <div class="modal-card-foot">
        <CustomButton
          button-class="button"
          button-text="Cancel"
          @click="emit('closeModal')"
        />
        <CustomButton
          button-class="button is-success"
          button-text="Submit"
          :is-active="checkFormFilling"
          @click="submitEvent"
        />
      </div>
    </div>
</template>

<style scoped lang="less">

</style>