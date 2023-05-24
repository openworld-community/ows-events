<script setup lang="ts">
import { getEventPayment } from '@/services/events.services'
import { EventOnPoster } from '@common/types'
import { PaymentInfo } from '@common/types/payment-info'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const eventId = route.params.eventId as string

const paymentInfo = ref<{ event: EventOnPoster; paymantsInfo: PaymentInfo[] } | null>(null)

const loadPaymantInfo = async () => {
  const response = await getEventPayment(eventId)
  console.log(response)
  if (response.type === 'success') {
    console.log(response.data)
    paymentInfo.value = response.data
  } else {
    console.error(response.errors)
  }
}

loadPaymantInfo()
</script>

<template>
  <main>
    <section v-if="eventId && paymentInfo">
      <h2 class="title">Информация об оплате: {{ paymentInfo.event.title }}</h2>
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
              <span v-if="row.price">{{ row.price }} $.</span>
              <span v-else>Бесплатно</span>
            </td>
          </tr>
        </tbody>
      </table>
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

    table {
      th,
      td {
        padding: 10px;
      }
    }
  }
}
</style>
