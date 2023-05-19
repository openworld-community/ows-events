<script setup lang="ts">
import { type EventOnPoster } from '@common/types/event'
import { ref } from 'vue'
import CustomButton from "@/components/common/button/CustomButton.vue";
import NewEventModal from "@/components/modal/NewEventModal.vue";
import CustomInput from "@/components/common/input/CustomInput.vue";
import {VueFinalModal} from "vue-final-modal";

const posterEvents = ref<EventOnPoster[]>([])
const search = ref<string>('')

const loadPosterEvents = () => {
  fetch('http://localhost:7080/api/events')
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

const isModalOpen = ref<Boolean>(false)

</script>

<template>
  <main>
    <div class="main main__header">
      <h1>Upcoming events</h1>
      <CustomButton
        button-class="button button--green"
        button-text="New event"
        @click="isModalOpen = true"
      />
    </div>
    <CustomInput
      input-type="text"
      input-name="search"
      input-placeholder="Search"
      v-model="search"
    />
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
  <vue-final-modal
    :hideOverlay="false"
    overlayTransition="vfm-fade"
    contentTransition="vfm-fade"
    :clickToClose="false"
    :escToClose="false"
    :lockScroll="false"
    v-model="isModalOpen"
    >
    <NewEventModal @close-modal="isModalOpen = false"/>
  </vue-final-modal>
</template>

<style lang="less" scoped>
  .main {
    &__header {
      display: flex;
      width: 76.3%;
      justify-content: space-between;
    }
  }
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
