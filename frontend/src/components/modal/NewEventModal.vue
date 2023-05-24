<script setup lang="ts">
import CustomInput from '@/components/common/input/CustomInput.vue'
import { computed, onMounted, ref, watch } from 'vue'
import CustomButton from '@/components/common/button/CustomButton.vue'
import { dateTime, timestampParse } from '@/helpers/dates'
import {
  deleteEventImage,
  editEvent,
  getAllTimezones,
  getTimezoneByCountryAndCity,
  postEvent,
  postEventImage
} from '@/services/events.services'
import ImageLoader from '@/components/common/button/ImageLoader.vue'
import { storeToRefs } from 'pinia'
import { useLocationStore } from '@/stores/location.store'
import { type EventOnPoster } from '@common/types'
import { useRouter } from 'vue-router'
import { useTranslation } from '@/i18n'
import { addUserEvent } from '../../helpers/events'

const { t } = useTranslation()

const emit = defineEmits(['closeModal'])

type Props = {
  dataForEdit?: EventOnPoster
}

const props = defineProps<Props>()

const locationStore = useLocationStore()
locationStore.loadCountries()
const { countries, cities } = storeToRefs(locationStore)
const router = useRouter()

const isLoading = ref(false)
const newImageFile = ref<null | File>(null)
const isModalOpen = ref(false)

const allTimezones = ref<string[]>([])

const timezoneConverter = (timezone: { timezoneName: string; timezoneOffset: string }) => {
  return timezone.timezoneName + ' ' + timezone.timezoneOffset
}

const timezoneDeconverter = (timezone: string) => {
  const timezoneName = timezone.split(' ')[0]
  const timezoneOffset = timezone.split(' ')[1]
  return {
    timezoneName,
    timezoneOffset
  }
}

const loadAllTimezones = async () => {
  const _allTimezones = await getAllTimezones()
  if (!_allTimezones) return

  allTimezones.value = _allTimezones.map((timezone) => timezoneConverter(timezone))
}

loadAllTimezones()

type inputValuesType = {
  id: string
  title: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  country: string
  city: string
  image: string
  price: number
  timezone: string
}

const inputValues = ref<inputValuesType>({
  id: '',
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
  timezone: ''
})

onMounted(() => {
  if (props.dataForEdit) {
    setEventData(props.dataForEdit)
  }
})

const setEventData = (data: EventOnPoster) => {
  const start = timestampParse(data.date, data.timezone)
  const end = timestampParse(data.date + data.durationInSeconds, data.timezone)

  inputValues.value.id = data.id
  inputValues.value.title = data.title
  inputValues.value.description = data.description
  inputValues.value.country = data.location.country
  inputValues.value.city = data.location.city
  inputValues.value.price = data.price
  inputValues.value.startDate = start[0]
  inputValues.value.startTime = start[1]
  inputValues.value.endDate = end[0]
  inputValues.value.endTime = end[1]
  inputValues.value.image = data.image as string
}

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

watch(
  () => inputValues.value.country && inputValues.value.city,
  async () => {
    inputValues.value.timezone = ''

    await getTimezoneByCountryAndCity({
      country: inputValues.value.country,
      city: inputValues.value.city
    })
      .then((timezone) => {
        if (timezone.type === 'error') {
          inputValues.value.timezone = ''
          return
        }
        const _timezone = timezone.data
        inputValues.value.timezone = timezoneConverter(_timezone)
      })
      .catch(() => {
        inputValues.value.timezone = ''
      })
  },
  { deep: true }
)

const checkFormFilling = computed(() => {
  return !!(
    inputValues.value.title &&
    inputValues.value.startDate &&
    inputValues.value.startTime &&
    inputValues.value.country &&
    inputValues.value.city &&
    inputValues.value.timezone
  )
})

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    emit('closeModal')
  }, 300)
}

const paramsForSubmit = computed(() => {
  const tz = timezoneDeconverter(inputValues.value.timezone)
  return {
    title: inputValues.value.title,
    description: inputValues.value.description,
    date: dateTime(
      inputValues.value.startDate,
      inputValues.value.startTime,
      tz.timezoneOffset
    ).getTime(),
    durationInSeconds:
      dateTime(inputValues.value.endDate, inputValues.value.endTime, tz.timezoneOffset).getTime() -
      dateTime(
        inputValues.value.startDate,
        inputValues.value.startTime,
        tz.timezoneOffset
      ).getTime(),
    location: {
      country: inputValues.value.country,
      city: inputValues.value.city
    },
    price: inputValues.value.price,
    timezone: tz
  }
})

