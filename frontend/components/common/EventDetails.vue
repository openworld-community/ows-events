<script setup lang="ts">
import type { Location } from '../../../common/types/address';
import type { PropType } from 'vue';
import {
	SeoItempropEventEnum,
	SeoItempropLocationEnum,
	SeoItemTypeEnum
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
		<CommonIcon
			v-if="withPin"
			:name="location ? 'map-pin' : 'calendar'"
			class="details__icon"
			color="var(--color-accent-green-main)"
		/>

		<!--	Локация		-->
		<span
			v-if="location"
			:class="['details__text', { 'details__text--link': isLink }]"
			itemscope
			:itemtype="SeoItemTypeEnum.ADDRESS"
			:itemprop="SeoItempropLocationEnum.GROUP_ITEMPROP"
		>
			<span
				v-if="props.location.country"
				:itemprop="SeoItempropLocationEnum.COUNTRY"
			>
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

		<!--	Дата	-->
		<span
			v-if="startDate"
			class="details__text"
			:itemprop="SeoItempropEventEnum.START_DATE"
		>
			{{ startDate }}
		</span>
		<span
			v-if="endDate"
			class="details__text"
			> &nbsp;-&nbsp;
		</span>
		<span
			v-if="endDate"
			class="details__text"
			:itemprop="SeoItempropEventEnum.END_DATE"
		>
			{{ endDate }}
		</span>
	</component>
</template>

<style scoped lang="less">
.details {
	display: flex;
	max-width: max-content;

	&__icon {
		margin-right: 8px;
	}

	&__text {
		font-size: var(--font-size-S);

		&--link {
			text-decoration: underline;
		}
	}
}
</style>
