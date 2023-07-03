<script setup lang="ts">
import { type PropType } from 'vue';
const { $i18n } = useNuxtApp();

const free = computed(() => $i18n.t('event.price.free'));

defineProps({
	price: {
		type: String as PropType<string>,
		default: '0'
	},
	currency: {
		type: String as PropType<string>,
		default: 'RSD'
	},
	className: {
		type: String as PropType<string>,
		default: ''
	},
});

</script>

<template>
	<span
			:class="`card__price ${className}`"
			itemprop="offers"
			itemscope
			itemtype="https://schema.org/Offer"
	>
		<span
				v-if="price"
				itemprop="price"
		>
			<span
					class="event-price"
					itemprop="price"
					:content="price"
			>
				{{ price }}
				<span itemprop="priceCurrency">
					{{ currency }}
				</span>
			</span>
			<meta
					itemprop="priceCurrency"
					:content="currency"
			>
		</span>
		<span
				v-else
				itemprop="isAccessibleForFree"
				content="true"
		>
			{{ free }}
		</span>
	</span>
</template>
<style lang="less" scoped>
.card__price {
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
</style>
