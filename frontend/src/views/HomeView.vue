<script setup lang="ts">
import { EventOnPoster } from '@common/types/event'
import { ref } from 'vue'

const posterEvents = ref<EventOnPoster>([])

const loadPosterEvents = () => {
  fetch('http://localhost:7080/api/events')
    .then((res) => res.json())
    .then((data) => {
      posterEvents.value = data
    })
}

loadPosterEvents()
</script>

<template>
  <main>
    <ul>
      <li v-for="event in posterEvents" v-bind:key="event.id">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <p>
          {{ new Date(event.date).toLocaleString() }} ->>
          {{ new Date(event.date + event.durationInSeconds).toLocaleString() }}
        </p>
        <p>{{ event.location }}</p>
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
