<script setup lang="ts">
import { API_URL } from '@/constants/url'
import { type EventOnPoster } from '@common/types/event'
import { ref } from 'vue'

const posterEvents = ref<EventOnPoster[]>([])
const search = ref<string>('')

const loadPosterEvents = () => {
  fetch(API_URL + '/events')
    .then((res) => res.json())
    .then((data) => {
      posterEvents.value = data
    })
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
    <input type="text" placeholder="Search" v-model="search" />
    <ul>
      <li v-for="event in getFilteredEvents(posterEvents, search)" v-bind:key="event.id">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <p>
          {{ new Date(event.date).toLocaleString() }} ->>
          {{ new Date(event.date + event.durationInSeconds).toLocaleString() }}
        </p>
        <p>{{ event.location.country }}</p>
        <p>{{ event.location.city }}</p>
        <p>{{ event.price }} €</p>
        <img v-bind:src="event.image" v-if="event.image" />
      </li>
    </ul>
  </main>
</template>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 50px;
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
</style>
