<script setup lang="ts">
import { type PropType } from 'vue';
import { SeoItempropPriceEnum, SeoItemTypeEnum } from '../../constants/enums/seo';

const { t } = useI18n();

// На будущее, когда отдельно будет приходить валюта
// const free = computed(() => t('event.price.free'));
// const unknown = computed(() => t('event.price.not_found'));

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
	}
});

const priceData = computed(() => {
	if (props.price) {
		//TODO: временное решение для MVP, далее обсудить с командой парсинга финальный формат
		if (props.price.includes('RSD') || props.price.includes('EUR') || props.price.includes('€'))
			return props.price;
		else if (props.price === '0') {
			return t('event.price.free');
		}
		return `${props.price} RSD`;
	}
	//not found - только если при парсинге не была определена цена
	return t('event.price.not_found');
});
</script>

<template>
	<span
		:class="`tag ${className}`"
		:itemprop="SeoItempropPriceEnum.GROUP_ITEMPROP"
		itemscope
		:itemtype="SeoItemTypeEnum.OFFER"
	>
		{{ priceData }}
		<!--		<span-->
		<!--				v-if="price === '0'"-->
		<!--				:itemprop="SeoItempropPriceEnum.FREE"-->
		<!--				content="true"-->
		<!--		>-->
		<!--			{{ free }}-->
		<!--		</span>-->
		<!--		<span-->
		<!--				v-else-if="price"-->
		<!--				:itemprop="SeoItempropPriceEnum.PRICE"-->
		<!--		>-->
		<!--			<span-->
		<!--					class="event-price"-->
		<!--					:itemprop="SeoItempropPriceEnum.PRICE"-->
		<!--					:content="price"-->
		<!--			>-->
		<!--				{{ price }}-->
		<!--				<span :itemprop="SeoItempropPriceEnum.CURRENCY">-->
		<!--					{{ currency }}-->
		<!--				</span>-->
		<!--			</span>-->
		<!--			<meta-->
		<!--					:itemprop="SeoItempropPriceEnum.CURRENCY"-->
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
.tag {
	min-width: 50px;
	max-width: max-content;

	font-size: var(--font-size-S);
	line-height: 20px;
	text-align: center;

	border: 1px solid var(--color-accent-green-main);
	border-radius: 16px;

	padding: 3px 10px;
}
</style>
