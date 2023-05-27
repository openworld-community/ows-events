<script setup lang="ts">
const { data } = await useFetch<{ title: string }>('https://jsonplaceholder.typicode.com/posts/1')
</script>
<template>
  <span>{{ !data ? 'loading' : data.title }}</span>
  <div>
    <NuxtWelcome />
  </div>
</template>
