<script setup lang="ts">
import { type PropType } from 'vue';
const { $i18n } = useNuxtApp();

const free = computed(() => $i18n.t('event.price.free'));
const unknown = computed(() => $i18n.t('event.price.not_found'));

const props = defineProps({
	price: {
		type: String as PropType<string>,
		default: ''
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


const priceData = computed(() => {
	if (props.price) {
		//TODO: временное решение для MVP, далее обсудить с командой парсинга финальный формат
		if (props.price.includes('RSD') || props.price.includes('EUR') || props.price.includes('€'))
			return props.price;
		else if (props.price === '0') {
			return $i18n.t('event.price.free');
		}
		return `${props.price} RSD`;
	}
	//not found - только если при парсинге не была определена цена
	return $i18n.t('event.price.not_found');
});

</script>

<template>
	<span
			:class="`card__price ${className}`"
			itemprop="offers"
			itemscope
			itemtype="https://schema.org/Offer"
	>
		{{ priceData }}
<!--		<span-->
<!--				v-if="price === '0'"-->
<!--				itemprop="isAccessibleForFree"-->
<!--				content="true"-->
<!--		>-->
<!--			{{ free }}-->
<!--		</span>-->
<!--		<span-->
<!--				v-else-if="price"-->
<!--				itemprop="price"-->
<!--		>-->
<!--			<span-->
<!--					class="event-price"-->
<!--					itemprop="price"-->
<!--					:content="price"-->
<!--			>-->
<!--				{{ price }}-->
<!--				<span itemprop="priceCurrency">-->
<!--					{{ currency }}-->
<!--				</span>-->
<!--			</span>-->
<!--			<meta-->
<!--					itemprop="priceCurrency"-->
<!--					:content="currency"-->
<!--			>-->
<!--		</span>-->
<!--		<span-->
<!--				v-else-->
<!--		>-->
<!--			{{ unknown }}-->
<!--		</span>-->
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
