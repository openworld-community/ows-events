<script setup lang="ts">
import CustomInput from '@/components/common/input/CustomInput.vue'
import { computed, ref, watch } from 'vue'
import CustomButton from '@/components/common/button/CustomButton.vue'
import { dateTime } from '@/helpers/dates'
import { postEvent, postEventImage } from '@/services/events.services'
import ImageLoader from '@/components/common/button/ImageLoader.vue'
import DatalistInput from '@/components/common/input/DatalistInput.vue'
import { storeToRefs } from 'pinia'
import { useLocationStore } from '@/stores/location.store'

const emit = defineEmits(['closeModal'])

const locationStore = useLocationStore()
locationStore.loadCountries()
const { countries, cities } = storeToRefs(locationStore)

const isLoading = ref(false)
const image = ref<null | File>(null)
const isModalOpen = ref(false)

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

watch(
  () => inputValues.value.country,
  async (_country) => {
    await locationStore.pickCountry(_country)
  },
  { deep: true }
)

watch(
  () => inputValues.value.city,
  async (_city) => {
    await locationStore.pickCity(_city)
  },
  { deep: true }
)

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

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    emit('closeModal')
  }, 300)
}

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

    closeModal()
  } catch (e) {
    alert(e) // временно выводим ошибки через alert
  } finally {
    isLoading.value = false
  }
}

type InputEvent = {
  type: 'text' | 'date' | 'time' | 'number' | 'textarea'
  label: string
  name: keyof typeof inputValues.value
  required: boolean
  min?: number
}

const eventInputs: (
  | InputEvent
  | {
      type: 'row'
      name: string
      child: InputEvent[]
    }
)[] = [
  {
    type: 'text',
    label: 'Title',
    name: 'title',
    required: true
  },
  {
    type: 'textarea',
    label: 'Description',
    name: 'description',
    required: true
  },
  {
    type: 'row',
    name: 'startDate',
    child: [
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
      }
    ]
  },
  {
    type: 'row',
    name: 'endDate',
    child: [
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
      }
    ]
  },
  {
    type: 'number',
    label: 'Price, currency',
    name: 'price',
    required: true,
    min: 0
  }
]
setTimeout(() => {
  isModalOpen.value = true
}, 100)
</script>

<template>
  <div
    class="modal-card new-event-container"
    :class="!isModalOpen ? 'new-event-container-hidden' : 'new-event-container-open'"
  >
    <header class="modal-card-head">
      <h2 class="event-modal__title title is-3">Describe your event</h2>
    </header>
    <form class="modal-card-body">
      <div v-for="input in eventInputs" :key="input.name">
        <CustomInput
          v-if="input.type !== 'row'"
          :input-type="input.type"
          :input-placeholder="input.label"
          :input-name="input.name"
          v-model="inputValues[input.name]"
          :is-required="input.required"
        />
        <div v-else>
          <h3 class="subtitle is-small">{{ input.name }}</h3>
          <div class="row">
            <div v-for="c in input.child" :key="c.name">
              <CustomInput
                :input-type="c.type"
                :input-placeholder="c.label"
                :input-name="c.name"
                v-model="inputValues[c.name]"
                :is-required="c.required"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <DatalistInput
          :options-list="countries"
          input-name="countries"
          input-class="input search-input is-small"
          input-placeholder="Country"
          v-model="inputValues.country"
        />
        <DatalistInput
          :options-list="cities"
          input-name="cities"
          input-class="input search-input is-small"
          input-placeholder="City"
          v-model="inputValues.city"
        />
      </div>

      <ImageLoader v-model="image" />
    </form>
    <div class="modal-card-foot card-custom-footer">
      <CustomButton
        button-class="button"
        button-text="Cancel"
        :is-active="!isLoading"
        @click="closeModal()"
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

<style scoped lang="less">
.new-event-container-hidden {
  top: 100vh;
}
.new-event-container-open {
  top: 20vh;
}
.new-event-container {
  width: 100%;
  max-width: 600px;

  height: 80vh;

  margin: 0;

  position: fixed;
  z-index: 1000;
  transition-property: top;
  transition-duration: 0.3s;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-custom-footer {
  justify-content: flex-end;
}
</style>
