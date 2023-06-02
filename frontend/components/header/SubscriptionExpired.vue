<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';

const subscriptionExpiredDate = ref<null | Date>(null);

const { $i18n } = useNuxtApp();
const formatedSubscriptionExpiredDate = computed(() => {
	return `${$i18n.t('header.subscription_expired', { count: dateDifference.value })}`;
});

const dateDifference = computed((): number => {
	return subscriptionExpiredDate.value
		? getDatesDayDifference(new Date(), subscriptionExpiredDate.value as Date)
		: 0;
});

onBeforeMount(() => {
	const localSubscriptionExpiredDate = localStorage.getItem('subscriptionExpiredDate');
	if (localSubscriptionExpiredDate) {
		return (subscriptionExpiredDate.value = new Date(localSubscriptionExpiredDate));
	}
	const expiredDate = new Date();
	expiredDate.setDate(expiredDate.getDate() + 30);
	localStorage.setItem('subscriptionExpiredDate', expiredDate.toDateString());
	return (subscriptionExpiredDate.value = expiredDate);
});
</script>

<template>
	<div class="subscription-expired">
		<p class="subscription-expired__label">
			<span class="subscription-expired__days">{{ dateDifference }}</span>
			{{ formatedSubscriptionExpiredDate }}
		</p>
	</div>
</template>

<style scoped lang="less">
.subscription-expired {
	&__label {
		width: 100px;
		max-width: max-content;
		text-align: right;
		font-size: var(--font-size-XS);
		line-height: 14px;
	}

	&__days {
		color: var(--color-accent-red);
	}
}
</style>
