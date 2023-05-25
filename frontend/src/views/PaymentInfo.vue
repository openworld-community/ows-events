<script setup lang="ts">
import { getEventPayment } from '@/services/events.services'
import { type EventOnPoster } from '@common/types'
import { type PaymentInfo } from '@common/types/payment-info'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Markdown from 'vue3-markdown-it'
const route = useRoute()
const eventId = route.params.eventId as string

const paymentInfo = ref<{ event: EventOnPoster; paymantsInfo: PaymentInfo } | null>(null)

const loadPaymantInfo = async () => {
  const response = await getEventPayment(eventId)
  if (response.type === 'success') {
    paymentInfo.value = response.data
  } else {
    console.error(response.errors)
  }
}

loadPaymantInfo()
</script>

<template>
  <main>
    <section v-if="eventId && paymentInfo && paymentInfo.paymantsInfo">
      {{ paymentInfo.paymantsInfo.type }}
      <div v-if="(paymentInfo.paymantsInfo.type === 'table')">
        <h2 class="title">Информация об оплате: {{ paymentInfo.event.title }}</h2>
        <p>
          Стоимость билета зависит от валюты и будет повышаться по мере приближения ивента. Есть
          скидка для партнёров — жён, мужей, девушек, парней — приходите вместе! Скидки не
          суммируются (на партнера также не распространяются), действует самая большая.
        </p>
        <h3>Крипта</h3>
        <p>
          Для нас крипта – приоритетный способ оплаты, поэтому выбирая его, вы получаете скидку.
        </p>
        <p>
          НАПИШИТЕ @Alexears В ТЕЛЕГРАМ, ЧТО ВЫ ОПЛАТИЛИ КРИПТОЙ! И УКАЖИТЕ ПОЧТУ, С КОТОРОЙ
          РЕГИСТРИРОВАЛИСЬ!
        </p>
        <h3>Рубли</h3>
        <p>
          В комментарии к платежу укажите свой ник в telegram и почту, с которой регистрировались!
        </p>
        <table v-for="p of paymentInfo.paymantsInfo" :key="p.id">
          <thead>
            <tr>
              <th></th>
              <th>Номер/ссылка</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row of p.rows" :key="row.toString()">
              <td>{{ row.name }}</td>
              <td>
                <a v-if="row.link" :href="row.link">{{ row.link }}</a>
                <p v-else>{{ row.account }}</p>
              </td>
              <td>
                <span v-if="row.price">{{ row.price }}.</span>
                <span v-else>Бесплатно</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <Markdown :source="paymentInfo.paymantsInfo.source" />
      </div>
    </section>
    <div v-else>Эвент не найден:(</div>
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
    width: 100%;

    table {
      max-width: 100%;
      tr {
        display: flex;
        th,
        td {
          padding: 10px;
          flex: 1;
          max-width: 150px;
          width: 33vw;
          word-wrap: break-word;
        }
      }
    }
  }
}
</style>
