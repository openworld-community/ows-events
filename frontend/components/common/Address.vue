<script setup lang="ts">
import type { Location } from '../../../common/types/address';
import type { PropType } from 'vue';
import {SeoItempropGlobalEnum, SeoItempropLocationEnum, SeoItemTypeEnum} from "../../constants/enums/seo";

const props = defineProps({
	location: {
		type: Object as PropType<Location>,
		required: true
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
		class="address"
		:to="isLink ? getLocationLink(location) : null"
		:target="isLink ? '_blank' : null"
		:itemprop="isLink ? SeoItempropGlobalEnum.URL : null"
	>
		<CommonIcon
			v-if="withPin"
			name="map-pin"
			class="address__icon"
		/>
		<span
			:class="['address__text', { 'address__text--link': isLink }]"
			:itemprop="SeoItempropLocationEnum.GROUP_ITEMPROP"
			itemscope
			:itemtype="SeoItemTypeEnum.ADDRESS"
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
	</component>
</template>

<style scoped lang="less">
.address {
	display: flex;
	max-height: max-content;

	&__icon {
		color: var(--color-accent-green-main);
		margin-right: var(--space-related-items);
	}

	&__text {
		font-size: var(--font-size-S);

		&--link {
			font-size: var(--font-size-XS);
			line-height: 14px;
			color: var(--color-link);
			text-decoration: underline;
		}
	}
}
</style>
