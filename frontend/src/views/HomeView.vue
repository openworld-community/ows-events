<script setup lang="ts">
import { type EventOnPoster } from '@common/types'
import { computed, ref, watch } from 'vue'
import { getEvents, getEventsByParams } from '@/services/events.services'
import { useLocationStore } from '@/stores/location.store'
import { storeToRefs } from 'pinia'
import CustomButton from '@/components/common/button/CustomButton.vue'
import NewEventModal from '@/components/modal/NewEventModal.vue'
import CustomInput from '@/components/common/input/CustomInput.vue'
import { VueFinalModal } from 'vue-final-modal'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const posterEvents = ref<EventOnPoster[]>([])
const search = ref<string>(route.query.search?.toString() || '')
const country = ref<string>('')
const city = ref<string>('')
const isModalOpen = ref<boolean>(false)

let lasyLoadTimeout: NodeJS.Timeout | null = null

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
    await router.push({ query: { ...route.query, search: _search || 'None' } })
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
    <div class="header">
      <h1 class="header">Upcoming events</h1>
      <CustomButton
        button-class="button is-success"
        button-text="Поделиться ссылкой на поиск"
        @click="share()"
      />
      <CustomButton
        button-class="button is-success"
        button-text="Добавить событие"
        @click="isModalOpen = true"
      />
    </div>
    <CustomInput
      input-class="input is-info search-input"
      input-type="text"
      input-name="search"
      input-placeholder="Search"
      v-model="search"
    />
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
        <a :href="`/event/${event.id}`">
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
  }

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