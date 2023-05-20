<script setup lang="ts">
import { type EventOnPoster } from '@common/types/event'
import { computed, ref, watch } from 'vue'
import { getEvents, getEventsByParams } from '@/services/events.services'
import { useLocationStore } from '@/stores/location.store'
import { storeToRefs } from 'pinia'

const posterEvents = ref<EventOnPoster[]>([])
const search = ref<string>('')
const country = ref<string>('')
const city = ref<string>('')

let lasyLoadTimeout

const locationStore = useLocationStore()
locationStore.loadCountries()
const { countries, cities } = storeToRefs(locationStore)

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
  },
  { deep: true }
)

watch(
  country,
  async (_country) => {
    locationStore.pickCountry(_country)
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
</script>

<template>
  <main>
    <input type="text" placeholder="Search" class="input is-info search-input" v-model="search" />
    <input
      placeholder="Country"
      class="input is-info search-input"
      v-model="country"
      type="search"
      list="countries"
    />
    <datalist id="countries">
      <option v-for="country in countries" :value="country" v-bind:key="country" />
    </datalist>

    <input
      placeholder="City"
      class="input is-info search-input"
      v-model="city"
      type="search"
      list="cities"
    />
    <datalist id="cities">
      <option v-for="country in cities" :value="country" v-bind:key="country" />
    </datalist>

    <ul>
      <li v-for="event in filteredValues" v-bind:key="event.id" class="card">
        <div class="card-image">
          <img v-bind:src="event.image" v-if="event.image" />
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
      </li>
    </ul>
  </main>
</template>

<style lang="less" scoped>
main {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .search-input {
    max-width: 300px;
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
