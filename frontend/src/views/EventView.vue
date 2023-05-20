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

const share = async () => {
  console.log(window.location.href)
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
  <main v-if="posterEvent">
    <h2 class="title">
      {{ posterEvent.title }}

      <button class="button" @click="share()">Share it!</button>

      <button class="delete is-small" @click="deleteCard()"></button>
    </h2>
    <pre>{{ posterEvent }}</pre>
    <button class="delete is-small" @click="deleteCard()"></button>
  </main>
</template>

<style lang="less" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
