<script setup lang="ts">
import {type EventOnPoster} from '@common/types'
import {computed, ref, watch} from 'vue'
import {getEvents, getEventsByParams} from '@/services/events.services'
import {useLocationStore} from '@/stores/location.store'
import {storeToRefs} from 'pinia'
import NewEventModal from '@/components/modal/NewEventModal.vue'
import CustomInput from '@/components/common/input/CustomInput.vue'
import {VueFinalModal} from 'vue-final-modal'
import UserLocation from '@/components/location/UserLocation.vue'

import {useRoute, useRouter} from 'vue-router'
import DatalistInput from '@/components/common/input/DatalistInput.vue'
import {BASE_URL} from '@/constants/url'

let lasyLoadTimeout: ReturnType<typeof setTimeout> | undefined

const locationStore = useLocationStore()
locationStore.loadCountries()
const {countries, cities, pickedCountry, pickedCity} = storeToRefs(locationStore)

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
    posterEvents.value = await getEventsByParams({searchLine: search.value})
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
      await router.push({query: {...route.query, search: _search || 'None'}})
    },
    {deep: true}
)

watch(
    country,
    async (_country) => {
      locationStore.pickCountry(_country)

      city.value = pickedCity.value
    },
    {deep: true}
)

watch(
    city,
    async (_city) => {
      locationStore.pickCity(_city)
    },
    {deep: true}
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
      <button class="button is-rounded add-event-button" @click="isModalOpen = true">
      <span class="icon">
        <i class="fas is-size-1 fa-thin fa-plus"></i>
      </span>
      </button>
      <div class="location-conteiner">
        <div>
          <UserLocation class="user-location"/>
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
    </div>

    <ul class="card-list">
      <li v-for="event in filteredValues" v-bind:key="event.id" class="card">
        <a :href="`/event/${event.id}`">
          <div class="card-image">
            <div class="card-price">{{ event.price }} €</div>
            <img alt="Event image" class="image" v-bind:src="`${BASE_URL}${event.image}`" v-if="event.image"/>
          </div>

          <div class="card-content">
            <div class="card-author">Peredelano</div>
            <h2><span class="card-title">{{ event.title }}</span></h2>
            <div class="card-datetime">
              {{
                new Date(event.date).toLocaleString('ru-RU', {
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })
              }}
            </div>
            <div class="card-geolink">
              <a href="https://goo.gl/maps/rdfTtRw7RmQ2sJ5V8?coh=178571&entry=tt">Место встречи (изменить нельзя)</a>
            </div>
          </div>
        </a>
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
    <NewEventModal @close-modal="isModalOpen = false"/>
  </vue-final-modal>
</template>

<style lang="less" scoped>
main {
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
    box-shadow: rgb(38, 57, 77, .4) 0 0 20px;
    border: unset;
  }

  .header {
    padding: 10px;
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
    width: 100vw;
  }

  .card {
    width: 100%;
    box-shadow: none;

    .card-content{
      padding: 12px 16px 12px 16px;
    }

    .card-image {
      background-color: #CACACA;
    }

    .card-author{
      font-family: Inter;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0;
      text-align: left;
      color: #ACACAC;
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

    .card-title{
      color: #4E4E4E;
      font-family: Inter;
      font-size: 18px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0;
      text-align: left;
    }

    .card-datetime{
      font-family: Inter;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0;
      text-align: left;
      color: #ACACAC;
    }

    .card-geolink{
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
    height: 100%;
    min-height: 176px;
    object-fit: cover;
    border-radius: 0;
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
      h2 {
        margin: 0;
      }
    }
  }
}
</style>
