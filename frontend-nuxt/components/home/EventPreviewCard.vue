<script setup lang="ts">
import { convertToLocaleString } from '@/helpers/dates';

const props = defineProps({
  eventData: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <NuxtLink
    :href="`/event/${props.eventData.id}`"
    class="card"
  >
    <div class="card__image-container">
      <span class="card__price">{{ props.eventData.price }} €</span>
      <img
        v-if="props.eventData.image"
        :alt="$translate('home.events.image_alt')"
        class="card__image"
        :src="props.eventData.image"
      />
    </div>

    <div class="card card-description">
      <p class="card-description__author">Peredelano</p>
      <h2 class="card-description__title">
        {{ props.eventData.title }}
      </h2>
      <p class="card-description__datetime">
        {{ convertToLocaleString(props.eventData.date, props.eventData.timezone) }} ({{
          props.eventData.timezone?.timezoneOffset
        }}
        {{ props.eventData.timezone?.timezoneName }})
      </p>
      <a class="card-description__geolink">
        {{ props.eventData.location.country }}, {{ props.eventData.location.city }}
      </a>
    </div>
  </NuxtLink>
</template>

<style scoped lang="less">
.card {
  width: 100%;
  box-shadow: none;
  position: relative;

  &__image-container {
    display: flex;
    height: 176px;
    position: relative;
    background-color: var(--color-background-secondary);
    margin-bottom: 12px;
    width: 100%;
    line-height: 0;
  }

  &__image {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    max-height: 176px;
    object-fit: cover;
  }

  &__price {
    min-width: 50px;
    position: absolute;
    left: 16px;
    top: 12px;

    font-size: var(--font-size-XS);
    line-height: 16px;
    text-align: center;

    border-radius: 16px;
    color: var(--color-white);
    background-color: var(--color-accent-green-main);

    padding: 6px 10px;
    z-index: 1;
  }

  .card-description {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 44px;

    &__author {
      font-size: var(--font-size-XS);
      font-weight: var(--font-weight-bold);
      line-height: 16px;
      text-align: left;
      color: var(--color-text-secondary);

      margin-bottom: 12px;
    }

    &__title {
      font-size: var(--font-size-L);
      font-weight: var(--font-weight-bold);
      line-height: 24px;
      margin-bottom: var(--space-related-items);
    }

    &__datetime {
      font-size: var(--font-size-XS);
      font-weight: var(--font-weight-bold);
      line-height: 16px;
      color: var(--color-text-secondary);
      margin-bottom: var(--space-related-items);
    }

    &__geolink {
      font-size: var(--font-size-XS);
      line-height: 16px;
      text-decoration-line: underline;
      color: #5c9ad2;
    }
  }
}
</style>
