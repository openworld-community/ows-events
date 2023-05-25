<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import i18next from 'i18next'
import { getDatesDayDifference } from '@/helpers/dates'

const subscriptionExpiredDate = ref<null | Date>(null)

const formatedSubscriptionExpiredDate = computed(() => {
  return `${i18next.t('header.subscription_expired', {
    count: dateDifference.value
  })}`
})

const dateDifference = computed((): number => {
  return subscriptionExpiredDate.value
    ? getDatesDayDifference(new Date(), subscriptionExpiredDate.value)
    : 0
})

onBeforeMount(() => {
  const localSubscriptionExpiredDate = localStorage.getItem('subscriptionExpiredDate')
  if (localSubscriptionExpiredDate) {
    return (subscriptionExpiredDate.value = new Date(localSubscriptionExpiredDate))
  }
  const expiredDate = new Date()
  expiredDate.setDate(expiredDate.getDate() + 30)
  localStorage.setItem('subscriptionExpiredDate', expiredDate.toDateString())
  return (subscriptionExpiredDate.value = expiredDate)
})
</script>

<template>
  <div class="subscription-expired">
    <p class="subscription-expired__label">
      {{ formatedSubscriptionExpiredDate }}
    </p>
  </div>
</template>

<style scoped lang="less">
.subscription-expired {
  &__label {
    font-size: 14px;
    line-height: 18px;
    margin-top: 4px;
  }
}
</style>
