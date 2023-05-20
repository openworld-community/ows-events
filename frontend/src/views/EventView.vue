<script setup lang="ts">
import { ref } from 'vue'
import { type EventOnPoster } from '@common/types/event'
import { deleteEvent, getEvent } from '@/services/events.services'
import { useRoute, useRouter } from 'vue-router'

const posterEvent = ref<EventOnPoster | null>(null)
const route = useRoute()
const id = route.params.id as string
const router = useRouter()

if (!(typeof id === 'string')) {
  router.push({ path: '/' })
}

const loadPosterEvent = async () => {
  posterEvent.value = await getEvent(id)
}

loadPosterEvent()

const deleteCard = async () => {
  await deleteEvent(id)
  router.push({ path: '/' })
}
</script>

<template>
  <main v-if="posterEvent">
    <h2 class="title">
      {{ posterEvent?.title }}

      <button class="delete is-small" @click="deleteCard()"></button>
    </h2>
    <pre>{{ posterEvent }}</pre>
  </main>
</template>

<style lang="less" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
