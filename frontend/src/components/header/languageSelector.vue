<script setup lang="ts">
import { watch } from 'vue'
import { useTranslation, supportedLocales } from '../../i18n'
import { ref } from 'vue'
const { i18next } = useTranslation()
const language = ref(i18next.language)
watch(language, (language) => i18next.changeLanguage(language))
</script>

<template>
  <select v-model="language">
    <option v-for="locale in supportedLocales" :key="`select-locale-${locale}`" :value="locale">
      {{ locale }}
    </option>
  </select>
  <input v-model="language" />
</template>
