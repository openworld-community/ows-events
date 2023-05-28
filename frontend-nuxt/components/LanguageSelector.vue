<script setup lang="ts">
import { watch } from 'vue';
import { supportedLocales } from '~/i18n';
import { ref } from 'vue';

const { $i18next } = useNuxtApp();
const language = ref($i18next.language);
watch(language, (language) => $i18next.changeLanguage(language));
</script>

<template>
  <label>
    {{ $translate('about.title') }}
    <select v-model="language">
      <option
        v-for="locale in supportedLocales"
        :key="`select-locale-${locale}`"
        :value="locale"
        :selected="locale === language"
      >
        {{ locale }}
      </option>
    </select>
  </label>
</template>
