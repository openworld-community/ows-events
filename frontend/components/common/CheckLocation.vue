<script setup lang="ts">
import type { Location } from '../../../common/types/address';

const props = defineProps({
	isShow: {
		type: Boolean,
		default: false
	},
	location: {
		type: Object as PropType<Location>,
		default: null
	}
});
</script>
<template>
	<div
		v-if="isShow"
		class="modal-card__check-location check-location"
	>
		<CommonIcon
			class="check-location__icon"
			name="error"
			width="26"
			height="26"
			color="var(--color-accent-red)"
		/>
		<p class="check-location__text">
			<span>
				{{ $t('form.event.fields.check_address') }}
			</span>
			<NuxtLink
				:to="getLocationLink(location)"
				target="_blank"
				class="check-location__link"
			>
				{{ $t('form.event.fields.address_link') }}
			</NuxtLink>
		</p>
	</div>
</template>

<style lang="less" scoped>
.check-location {
	display: flex;
	align-items: center;

	&__icon {
		flex-shrink: 0;
		margin-right: 20px;
	}

	&__text {
		font-size: var(--font-size-XS);
		line-height: 18px;
	}

	&__link {
		color: var(--color-link);
		text-decoration: underline;
	}
}
</style>
