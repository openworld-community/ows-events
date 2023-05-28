<script setup lang="ts">
import { getToken } from '@/services/events.services'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const token = route.params.token as string
const router = useRouter()

if (!token) {
  router.push({ path: '/' })
}

const fillProfile = async () => {
  const newToken = await getToken(token)
  if (!newToken) {
    router.push({ path: '/' })
  }

  localStorage.setItem('token', newToken as string)
  // router.push({ path: '/' })

  console.log(newToken)
}
fillProfile()
</script>

<template></template>
