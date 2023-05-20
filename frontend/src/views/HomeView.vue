<script setup lang="ts">
import { type EventOnPoster } from '@common/types/event'
import { ref, watch } from 'vue'
import { getEvents, getEventsByParams } from '@/services/events.services'
import CustomButton from '@/components/common/button/CustomButton.vue'
import NewEventModal from '@/components/modal/NewEventModal.vue'
import CustomInput from '@/components/common/input/CustomInput.vue'
import { VueFinalModal } from 'vue-final-modal'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const posterEvents = ref<EventOnPoster[]>([])
const search = ref<string>(route.query.search?.toString() || '')
const isModalOpen = ref<boolean>(false)

let lasyLoadTimeout

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

const getFilteredEvents = (events: EventOnPoster[], search: string) => {
  if (!search) {
    return events
  }

  return events.filter((event) => {
    return [event.title, event.description, event.location]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  })
}

const share = async () => {
  await navigator.clipboard.writeText(window.location.href)
  alert('Link copied to clipboard!')
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
    <ul>
      <li
        v-for="event in getFilteredEvents(posterEvents, search)"
        v-bind:key="event.id"
        class="card"
      >
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
