<script setup lang="ts">
import { ref } from 'vue'
import { type EventOnPoster } from '@common/types/event'
import { getEvent } from '@/services/events.services'
import { useRoute } from 'vue-router'

const posterEvent = ref<EventOnPoster | null>(null)
const route = useRoute()
const loadPosterEvent = async () => {
  posterEvent.value = await getEvent(route.params.id as string)
}

loadPosterEvent()
</script>

<template>
  <main>
    <h2 class="title">{{ posterEvent.title }}</h2>
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
