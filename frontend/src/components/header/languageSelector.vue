<script setup lang="ts">
import { watch } from 'vue'
import { supportedLocales } from '../../i18n'
import { ref } from 'vue'
import i18next from 'i18next'
import { onMounted } from 'vue'

const language = ref(i18next.language)
watch(language, (language) => i18next.changeLanguage(language))
// Никак иначе не придумал как засинкать language с i18next.language
// На момент маунта у i18next.language все еще не обновилось значение из-за чего он равен просто дефолтной локали, а не локали юзера, если у нас настроена такая
console.log('this runs first')
onMounted(() => setTimeout(() => (language.value = i18next.language)))
</script>

<template>
  <select v-model="language">
    <option v-for="locale in supportedLocales" :key="`select-locale-${locale}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>
