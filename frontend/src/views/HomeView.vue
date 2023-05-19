<script setup lang="ts">
import { API_URL } from '@/constants/url'
import { type EventOnPoster } from '@common/types/event'
import { ref } from 'vue'
import {getEvents} from "@/services/events.services";

const posterEvents = ref<EventOnPoster[]>([])
const search = ref<string>('')

const loadPosterEvents = async () => {
  posterEvents.value = await getEvents()
}

loadPosterEvents()

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
</script>

<template>
  <main>
    <input type="text" placeholder="Search" class="input is-info search-input" v-model="search" />
    <ul>
      <li
        v-for="event in getFilteredEvents(posterEvents, search)"
        v-bind:key="event.id"
        class="card"
      >
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
