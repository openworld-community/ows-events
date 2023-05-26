<script setup lang="ts">
import { useTranslation } from '@/i18n'
import aboutUsImg from '../../public/img/about-us@2x.jpg'

const { t } = useTranslation()
</script>

<template>
  <section class="about">
    <h2 class="title">{{ t('about.title') }}</h2>
    <img :src="aboutUsImg" class="about__img" alt="About Peredelano Afisha"/>
    <p>{{ t('about.p1') }}</p>
    <br />
    <p>{{ t('about.p2') }}</p>
    <br />
    <p>{{ t('about.p3') }}</p>
    <br />
    <p>
      {{ t('about.github') }}:
      <a href="https://github.com/openworld-community/ows-events" class="about__link">Repo</a>
    </p>
  </section>
</template>

<style lang="less" scoped>
  .about {
    padding-left: var(--padding-side);
    padding-right: var(--padding-side);
    padding-top: var(--padding-vertical);
    padding-bottom: var(--padding-vertical);
  }

  .about p {
    font-size: var(--font-size-S);
    line-height: 20px;
  }

  .title {
    font-size: var(--font-size-XXL);
    line-height: var(--line-height-XXL);
    font-weight: var(--font-weight-bold);
  }

  .about__img {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    margin-top: var(--space-unrelated-items);
    margin-bottom: var(--space-related-items);
    border-radius: 4px;
  }

  .about__link {
    color: var(--color-link);
    text-decoration: underline;
    font-weight: var(--font-weight-bold);
  }
</style>