const submitEvent = async () => {
  //TODO: проверьте тип плиз
  isLoading.value = true
  try {
    let imageURL

    const params = paramsForSubmit.value

    if (props.dataForEdit) {
      if (newImageFile.value) {
        if (props.dataForEdit.image) {
          await deleteEventImage(props.dataForEdit.image)
        }
        imageURL = await postEventImage(newImageFile.value as File)
      }
      await editEvent({
        event: {
          ...params,
          id: inputValues.value.id,
          image: imageURL
        }
      })
    } else {
      imageURL = await postEventImage(newImageFile.value as File)
      const res = await postEvent({
        event: {
          ...params,
          image: imageURL
        }
      })

      if (res.type === 'success') {
        const id = res.data.id
        addUserEvent(id)
        router.push(`/event/${id}`)
      }
    }

    closeModal()
  } catch (e) {
    alert(e) // временно выводим ошибки через alert
  } finally {
    isLoading.value = false
  }
}

type InputEvent = {
  type: 'text' | 'date' | 'time' | 'number' | 'textarea'
  label?: string
  name: keyof typeof inputValues.value
  required: boolean
  min?: number
}

const eventInputs: (
  | InputEvent
  | {
      type: 'row'
      name: string
      label?: string
      child: InputEvent[]
    }
)[] = [
  {
    type: 'text',
    label: t('component.new_event_modal.fields.title'),
    name: 'title',
    required: true
  },
  {
    type: 'textarea',
    label: t('component.new_event_modal.fields.description'),
    name: 'description',
    required: true
  },
  {
    type: 'row',
    name: 'startDate',
    label: t('component.new_event_modal.fields.start'),
    child: [
      {
        type: 'date',
        name: 'startDate',
        required: true
      },
      {
        type: 'time',
        name: 'startTime',
        required: true
      }
    ]
  },
  {
    type: 'row',
    name: 'endDate',
    label: t('component.new_event_modal.fields.end'),
    child: [
      {
        type: 'date',
        name: 'endDate',
        required: true
      },
      {
        type: 'time',
        name: 'endTime',
        required: true
      }
    ]
  },
  {
    type: 'number',
    label: t('component.new_event_modal.fields.price'),
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
      <h2 class="event-modal__title title is-3">{{ t('component.new_event_modal.title') }}</h2>
    </header>
    <form class="modal-card-body">
      <div class="row">
        <CustomInput
          input-type="datalist"
          input-name="country"
          :input-placeholder="t('global.country')"
          :options-list="countries"
          v-model="inputValues.country"
        />
        <CustomInput
          input-type="datalist"
          input-name="city"
          :input-placeholder="t('global.city')"
          :options-list="cities"
          v-model="inputValues.city"
          v-bind:key="inputValues.country"
          :inputDisabled="!inputValues.country"
        />
        <CustomInput
          input-type="datalist"
          input-name="timezone"
          :input-placeholder="t('global.timezone')"
          :options-list="allTimezones"
          v-model="inputValues.timezone"
          v-bind:key="inputValues.city"
          :inputDisabled="!inputValues.city"
        />
      </div>

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
          <h3 class="subtitle is-small">{{ input.label }}</h3>
          <div class="row">
            <CustomInput
              v-for="c in input.child"
              :key="c.name"
              :input-type="c.type"
              :input-placeholder="c.label"
              :input-name="c.name"
              v-model="inputValues[c.name]"
              :is-required="c.required"
            />
          </div>
        </div>
      </div>

      <ImageLoader v-model="newImageFile" :external-image="inputValues.image" />
    </form>
    <div class="modal-card-foot card-custom-footer">
      <CustomButton
        button-class="button"
        :button-text="t('component.new_event_modal.cancel')"
        :is-active="!isLoading"
        @click="closeModal()"
      />
      <CustomButton
        button-class="button is-success"
        :button-text="t('component.new_event_modal.submit')"
        :is-active="checkFormFilling && !isLoading"
        :is-loading="isLoading"
        @click="isLoading ? null : submitEvent()"
      />
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

  border-radius: 30px 30px 0 0;

  height: 80vh;

  margin: 0;

  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);

  z-index: 1000;
  transition-property: top;
  transition-duration: 0.4s;

  .row {
    display: flex;
    gap: 16px;
    margin-bottom: 10px;
  }

  .card-custom-footer {
    justify-content: flex-end;
    border-radius: 0;
  }
}
</style>
