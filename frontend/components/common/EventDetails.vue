<script setup lang="ts">
import type { Location } from '../../../common/types/address';
import type { PropType } from 'vue';
import type { EventPrice } from '../../../common/types/event';
import { formatPrice } from '../../utils/prices';
import { formatDate, formatDateForEventPage, formatTimeForEventPage } from '../../utils/dates';

import type { Timezone } from '../../../common/types/location';
import { formatLocation } from '~/utils/location';
const { t } = useI18n();

const props = defineProps({
	size: {
		type: String as PropType<'big' | 'small'>,
		default: 'small'
	},
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
	date: {
		type: Number,
		required: true
	},
	duration: {
		type: Number,
		default: 0
	},
	timezone: { type: Object as PropType<Timezone>, default: null },
	price: {
		type: [Object, null] as PropType<EventPrice | null>,
		required: true,
		default: null
	},
	isPreview:{
		type: Boolean,
		required: true
	}
});

const dataPrice = computed(() => {
	if (!props.price) {
		return t('event.price.unknown');
	}
	if (props.price.value === 0) {
		return t('event.price.free');
	} else {
		return formatPrice(props.price);
	}
});
</script>

<template>
	<ul class="details">
		<!--	Дата	-->
		<CommonEventDetailesItem
		  v-if="isPreview"
			icon-name="calendar"
			:data="formatDate(date, isOnline, timezone, duration)"
			:size="size"
		/>
		<CommonEventDetailesItem
		  v-if="!isPreview"
			icon-name="calendar"
			:data="formatDateForEventPage(date, isOnline, timezone, duration)"
			:data-optional="formatTimeForEventPage(date, isOnline, timezone, duration)"
			:size="size"
		/>
	

		<!-- Цена -->
		<CommonEventDetailesItem
			icon-name="dollar"
			:data="dataPrice"
			:size="size"
		/>

		<!--	Локация		-->
		<CommonEventDetailesItem
			v-if="isOnline"
			icon-name="globe"
			:data="$t('event.tags.online')"
			:size="size"
		/>
		<CommonEventDetailesItem
			v-if="!isOnline"
			icon-name="map-pin"
			:to="hasLinkToGMaps ? getLocationLink(location) : ''"
			:data="formatLocation(location)"
			:size="size"
		/>
	</ul>
</template>

<style scoped lang="less">
.details {
	display: flex;
	width: 100%;
	flex-direction: column;
	overflow: hidden;
	gap: 5px;
	@media (min-width: 768px) {
		gap: 12px;
	}
}
</style>
