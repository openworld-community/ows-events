<script setup lang="ts">
import { ref } from 'vue'
import { type EventOnPoster } from '@common/types/event'
import { deleteEvent, getEvent } from '@/services/events.services'
import { useRoute, useRouter } from 'vue-router'
import { BASE_URL } from "@/constants/url";

const posterEvent = ref<EventOnPoster | null>(null)
const route = useRoute()
const id = route.params.id as string
const router = useRouter()

if (!(typeof id === 'string')) {
  router.push({ path: '/' })
}

const loadPosterEvent = async () => {
  posterEvent.value = await getEvent(id)
  console.log(posterEvent.value.date)
  console.log(posterEvent.value.durationInSeconds)
  console.log(posterEvent.value.date + posterEvent.value.durationInSeconds)
}

loadPosterEvent()

const deleteCard = async () => {
  await deleteEvent(id)
  router.push({path: '/'})
}

const share = async () => {
  if (
      !(
          window.location.href.includes('https') ||
          window.location.href.includes('localhost') ||
          window.location.href.includes('127.0.0.1')
      )
  ) {
    alert('Ой, что-то пошло не так, попробуйте скопировать ссылку вручную')
    return
  }
  await navigator.clipboard.writeText(window.location.href)
  alert('Ссылка скопирована!')
}
</script>

<template>
  <main v-if="posterEvent">
    <a href="/">Назад (иконка)</a>
    <!--    <button class="delete is-small" @click="deleteCard()"></button>-->
    <div v-bind:key="posterEvent.id" class="card">
      <div class="card-image">
        <div class="card-price">{{ posterEvent.price }} €</div>
        <img alt="Event image" class="image" v-bind:src="`${BASE_URL}${posterEvent.image}`" v-if="posterEvent.image"/>
      </div>

      <div class="card-content">
        <div class="card-author">Peredelano</div>
        <h2><span class="card-title">{{ posterEvent.title }}</span></h2>
        <div class="card-datetime">
          {{
            new Date(posterEvent.date).toLocaleString('ru-RU', {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })
          }} - {{
            new Date(posterEvent.date + posterEvent.durationInSeconds).toLocaleString('ru-RU', {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })
          }}
        </div>
        <div class="card-geolink">
          <a href="https://goo.gl/maps/rdfTtRw7RmQ2sJ5V8?coh=178571&entry=tt">Место встречи (изменить нельзя)</a>
        </div>
        <div class="card-description">
          {{ posterEvent.description }}
        </div>
      </div>
      <button class="card-contact-btn">
        Связаться
      </button>
    </div>
  </main>
</template>

<style lang="less" scoped>
.image {
  height: 100%;
  min-height: 232px;
  object-fit: cover;
  border-radius: 0;
}

.card {
  width: 100%;
  box-shadow: none;

  .card-content {
    padding: 12px 16px 12px 16px;
  }

  .card-image {
    background-color: #CACACA;
  }

  .card-author {
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0;
    text-align: left;
    color: #ACACAC;
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
    color: #4E4E4E;
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
    color: #ACACAC;
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
    color: #4E4E4E;
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    min-height: 202px;
  }

  .card-contact-btn{
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
