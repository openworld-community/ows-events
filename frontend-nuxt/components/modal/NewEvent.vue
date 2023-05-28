<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { dateTime, timestampParse } from '@/helpers/dates';
import {
  deleteEventImage,
  editEvent,
  getAllTimezones,
  getTimezoneByCountryAndCity,
  postEvent,
  postEventImage
} from '@/services/events.services';
import { storeToRefs } from 'pinia';
import { useLocationStore } from '@/stores/location.store';
import { type EventOnPoster } from '../../../common/types';
import { addUserEvent } from '../../helpers/events';

const emit = defineEmits(['closeModal']);
const { $translate } = useNuxtApp();

type Props = {
  dataForEdit?: EventOnPoster;
};

const props = defineProps<Props>();

const locationStore = useLocationStore();
locationStore.loadCountries();
const { countries, cities } = storeToRefs(locationStore);

const isLoading = ref(false);
const newImageFile = ref<null | File>(null);
const isModalOpen = ref(false);

const allTimezones = ref<string[]>([]);

const timezoneConverter = (timezone: { timezoneName: string; timezoneOffset: string }) => {
  return timezone.timezoneName + ' ' + timezone.timezoneOffset;
};

const timezoneDeconverter = (timezone: string) => {
  const timezoneName = timezone.split(' ')[0];
  const timezoneOffset = timezone.split(' ')[1];
  return {
    timezoneName,
    timezoneOffset
  };
};

const loadAllTimezones = async () => {
  const _allTimezones = await getAllTimezones();
  if (!_allTimezones) return;

  allTimezones.value = _allTimezones.map((timezone) => timezoneConverter(timezone));
};

loadAllTimezones();

type inputValuesType = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  country: string;
  city: string;
  image: string;
  price: number;
  timezone: string;
  url: string;
};

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
  timezone: '',
  url: ''
});

onMounted(() => {
  if (props.dataForEdit) {
    setEventData(props.dataForEdit);
  }
});

const setEventData = (data: EventOnPoster) => {
  const start = timestampParse(data.date, data.timezone);
  const end = timestampParse(data.date + data.durationInSeconds, data.timezone);

  inputValues.value.id = data.id;
  inputValues.value.title = data.title;
  inputValues.value.description = data.description;
  inputValues.value.country = data.location.country;
  inputValues.value.city = data.location.city;
  inputValues.value.price = data.price;
  inputValues.value.startDate = start[0];
  inputValues.value.startTime = start[1];
  inputValues.value.endDate = end[0];
  inputValues.value.endTime = end[1];
  inputValues.value.image = data.image as string;
  inputValues.value.url = data.url || '';
};

watch(
  () => inputValues.value.country,
  async (_country) => {
    await locationStore.pickCountry(_country);
  },
  { deep: true }
);

watch(
  () => inputValues.value.city,
  async (_city) => {
    await locationStore.pickCity(_city);
  },
  { deep: true }
);

watch(
  () => inputValues.value.country && inputValues.value.city,
  async () => {
    inputValues.value.timezone = '';

    await getTimezoneByCountryAndCity({
      country: inputValues.value.country,
      city: inputValues.value.city
    })
      .then((timezone) => {
        if (timezone.type === 'error') {
          inputValues.value.timezone = '';
          return;
        }
        const _timezone = timezone.data;
        inputValues.value.timezone = timezoneConverter(_timezone);
      })
      .catch(() => {
        inputValues.value.timezone = '';
      });
  },
  { deep: true }
);

const checkFormFilling = computed(() => {
  return !!(
    inputValues.value.title &&
    inputValues.value.startDate &&
    inputValues.value.startTime &&
    inputValues.value.country &&
    inputValues.value.city &&
    inputValues.value.timezone
  );
});

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    emit('closeModal');
  }, 300);
};

const paramsForSubmit = computed(() => {
  const tz = timezoneDeconverter(inputValues.value.timezone);
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
    timezone: tz,
    url: inputValues.value.url
  };
});

const submitEvent = async () => {
  //TODO: проверьте тип плиз
  isLoading.value = true;
  try {
    let imageURL;

    const params = paramsForSubmit.value;

    if (props.dataForEdit) {
      if (newImageFile.value) {
        if (props.dataForEdit.image) {
          await deleteEventImage(props.dataForEdit.image);
        }
        imageURL = await postEventImage(newImageFile.value as File);
      }
      await editEvent({
        event: {
          ...params,
          id: inputValues.value.id,
          image: imageURL
        }
      });
    } else {
      imageURL = await postEventImage(newImageFile.value as File);
      const res = await postEvent({
        event: {
          ...params,
          image: imageURL
        }
      });

      if (res.type === 'success') {
        const id = res.data.id;
        addUserEvent(id);
        navigateTo(`/event/${id}`);
      }
    }

    closeModal();
  } catch (e) {
    alert(e); // временно выводим ошибки через alert
  } finally {
    isLoading.value = false;
  }
};

