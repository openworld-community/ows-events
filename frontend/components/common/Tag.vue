<script setup lang="ts">
import { type PropType } from 'vue';
import { SeoItempropPriceEnum, SeoItemTypeEnum } from '../../constants/enums/seo';
import type { EventPrice } from '../../../common/types/event';
import { formatPrice } from '../../utils/prices';

defineProps({
	price: {
		type: [Object, null] as PropType<EventPrice | null>,
		required: true
	},
	className: {
		type: String as PropType<string>,
		default: ''
	}
});
</script>

<template>
	<div :class="`tag ${className}`">
		<p v-if="!price">
			{{ $t('event.price.unknown') }}
		</p>

		<p
			v-else-if="price.value === 0"
			:itemprop="SeoItempropPriceEnum.FREE"
			content="true"
		>
			{{ $t('event.price.free') }}
		</p>

		<p
			v-else
			:itemprop="SeoItempropPriceEnum.GROUP_ITEMPROP"
			itemscope
			:itemtype="SeoItemTypeEnum.OFFER"
		>
			<span
				:itemprop="SeoItempropPriceEnum.PRICE"
				:content="price.value"
			>
				{{ formatPrice(price) }}
			</span>
			<span
				class="visually-hidden"
				:itemprop="SeoItempropPriceEnum.CURRENCY"
			>
				{{ price.currency }}
			</span>
		</p>
	</div>
</template>

<style lang="less" scoped>
.tag {
	min-width: 50px;
	max-width: max-content;

	font-size: var(--font-size-S);
	line-height: 20px;
	text-align: center;

	background-color: var(--color-accent-green-semitransparent);
	border-radius: 8px;

	padding: 3px 10px;
}
</style>
