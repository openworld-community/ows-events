<script setup lang="ts">
import { type EventOnPoster } from '@common/types'
import { computed, ref, watch } from 'vue'
import { getEvents, getEventsByParams } from '@/services/events.services'
import { useLocationStore } from '@/stores/location.store'
import { storeToRefs } from 'pinia'
import NewEventModal from '@/components/modal/NewEventModal.vue'
import CustomInput from '@/components/common/input/CustomInput.vue'
import { VueFinalModal } from 'vue-final-modal'
import UserLocation from '@/components/home/UserLocation.vue'
import { useTranslation } from '@/i18n'
import { useRoute, useRouter } from 'vue-router'
import { BASE_URL } from '@/constants/url'
import EventPreviewCard from '@/components/home/EventPreviewCard.vue'
import AdCard from '@/components/home/AdCard.vue'
import ButtonIcon from '@/components/common/button/ButtonIcon.vue'

const { t } = useTranslation()
let lazyLoadTimeout: ReturnType<typeof setTimeout> | undefined

const locationStore = useLocationStore()
locationStore.loadCountries()
const { countries, cities, pickedCountry, pickedCity } = storeToRefs(locationStore)

const router = useRouter()
const route = useRoute()
const posterEvents = ref<EventOnPoster[]>([])

const searchFromRoute = route.query.search?.toString()
const search = ref<string>(searchFromRoute === 'None' ? '' : searchFromRoute || '')
const country = ref<string>(pickedCountry.value || '')
const city = ref<string>(pickedCity.value || '')
const isModalOpen = ref<boolean>(false)

locationStore.pickCountry(pickedCountry.value)

const loadPosterEvents = async () => {
  if (search.value || country.value || city.value) {
    posterEvents.value = await getEventsByParams({
      searchLine: search.value,
      country: country.value,
      city: city.value
    })
  } else {
    posterEvents.value = await getEvents()
  }
}

loadPosterEvents()

const planToLoadEvents = () => {
  lazyLoadTimeout && clearTimeout(lazyLoadTimeout)

  lazyLoadTimeout = setTimeout(async () => {
    loadPosterEvents()
  }, 500)
}

watch(
  pickedCountry,
  async (_country) => {
    city.value = pickedCity.value
  },
  { deep: true }
)

watch(
  search,
  async (_search) => {
    planToLoadEvents()
    await router.push({ query: { ...route.query, search: _search || 'None' } })
  },
  { deep: true }
)

watch(
  country,
  async (_country) => {
    locationStore.pickCountry(_country)

    city.value = pickedCity.value
    planToLoadEvents()
  },
  { deep: true }
)

watch(
  city,
  async (_city) => {
    locationStore.pickCity(_city)
    planToLoadEvents()
  },
  { deep: true }
)

const filteredValues = computed(() => {
  return getFilteredEvents(posterEvents.value, search.value, country.value, city.value)
})

const eventsWithAdd = computed((): (EventOnPoster & { type: 'event' })[] => {
  const events = [...filteredValues.value]
  return events.map((x) => {
    return {
      ...x,
      type: 'event',
      image: x.image
        ? x.image.includes('http')
          ? x.image
          : `${BASE_URL}${x.image}`
        : 'https://picsum.photos/400/300'
    }
  })
  // const newEvents: (
  //   | (EventOnPoster & { type: 'event' })
  //   | {
  //       id: 'add'
  //       type: 'add'
  //       title: string
  //       description: string
  //       link: string
  //     }
  // )[] = []
  // for (let i = 0; i < events.length; i++) {
  //   if (i % 2 === 0) {
  //     newEvents.push({
  //       id: 'add',
  //       type: 'add',
  //       title: 'Peredelano Startups',
  //       description: t('home.peredelano.description'),
  //       link: 'https://t.me/peredelanoconfjunior'
  //     })
  //   }
  //   newEvents.push({
  //     ...events[i],
  //     type: 'event',
  //     image: events[i].image ? `${BASE_URL}/${events[i].image}` : 'https://picsum.photos/200/300'
  //   })
  // }
  // return newEvents
})

const getFilteredEvents = (
  events: EventOnPoster[],
  search: string,
  country: string,
  city: string
) => {
  if (!search && !country && !city) {
    return events
  }

  const searchSource = (event: EventOnPoster) =>
    [event.title, event.description, event.location.city, event.location.country]
      .join(' ')
      .toLowerCase()

  let searchResult = events.filter((event) => {
    return searchSource(event).includes(search.toLowerCase())
  })

  if (country) {
    searchResult = searchResult.filter((event) => {
      return searchSource(event).includes(country.toLowerCase())
    })
  }

  if (city) {
    searchResult = searchResult.filter((event) => {
      return searchSource(event).includes(city.toLowerCase())
    })
  }

  return searchResult
}
const now = Date.now()
</script>

<template>
  <div class="location">
    <UserLocation />
  </div>

  <section class="search">
    <h1 class="search__title">{{ t('home.title') }}</h1>

    <CustomInput
      class="search__field"
      input-class="input is-info search-input"
      input-type="text"
      input-name="search"
      :input-placeholder="t('global.search')"
      v-model="search"
    />

    <div class="search__container">
      <CustomInput
        class="search__field"
        input-type="datalist"
        input-name="country"
        :input-placeholder="t('global.country')"
        :options-list="countries"
        v-model="country"
      />
      <CustomInput
        class="search__field"
        input-type="datalist"
        input-name="city"
        :input-placeholder="t('global.city')"
        :options-list="cities"
        v-model="city"
        v-bind:key="country"
        :inputDisabled="!country"
      />
    </div>
  </section>

  <ul class="card-list">
    <li v-for="event in eventsWithAdd" v-bind:key="event.id">
      <EventPreviewCard :class="event.date < now ? 'expired' : ''" :event-data="event" />
      <!--      <AdCard v-else :ad-data="event" class="ad-block" />-->
    </li>
  </ul>

  <ButtonIcon
    class="add-event-button"
    icon-name="button-plus"
    icon-width="56"
    icon-height="56"
    aria-haspopup="true"
    :aria-label="t('home.button.add_event_aria')"
    @click="isModalOpen = true"
  />

  <vue-final-modal
    :hideOverlay="false"
    overlayTransition="vfm-fade"
    overlayTransitionDuration="2600"
    contentTransition="vfm-fade"
    swipeToClose="down"
    :clickToClose="true"
    :escToClose="true"
    :lockScroll="true"
    v-model="isModalOpen"
  >
    <NewEventModal @close-modal="isModalOpen = false" />
  </vue-final-modal>
</template>

<style lang="less" scoped>
.location {
  display: flex;
  width: 100%;
  padding-top: 16px;
  padding-left: var(--padding-side);
  padding-right: var(--padding-side);
  margin-bottom: 36px;
}

.search {
  padding-left: var(--padding-side);
  padding-right: var(--padding-side);
  margin-bottom: 8px;

  &__title {
    font-size: var(--font-size-XXL);
    line-height: 40px;
    margin-bottom: 24px;
  }

  &__container {
    display: flex;
    gap: 15px;
  }

  &__field {
    margin-bottom: 16px;
  }
}

.card-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.add-event-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}

.modal-card {
  background-color: var(--background-color);
}

.expired {
  opacity: 0.5;
}
</style>
