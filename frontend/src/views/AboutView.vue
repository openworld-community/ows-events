<script setup lang="ts">
import { useTranslation } from '@/i18n'
import aboutUsImg from '../../public/img/about-us@2x.jpg'
import { REPO_URL } from '@/constants/url'

const { t } = useTranslation()
</script>

<template>
  <section class="about">
    <h2 class="title">{{ t('about.title') }}</h2>
    <img :src="aboutUsImg" class="about__img" :alt="t('about.alt')" />
    <p>{{ t('about.idea') }}</p>
    <br />
    <p>{{ t('about.functionality') }}</p>
    <br />
    <p>{{ t('about.monetization') }}</p>
    <br />
    <p>
      {{ t('about.github') }}:
      <a :href="REPO_URL" class="about__link" target="_blank" rel="noopener noreferrer">Repo</a>
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