type InputEvent = {
  type: 'text' | 'date' | 'time' | 'number' | 'textarea' | 'datalist';
  label?: string;
  name: keyof typeof inputValues.value;
  required: boolean;
  min?: number;
  options?: any; // TODO тип
};

const eventInputs: {
  type: 'row' | 'column';
  name: string;
  label?: string;
  child: InputEvent[];
}[] = [
  {
    type: 'column',
    name: 'location',
    label: $translate('component.new_event_modal.fields.location'),
    child: [
      {
        type: 'datalist',
        name: 'country',
        options: countries,
        label: $translate('component.new_event_modal.fields.country'),
        required: true
      },
      {
        type: 'datalist',
        name: 'city',
        options: cities,
        label: $translate('component.new_event_modal.fields.city'),
        required: true
      },
      {
        type: 'datalist',
        name: 'timezone',
        options: allTimezones,
        label: $translate('component.new_event_modal.fields.timezone'),
        required: true
      }
    ]
  },
  {
    type: 'column',
    name: 'description',
    label: $translate('component.new_event_modal.fields.main_info'),
    child: [
      {
        type: 'text',
        label: $translate('component.new_event_modal.fields.title'),
        name: 'title',
        required: true
      },
      {
        type: 'textarea',
        label: $translate('component.new_event_modal.fields.description'),
        name: 'description',
        required: true
      }
    ]
  },
  {
    type: 'row',
    name: 'startDate',
    label: $translate('component.new_event_modal.fields.start'),
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
    label: $translate('component.new_event_modal.fields.end'),
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
    type: 'row',
    name: 'price',
    label: $translate('component.new_event_modal.fields.price'),
    child: [
      {
        type: 'number',
        name: 'price',
        required: true,
        min: 0
      }
    ]
  },
  {
    type: 'row',
    name: 'price',
    label: $translate('component.new_event_modal.fields.url_to_rigistration'),
    child: [
      {
        type: 'text',
        name: 'url',
        required: true,
        min: 0
      }
    ]
  }
];

setTimeout(() => {
  isModalOpen.value = true;
}, 100);
</script>

<template>
  <div
    class="modal-card"
    :class="!isModalOpen ? 'new-event-container-hidden' : 'new-event-container-open'"
  >
    <header class="modal-card__head">
      <h2 class="modal-card__title">
        {{ $translate('component.new_event_modal.title') }}
      </h2>
    </header>

    <form class="modal-card__body body">
      <div
        v-for="input in eventInputs"
        :key="input.name"
        class="body__section section"
      >
        <h3 class="section__subtitle">
          {{ input.label }}
        </h3>
        <div :class="input.type === 'column' ? 'section__column' : 'section__row'">
          <CommonInput
            v-for="c in input.child"
            :key="c.name"
            v-model="inputValues[c.name]"
            class="section__input"
            :input-type="c.type"
            :options-list="c.options"
            :input-placeholder="c.label"
            :input-name="c.name"
            :is-required="c.required"
          />
        </div>
      </div>

      <CommonImageLoader
        v-model="newImageFile"
        :external-image="inputValues.image"
      />
    </form>
    <div class="modal-card__foot">
      <CommonButton
        class="modal-card__button"
        button-class="button__success"
        :button-text="$translate('component.new_event_modal.submit')"
        :is-active="checkFormFilling && !isLoading"
        :is-loading="isLoading"
        @click="isLoading ? null : submitEvent()"
      />
      <CommonButton
        class="modal-card__button"
        button-class="button__ordinary"
        :button-text="$translate('component.new_event_modal.cancel')"
        :is-active="!isLoading"
        @click="closeModal()"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.body {
  overflow-y: auto;
  background-color: var(--color-white);
  padding: 20px var(--padding-side);
}

.section {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  &__subtitle {
    font-weight: var(--font-size-L);
    margin-bottom: 12px;
  }

  &__column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__row {
    display: flex;
    width: 100%;
    gap: 16px;
  }

  &__input {
    margin-bottom: 16px;
  }
}

.new-event-container {
  .row {
    display: flex;
    gap: 16px;
    margin-bottom: 10px;
  }
}
</style>
