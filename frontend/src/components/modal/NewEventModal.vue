<script setup lang="ts">
import CustomInput from '@/components/common/input/CustomInput.vue'
import { computed, ref } from 'vue'
import CustomButton from '@/components/common/button/CustomButton.vue'
import { dateTime } from '@/helpers/dates'
import { postEvent, postEventImage } from '@/services/events.services'
import ImageLoader from '@/components/common/button/ImageLoader.vue'

const emit = defineEmits(['closeModal'])

const isLoading = ref(false)

const image = ref<null | File>(null)

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
  // TODO: Здесь будет точно число, но пусть тайпскрипт пока думает, что это строка
  price: 0 as unknown as string // Тут хрень с типами, но мне сейчас неохота разбираться с этим вопросом :)
})

const checkFormFilling = computed(() => {
  if (
    inputValues.value.title &&
    inputValues.value.startDate &&
    inputValues.value.startTime &&
    inputValues.value.country &&
    inputValues.value.city
  ) {
    return true
  } else {
    return false
  }
})

const submitEvent = async () => {
  //TODO: проверьте тип плиз
  isLoading.value = true
  try {
    const imageURL = await postEventImage(image.value as File)

    await postEvent({
      event: {
        title: inputValues.value.title,
        description: inputValues.value.description,
        date: dateTime(inputValues.value.startDate, inputValues.value.startTime).getTime(),
        durationInSeconds:
          dateTime(inputValues.value.endDate, inputValues.value.endTime).getTime() -
          dateTime(inputValues.value.startDate, inputValues.value.startTime).getTime(),
        location: {
          country: inputValues.value.country,
          city: inputValues.value.city
        },
        image: imageURL,
        price: inputValues.value.price
      }
    })

    emit('closeModal')
  } catch (e) {
    alert(e) // временно выводим ошибки через alert
  } finally {
    isLoading.value = false
  }
}

const eventInputs: {
  type: 'text' | 'date' | 'time' | 'number'
  label: string
  name: keyof typeof inputValues.value
  required: boolean
  min?: number
}[] = [
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
    required: true
  },
  {
    type: 'time',
    label: 'Starts:',
    name: 'startTime',
    required: true
  },
  {
    type: 'date',
    label: 'Ends:',
    name: 'endDate',
    required: true
  },
  {
    type: 'time',
    label: 'Ends:',
    name: 'endTime',
    required: true
  },
  {
    type: 'text',
    label: 'Country:',
    name: 'country',
    required: true
  },
  {
    type: 'text',
    label: 'City:',
    name: 'city',
    required: true
  },
  {
    type: 'number',
    label: 'Price, currency:',
    name: 'price',
    required: true,
    min: 0
  }
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
      <ImageLoader v-model="image" />
    </form>
    <div class="modal-card-foot">
      <CustomButton
        button-class="button"
        button-text="Cancel"
        :is-active="!isLoading"
        @click="emit('closeModal')"
      />
      <CustomButton
        button-class="button is-success"
        button-text="Submit"
        :is-active="checkFormFilling && !isLoading"
        @click="isLoading ? null : submitEvent()"
      />

      <span class="icon" v-if="isLoading">
        <i class="fas fa-spinner fa-pulse"></i>
      </span>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
