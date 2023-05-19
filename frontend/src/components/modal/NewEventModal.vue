<script setup lang="ts">

import CustomInput from "@/components/common/input/CustomInput.vue";
import {ref} from "vue";
import CustomButton from "@/components/common/button/CustomButton.vue";
import {dateTime} from "@/helpers/dates";

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

const submitEvent = () => {

  // тут запрос на сервер полетит

  const eventData = {
    title: inputValues.value.title,
    description: inputValues.value.description,
    date: dateTime(inputValues.value.startDate, inputValues.value.startTime).getTime(),
    durationInSeconds: dateTime(inputValues.value.endDate, inputValues.value.endTime).getTime() - dateTime(inputValues.value.startDate, inputValues.value.startTime).getTime(),
    location: {
      country: inputValues.value.country,
      city: inputValues.value.city,
    },
    image: inputValues.value.image,
    price: inputValues.value.price,
  }

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
  <div class="event-modal">
    <h2 class="event-modal__title">Describe your event</h2>
    <form class="event-modal__form">
      <CustomInput
        v-for="input in eventInputs"
        :key="input.name"
        :input-type="input.type"
        :input-label="input.label"
        :input-name="input.name"
        v-model="inputValues[input.name]"
        :is-required="input.required"
      />
      <div class="event-modal__buttons">
        <CustomButton
          button-class="button button--grey"
          button-text="Cancel"
          @click="emit('closeModal')"
        />
        <CustomButton
          button-class="button button--green"
          button-text="Submit"
          @click="submitEvent"
        />
      </div>
    </form>
  </div>
</template>

<style scoped lang="less">
.event-modal {
  width: 600px;
  height: 80vh;
  overflow: scroll;
  padding: 20px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;

  &__title {
    margin: 10px 0;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>