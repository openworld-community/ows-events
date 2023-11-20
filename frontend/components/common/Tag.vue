<script setup lang="ts">
import { type PropType } from 'vue';
import { SeoItempropPriceEnum, SeoItemTypeEnum } from '../../constants/enums/seo';
import type { EventPrice } from '../../../common/types/event';
import { formatPrice } from '../../utils/prices';

type TagSize = 'standard' | 'small';

defineProps({
	price: {
		type: [Object, null] as PropType<EventPrice | null>,
		required: true
	},
	size: {
		type: String as PropType<TagSize>,
		default: 'standard'
	}
});
</script>

<template>
	<div :class="['tag', { 'tag--small': size === 'small' }]">
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

	background-color: var(--color-accent-green-main-40);
	border-radius: 8px;

	padding: 3px 10px;

	&--small {
		font-size: var(--font-size-XS);
		line-height: 16px;
	}
}
</style>
