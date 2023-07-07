<script setup lang="ts">
import type { Location } from '../../../common/types/address';
import type { PropType } from 'vue';

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
		:to="isLink ? getLocationLink(location) : undefined"
		:target="isLink ? '_blank' : undefined"
		:itemprop="isLink ? 'url' : undefined"
	>
		<CommonIcon
			v-if="withPin"
			name="map-pin"
			class="address__icon"
		/>
		<span
			:class="['address__text', { 'address__text--link': isLink }]"
			itemprop="address"
			itemscope
			itemtype="https://schema.org/PostalAddress"
		>
			<span
				v-if="props.location.country"
				itemprop="addressCountry"
			>
				{{ props.location.country }},
			</span>
			<span
				v-if="props.location.city"
				itemprop="addressLocality"
			>
				{{ props.location.city }}
			</span>
			<span
				v-if="props.location?.address"
				itemprop="location"
				>, {{ props.location.address }}
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
