<script setup lang="ts">
import { type EventOnPoster } from '@common/types'
import { computed, ref, watch } from 'vue'
import { getEvents, getEventsByParams } from '@/services/events.services'
import { useLocationStore } from '@/stores/location.store'
import { storeToRefs } from 'pinia'
import NewEventModal from '@/components/modal/NewEventModal.vue'
import CustomInput from '@/components/common/input/CustomInput.vue'
import { VueFinalModal } from 'vue-final-modal'
import UserLocation from '@/components/location/UserLocation.vue'
import { useTranslation } from '@/i18n'
import { useRoute, useRouter } from 'vue-router'
import { BASE_URL } from '@/constants/url'

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
    country.value = _country
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

const eventsWithAdd = computed(() => {
  const events = [...filteredValues.value]
  const newEvents: (
    | (EventOnPoster & { type: 'event' })
    | {
        id: 'add'
        type: 'add'
        title: string
        description: string
        link: string
      }
  )[] = []
  for (let i = 0; i < events.length; i++) {
    if (i % 2 === 0) {
      newEvents.push({
        id: 'add',
        type: 'add',
        title: 'Peredelano Startups',
        description: t('home.peredelano.description'),
        link: 'https://t.me/peredelanoconfjunior'
      })
    }
    newEvents.push({
      ...events[i],
      type: 'event',
      image: events[i].image ? `${BASE_URL}${events[i].image}` : 'https://picsum.photos/200/300'
    })
  }
  return newEvents
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

const convertToLocaleString = (
  date: number,
  timezone: { timezoneName: string; timezoneOffset: string } | undefined
) => {
  const localDate = new Date(date)
  return localDate.toLocaleString('ru-RU', {
    timeZone: timezone?.timezoneName,
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <main>
    <div class="header">
      <button
        id="add-event-button"
        :aria-label="t('home.button.add-event-aria')"
        aria-haspopup="true"
        class="button is-rounded add-event-button"
        @click="isModalOpen = true"
      >
        <span class="icon">
          <i class="fas is-size-1 fa-thin fa-plus"></i>
        </span>
      </button>
      <div class="location-container">
        <div>
          <UserLocation class="user-location" />
        </div>
      </div>
      <div class="location-conteiner">
        <div>
          <CustomInput
            input-class="input is-info search-input"
            input-type="text"
            input-name="search"
            :input-placeholder="t('home.input.search-placeholder')"
            v-model="search"
          />
        </div>
      </div>

      <h1 class="title">{{ t('home.title') }}</h1>
      <div class="location-container">
        <CustomInput
          input-type="datalist"
          input-name="country"
          :input-placeholder="t('home.input.country-placeholder')"
          :options-list="countries"
          v-model="country"
          v-bind:key="country"
        />
        <CustomInput
          input-type="datalist"
          input-name="city"
          :input-placeholder="t('home.input.city-placeholder')"
          :options-list="cities"
          v-model="city"
          v-bind:key="city"
          v-bind:input-disable="!country"
        />
      </div>
    </div>

    <ul class="card-list">
      <li v-for="event in eventsWithAdd" v-bind:key="event.id" class="card">
        <div v-if="event.type !== 'add'" :class="event.date < now ? 'expired' : ''">
          <a :href="`/event/${event.id}`">
            <div class="card-image">
              <div class="card-price">{{ event.price }} €</div>
              <img
                :alt="t('home.events.image-alt')"
                class="image"
                v-bind:src="event.image"
                v-if="event.image"
              />
            </div>

            <div class="card-content">
              <div class="card-author">Peredelano</div>
              <h2>
                <span class="card-title">{{ event.title }}</span>
              </h2>
              <div class="card-datetime">
                {{ convertToLocaleString(event.date, event.timezone) }} ({{
                  event.timezone?.timezoneOffset
                }}

                {{ event.timezone?.timezoneName }})
              </div>
              <div class="card-geolink">
                <a href="https://goo.gl/maps/rdfTtRw7RmQ2sJ5V8?coh=178571&entry=tt"
                  >{{ event.location.country }}, {{ event.location.city }}</a
                >
              </div>
            </div>
          </a>
        </div>
        <div v-else class="add-block">
          <span class="add-label" role="button" tabindex="0" :aria-label="t('home.events.ad')">{{
            t('home.events.ad')
          }}</span>
          <div class="card-title">
            {{ event.title }}
          </div>
          <div class="card-content description">
            {{ event.description }}
          </div>
          <div class="card-action">
            <a :href="event.link"> {{ t('home.events.anchor-chat') }}! </a>
          </div>
        </div>
      </li>
    </ul>
  </main>
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
main {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  .add-block {
    border: 1px solid rgba(128, 128, 128, 0.663);
    border-radius: 5px;
    padding: 10px;
    .add-label {
      position: absolute;
      top: 10px;
      right: 10px;
      opacity: 0.5;
    }

    .description {
      font-size: 80%;
    }
  }

  .expired {
    opacity: 0.5;
  }

  .add-event-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 300;
    padding: 25px;
    width: 50px;
    height: 50px;
    box-shadow: rgb(38, 57, 77, 0.4) 0 0 20px;
    border: unset;
  }

  .header {
    padding: 5px;
  }

  .location-container {
    display: flex;
    gap: 16px;

    .user-location {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      gap: 10px;
    }

    div {
      flex: 1;
    }
  }

  .search-input {
    max-width: 300px;
  }

  .card-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .card {
    width: 100%;
    box-shadow: none;

    .card-content {
      padding: 12px 16px 12px 16px;
    }

    .card-image {
      background-color: #cacaca;
    }

    .card-author {
      font-family: Inter;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0;
      text-align: left;
      color: #acacac;
    }

    .card-price {
      position: absolute;
      font-family: Inter;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0;
      text-align: center;
      color: #737373;
      left: 16px;
      top: 16px;
      border-radius: 16px;
      padding: 4px 10px 4px 10px;
      background-color: white;
      z-index: 200;
    }

    .card-title {
      color: #4e4e4e;
      font-family: Inter;
      font-size: 18px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0;
      text-align: left;
    }

    .card-datetime {
      font-family: Inter;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0;
      text-align: left;
      color: #acacac;
    }

    .card-geolink {
      font-family: Inter;
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 0;
      text-align: left;
      text-decoration-line: underline;
    }
  }

  .image {
    width: 100%;
    min-height: 176px;
    max-height: 200px;
    object-fit: cover;
    border-radius: 0;
  }

  ul {
    list-style: none;
    padding: 5px;
    margin: 0;
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;

    li {
      h2 {
        margin: 0;
      }
    }
  }
}
</style>
