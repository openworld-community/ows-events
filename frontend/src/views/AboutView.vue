<script setup lang="ts">
import { useTranslation } from '@/i18n'
const { t } = useTranslation()
</script>

<template>
  <main>
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
  </main>
</template>

<style lang="less" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  section {
    max-width: 500px;
  }
}
</style>
