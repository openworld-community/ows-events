<script setup lang="ts">
import type { Location } from '../../../common/types/address';
import type { PropType } from 'vue';
import type { EventPrice } from '../../../common/types/event';
import { formatPrice } from '../../utils/prices';
import {
	SeoItempropEventEnum,
	SeoItempropLocationEnum,
	SeoItemTypeEnum,
	SeoItempropPriceEnum
} from '../../constants/enums/seo';

const props = defineProps({
	location: {
		type: Object as PropType<Location | null>,
		default: null
	},
	startDate: {
		type: String,
		default: ''
	},
	endDate: {
		type: String,
		default: ''
	},
	isLink: {
		type: Boolean,
		default: false
	},
	withPin: {
		type: Boolean,
		default: false
	},
	price: {
		type: [Object, null] as PropType<EventPrice | null>,
		required: true,
		default: null
	}
});

const component = computed(() => {
	if (props.isLink) return defineNuxtLink({});
	else return 'p';
});
</script>

<template>
	<component
		:is="component"
		class="details"
		:to="isLink ? getLocationLink(location) : null"
		:target="isLink ? '_blank' : null"
		:itemprop="location ? SeoItempropEventEnum.LOCATION : null"
		:itemtype="location ? SeoItemTypeEnum.LOCATION : SeoItemTypeEnum.DATE"
		itemscope
	>
		<div class="details__wrapper">
			<!-- <CommonIcon
				v-if="withPin"
				:name="location ? 'map-pin' : 'calendar'"
				class="details__icon"
				color="var(--color-accent-green-main)"
			/> -->
			<!--	Дата	-->
			<span
				v-if="startDate"
				class="details__text"
				:itemprop="SeoItempropEventEnum.START_DATE"
			>
				<CommonIcon
					v-if="withPin"
					name="calendar"
					class="details__icon"
					color="var(--color-accent-green-main)"
				/>
				{{ startDate }}
			</span>
			<span
				v-if="endDate"
				class="details__text"
			>
				&nbsp;-&nbsp;
			</span>
			<span
				v-if="endDate"
				class="details__text"
				:itemprop="SeoItempropEventEnum.END_DATE"
			>
				{{ endDate }}
			</span>

			<!-- Цена -->
			<div class="details__price">
				<span v-if="!price">
					<CommonIcon
						v-if="withPin"
						name="dollar"
						class="details__icon"
						color="var(--color-accent-green-main)"
					/>
					{{ $t('event.price.unknown') }}
				</span>

				<span
					v-else-if="price.value === 0"
					:itemprop="SeoItempropPriceEnum.FREE"
					content="true"
				>
					<CommonIcon
						v-if="withPin"
						name="dollar"
						class="details__icon"
						color="var(--color-accent-green-main)"
					/>
					{{ $t('event.price.free') }}
				</span>

				<span
					v-else
					:itemprop="SeoItempropPriceEnum.GROUP_ITEMPROP"
					itemscope
					:itemtype="SeoItemTypeEnum.OFFER"
				>
					<CommonIcon
						v-if="withPin"
						name="dollar"
						class="details__icon"
						color="var(--color-accent-green-main)"
					/>
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
				</span>
			</div>
			<!--	Локация		-->
			<span
				v-if="location"
				:class="['details__text', { 'details__text--link': isLink }]"
				itemscope
				:itemtype="SeoItemTypeEnum.ADDRESS"
				:itemprop="SeoItempropLocationEnum.GROUP_ITEMPROP"
			>
				<span
					class="details__country"
					v-if="props.location.country"
					:itemprop="SeoItempropLocationEnum.COUNTRY"
				>
					<CommonIcon
						v-if="withPin"
						:name="location ? 'map-pin' : 'calendar'"
						class="details__icon"
						color="var(--color-accent-green-main)"
					/>

					{{ location.country }},
				</span>
				<span
					v-if="location.city"
					:itemprop="SeoItempropLocationEnum.CITY"
				>
					{{ location.city }}
				</span>
				<span
					v-if="location?.address"
					:itemprop="SeoItempropLocationEnum.ADDRESS"
					>, {{ location.address }}
				</span>
			</span>
		</div>
	</component>
</template>

<style scoped lang="less">
.details {
	display: flex;
	max-width: max-content;

	&__wrapper {
		display: flex;
		flex-direction: column;
	}

	&__icon {
		margin-right: 8px;
	}

	&__text {
		font-size: var(--font-size-S);
		display: flex;
		align-items: center;

		&--link {
			text-decoration: underline;
		}
	}
	&__country {
		display: flex;
		align-items: center;
		padding-right: 5px;
	}
	&__price {
		display: flex;
		align-items: center;
		font-size: 16px;
		line-height: 150%;
		margin: 12px 0;
		span {
			display: flex;
			align-items: center;
		}
	}
}
</style>
