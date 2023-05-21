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

import { useRoute, useRouter } from 'vue-router'
import DatalistInput from '@/components/common/input/DatalistInput.vue'
import { BASE_URL } from '@/constants/url'

let lasyLoadTimeout: NodeJS.Timeout | null = null

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
  if (search.value) {
    posterEvents.value = await getEventsByParams({ searchLine: search.value })
  } else {
    posterEvents.value = await getEvents()
  }
}

loadPosterEvents()

watch(
  search,
  async (_search) => {
    lasyLoadTimeout && clearTimeout(lasyLoadTimeout)

    lasyLoadTimeout = setTimeout(async () => {
      loadPosterEvents()
    }, 500)
    await router.push({ query: { ...route.query, search: _search || 'None' } })
  },
  { deep: true }
)

watch(
  country,
  async (_country) => {
    locationStore.pickCountry(_country)

    city.value = pickedCity.value
  },
  { deep: true }
)

watch(
  city,
  async (_city) => {
    locationStore.pickCity(_city)
  },
  { deep: true }
)

const filteredValues = computed(() => {
  return getFilteredEvents(posterEvents.value, search.value, country.value, city.value)
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

const share = async () => {
  if (
    !(
      window.location.href.includes('https') ||
      window.location.href.includes('localhost') ||
      window.location.href.includes('127.0.0.1')
    )
  ) {
    alert('Ой, что-то пошло не так, попробуйте скопировать ссылку вручную')
    return
  }
  await navigator.clipboard.writeText(window.location.href)
  alert('Ссылка скопирована!')
}
</script>

<template>
  <main>
    <button class="button is-rounded add-event-button" @click="isModalOpen = true">
      <span class="icon">
        <i class="fas is-size-1 fa-thin fa-plus fa-flip"></i>
      </span>
    </button>
    <div class="location-conteiner">
      <div>
        <UserLocation class="user-location" />
      </div>
      <div>
        <CustomInput
          input-class="input is-info search-input"
          input-type="text"
          input-name="search"
          input-placeholder="Search"
          v-model="search"
        />
      </div>
    </div>
    <div class="location-conteiner">
      <div>
        <DatalistInput
          :options-list="countries"
          input-name="countries"
          input-class="input is-info search-input"
          input-placeholder="Country"
          v-model="country"
        />
      </div>
      <div>
        <DatalistInput
          :options-list="cities"
          input-name="cities"
          input-class="input is-info search-input"
          input-placeholder="City"
          v-model="city"
        />
      </div>
    </div>

    <ul>
      <li v-for="event in filteredValues" v-bind:key="event.id" class="card">
        <a :href="`/event/${event.id}`">
          <div class="card-image">
            <img class="image" v-bind:src="`${BASE_URL}${event.image}`" v-if="event.image" />
          </div>

          <h2 class="card-header-title">{{ event.title }}</h2>
          <div class="card-content">
            <p>{{ event.description }}</p>
            <div>
              <p>From: {{ new Date(event.date).toLocaleString() }}</p>
              <p>
                To:
                {{ new Date(event.date + event.durationInSeconds).toLocaleString() }}
              </p>
            </div>
            <p>
              <span>{{ event.location.country }}</span
              >,
              <span>{{ event.location.city }}</span>
            </p>
            <p>{{ event.price }} €</p>
          </div>
        </a>
      </li>
    </ul>
  </main>
  <vue-final-modal
    :hideOverlay="false"
    overlayTransition="vfm-fade"
    contentTransition="vfm-fade"
    :clickToClose="false"
    :escToClose="false"
    :lockScroll="false"
    v-model="isModalOpen"
  >
    <NewEventModal @close-modal="isModalOpen = false" />
  </vue-final-modal>
</template>

<style lang="less" scoped>
main {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  .add-event-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 100;
    padding: 25px;
    width: 50px;
    height: 50px;
  }

  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 10px;
  }

  .location-conteiner {
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;

    .user-location {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: space-around;
      gap: 10px;
    }
    div {
      flex: 1;
    }
  }

  .search-input {
    max-width: 300px;
  }

  .image {
    max-width: 200px;
    max-height: 300px;
    height: 100%;
    object-fit: cover;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;

    li {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;

      h2 {
        margin: 0;
      }
    }
  }
}
</style>
