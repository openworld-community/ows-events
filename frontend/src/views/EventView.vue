<script setup lang="ts">
import { computed, ref } from 'vue'
import { type EventOnPoster } from '@common/types/event'
import { deleteEvent, getEvent } from '@/services/events.services'
import { useRoute, useRouter } from 'vue-router'
import CustomButton from '@/components/common/button/CustomButton.vue'
import NewEventModal from '@/components/modal/NewEventModal.vue'
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
    return `${BASE_URL}/${posterEvent.value.image}`
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
</script>

<template>
  <div v-bind:key="posterEvent.id" v-if="posterEvent" class="card">
    <div class="card-image">
      <div class="card-price">{{ posterEvent.price }} €</div>
      <img :alt="t('event.image.event')" class="image" v-bind:src="picture" />
    </div>

    <div class="card-content">
      <div class="card-author">Peredelano</div>
      <h2>
        <span class="card-title">{{ posterEvent.title }}</span>
      </h2>
      <div class="card-datetime">
        {{ convertToLocaleString(posterEvent.date, posterEvent.timezone) }}
        -
        {{
          convertToLocaleString(
            posterEvent.date + posterEvent.durationInSeconds,
            posterEvent.timezone
          )
        }}

        {{ posterEvent.timezone?.timezoneOffset }} {{ posterEvent.timezone?.timezoneName }}
      </div>
      <div class="card-geolink">
        <a href="https://goo.gl/maps/rdfTtRw7RmQ2sJ5V8?coh=178571&entry=tt"
          >Место встречи (изменить нельзя)</a
        >
      </div>
      <div class="card-description">
        {{ posterEvent.description }}
      </div>
    </div>
    <button class="card-contact-btn">{{ t('event.button.contact') }}</button>

    <CustomButton button-class="button is-small" button-text="Change" @click="isModalOpen = true" />
    <!-- please style me 🥺🙏 -->
    <button
      v-if="isManaged"
      class="delete is-small"
      style="padding: 4px; background-color: lightgray; border: 1px solid black"
      @click="deleteCard"
    >
      {{ t('event.button.delete') }}
    </button>
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
      <NewEventModal v-if="isModalOpen" :data-for-edit="posterEvent" />
    </vue-final-modal>
  </div>
</template>

<style lang="less" scoped>
.image {
  height: 100%;
  min-height: 232px;
  object-fit: cover;
  border-radius: 0;
  width: 100%;
}

.card {
  width: 100%;
  box-shadow: none;

  .card-content {
    padding: 12px 16px 12px 16px;
  }

  .card-image {
    background-color: #cacaca;
    position: relative;
  }

  .card-author {
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0;
    text-align: left;
    color: #acacac;
  }

  .card-price {
    position: absolute;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0;
    text-align: center;
    color: #737373;
    left: 16px;
    top: 16px;
    border-radius: 16px;
    padding: 4px 10px 4px 10px;
    background-color: white;
    z-index: 200;
  }

  .card-title {
    color: #4e4e4e;
    font-family: Inter;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
  }

  .card-datetime {
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0;
    text-align: left;
    color: #acacac;
  }

  .card-geolink {
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0;
    text-align: left;
    text-decoration-line: underline;
  }

  .card-description {
    color: #4e4e4e;
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    min-height: 202px;
  }

  .card-contact-btn {
    color: white;
    background: #363636;
    height: 40px;
    width: 100%;
    border-radius: 6px;
    padding: 7px 16px 7px 16px;
  }
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
}
</style>
