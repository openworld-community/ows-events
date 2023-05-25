<script setup lang="ts">
import { computed, ref } from 'vue'
import { type EventOnPoster } from '@common/types/event'
import { deleteEvent, getEvent } from '@/services/events.services'
import { useRoute, useRouter } from 'vue-router'
import CustomButton from '@/components/common/button/CustomButton.vue'
import RegistrationModal from '@/components/modal/RegistrationModal.vue'
import { VueFinalModal } from 'vue-final-modal'
import { BASE_URL } from '@/constants/url'
import { useTranslation } from '@/i18n'
import { getUserEvents } from '@/helpers/events'

const { t } = useTranslation()

const posterEvent = ref<EventOnPoster | null>(null)
const route = useRoute()
const id = route.params.id as string
const router = useRouter()

const isModalOpen = ref(false)

if (!(typeof id === 'string')) {
  router.push({ path: '/' })
}

const loadPosterEvent = async () => {
  posterEvent.value = await getEvent(id)
}

loadPosterEvent()

const deleteCard = async () => {
  await deleteEvent(id)
  router.push({ path: '/' })
}

const picture = computed(() => {
  if (posterEvent.value?.image) {
    if (posterEvent.value.image.startsWith('http')) {
      return posterEvent.value.image
    }

    return `${BASE_URL}${posterEvent.value.image}`
  }
  return 'https://picsum.photos/400/300'
})

const convertToLocaleString = (
  date: number,
  timezone: { timezoneName: string; timezoneOffset: string } | undefined
) => {
  const localDate = new Date(date)
  return localDate.toLocaleString('ru-RU', {
    timeZone: timezone?.timezoneName,
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const isManaged = getUserEvents().includes(id)

const registrationClick = () => {
  isModalOpen.value = true
}
</script>

<template>
  <div v-bind:key="posterEvent.id" v-if="posterEvent" class="event">
    <div class="=event-image event-image__container">
      <span class="event-image__price">{{ posterEvent.price }} €</span>
      <img :alt="t('event.image.event')" class="event-image__image" v-bind:src="picture" />
    </div>

    <div class="event event-description">
      <p class="event-description__author">Peredelano</p>
      <h2 class="event-description__title">
        {{ posterEvent.title }}
      </h2>

      <p class="event-description__datetime">
        {{ convertToLocaleString(posterEvent.date, posterEvent.timezone) }}
        -
        {{
          convertToLocaleString(
            posterEvent.date + posterEvent.durationInSeconds,
            posterEvent.timezone
          )
        }}
        <br />
        ({{ posterEvent.timezone?.timezoneOffset }} {{ posterEvent.timezone?.timezoneName }})
      </p>

      <p class="event-description__geolink">
        <!-- <a href="https://goo.gl/maps/rdfTtRw7RmQ2sJ5V8?coh=178571&entry=tt"
          >Место встречи (изменить нельзя)</a
        > -->
        {{ posterEvent.location.country }}, {{ posterEvent.location.city }}
      </p>
      <p class="event-description__description">
        {{ posterEvent.description }}
      </p>
    </div>

    <div class="event-actions">
      <template v-if="posterEvent.url">
        <!--      v-if="posterEvent.url"-->
        <CustomButton
          button-class="button__success"
          :button-text="t('event.button.contact')"
          @click="registrationClick()"
        />

        <!--        v-if это ивент переделано-->
        <CustomButton
          button-class="button__success"
          :button-text="t('event.button.register')"
          @click="registrationClick()"
        />
      </template>

      <template v-if="isManaged">
        <!--      v-if="isManaged"-->
        <CustomButton
          button-class="button__success"
          :button-text="t('event.button.edit')"
          @click="isModalOpen = true"
        />

        <CustomButton
          button-class="button__warning"
          @click="deleteCard"
          :button-text="t('event.button.delete')"
        />
      </template>
    </div>

    <vue-final-modal
      :hideOverlay="false"
      overlayTransition="vfm-fade"
      overlayTransitionDuration="2600"
      contentTransition="vfm-fade"
      swipeToClose="down"
      :clickToClose="true"
      :escToClose="true"
      :lockScroll="true"
      v-model="isModalOpen"
    >
      <RegistrationModal
        v-if="isModalOpen"
        :data-for-edit="posterEvent"
        :event-id="id"
        @close="isModalOpen = false"
      />
    </vue-final-modal>
  </div>
</template>

<style lang="less" scoped>
.event {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: var(--padding-side);
  padding-right: var(--padding-side);
  padding-bottom: 30px;
  margin-bottom: auto;

  &-description {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 36px;

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
      margin-bottom: var(--space-subsections);
    }

    &__description {
      word-wrap: break-word;
      font-size: var(--font-size-S);
      line-height: 20px;
    }
  }

  &-actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-unrelated-items);
    margin-top: auto;
  }
}

.event-image {
  &__container {
    display: flex;
    min-height: 232px;
    height: 232px;
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
    max-height: 232px;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  &__price {
    min-width: 50px;
    position: absolute;
    left: 12px;
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
}
</style>
