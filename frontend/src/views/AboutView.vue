<script setup lang="ts">
import { useTranslation } from '@/i18n'

const { t } = useTranslation()
</script>

<template>
  <section>
    <h2 class="title">{{ t('about.title') }}</h2>
    <p>{{ t('about.p1') }}</p>
    <br />
    <p>{{ t('about.p2') }}</p>
    <br />
    <p>{{ t('about.p3') }}</p>
    <br />
    <p>
      {{ t('about.github') }}:
      <a href="https://github.com/openworld-community/ows-events">Repo</a>
    </p>
  </section>
</template>

<style lang="less" scoped>
</style>
