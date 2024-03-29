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
	isOnline: {
		type: Boolean,
		required: true
	},
	hasLinkToGMaps: {
		type: Boolean,
		default: false
	},
	startDate: {
		type: String,
		default: ''
	},
	endDate: {
		type: String,
		default: ''
	},
	price: {
		type: [Object, null] as PropType<EventPrice | null>,
		required: true,
		default: null
	}
});

const component = computed(() => {
	if (props.hasLinkToGMaps) return defineNuxtLink({});
	else return 'p';
});
</script>

<template>
	<ul class="details">
		<!--	Дата	-->
		<ClientOnly>
			<li
				v-if="startDate"
				class="details__item"
				:itemtype="SeoItemTypeEnum.DATE"
			>
				<CommonIcon
					name="calendar"
					class="details__icon"
					color="var(--color-accent-green-main)"
				/>
				<span
					class="details__text"
					:itemprop="SeoItempropEventEnum.START_DATE"
				>
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
			</li>
		</ClientOnly>

		<!-- Цена -->
		<li class="details__item">
			<CommonIcon
				name="dollar"
				class="details__icon"
				color="var(--color-accent-green-main)"
			/>
			<span
				v-if="!price"
				class="details__text"
			>
				{{ $t('event.price.unknown') }}
			</span>

			<span
				v-else-if="price.value === 0"
				class="details__text"
				:itemprop="SeoItempropPriceEnum.FREE"
				content="true"
			>
				{{ $t('event.price.free') }}
			</span>

			<span
				v-else
				:itemprop="SeoItempropPriceEnum.GROUP_ITEMPROP"
				itemscope
				:itemtype="SeoItemTypeEnum.OFFER"
			>
				<span
					:itemprop="SeoItempropPriceEnum.PRICE"
					class="details__text"
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
		</li>

		<!--	Локация		-->
		<li
			v-if="location || isOnline"
			class="details__item"
			itemscope
			:itemtype="SeoItemTypeEnum.LOCATION"
			:itemprop="SeoItempropLocationEnum.GROUP_ITEMPROP"
		>
			<p v-if="isOnline">
				<CommonIcon
					name="globe"
					class="details__icon"
					color="var(--color-accent-green-main)"
				/>
				<span
					class="details__text"
					:itemprop="SeoItempropLocationEnum.NAME"
				>
					{{ $t('event.tags.online') }}
				</span>
			</p>
			<component
				:is="component"
				v-else
				:to="hasLinkToGMaps ? getLocationLink(location) : null"
				:target="hasLinkToGMaps ? '_blank' : null"
				:itemprop="SeoItempropLocationEnum.GROUP_ITEMPROP"
				:itemtype="SeoItemTypeEnum.ADDRESS"
				itemscope
			>
				<CommonIcon
					name="map-pin"
					class="details__icon"
					color="var(--color-accent-green-main)"
				/>
				<p>
					<span
						v-if="props.location.country"
						:class="['details__text', { 'details__text--link': hasLinkToGMaps }]"
						:itemprop="SeoItempropLocationEnum.COUNTRY"
					>
						{{ location.country }}
					</span>
					<span
						v-if="location.city"
						:class="['details__text', { 'details__text--link': hasLinkToGMaps }]"
						:itemprop="SeoItempropLocationEnum.CITY"
						>, {{ location.city }}
					</span>
					<span
						v-if="location?.address"
						:class="['details__text', { 'details__text--link': hasLinkToGMaps }]"
						:itemprop="SeoItempropLocationEnum.ADDRESS"
						>, {{ location.address }}
					</span>
				</p>
			</component>
		</li>
	</ul>
</template>

<style scoped lang="less">
.details {
	display: flex;
	width: 100%;
	flex-direction: column;

	&__item,
	&__item > a,
	&__item > p {
		display: flex;
		width: 100%;
		align-items: center;
		line-height: 20px;

		&:not(:last-child) {
			margin-bottom: 8px;

			@media (min-width: 1440px) {
				margin-bottom: 12px;
			}
		}
	}

	&__icon {
		min-width: 24px;
		margin-right: 8px;
	}

	&__text {
		font-size: var(--font-size-S);
		vertical-align: center;

		@media (min-width: 1440px) {
			font-size: var(--font-size-XS);
		}

		&--link {
			text-decoration: underline;
		}
	}
}
</style>
