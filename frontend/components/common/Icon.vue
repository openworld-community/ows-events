<script lang="ts">
export type IconName =
	| 'user'
	| 'trash'
	| 'share'
	| 'search'
	| 'privacy'
	| 'plus'
	| 'picture'
	| 'peredelano-afisha'
	| 'map-pin'
	| 'logout'
	| 'login'
	| 'info'
	| 'error'
	| 'edit'
	| 'delete'
	| 'check'
	| 'container'
	| 'contact-tg'
	| 'close'
	| 'clock'
	| 'calendar'
	| 'button-plus'
	| 'back'
	| 'arrow-right'
	| 'copy'
	| 'donate'
	| 'donate/patreon'
	| 'donate/bitcoin'
	| 'donate/ethereum'
	| 'donate/usdc'
	| 'donate/usdt'
	| 'social/telegram'
	| 'social/instagram'
	| 'social/twitter'
	| 'social/linkedin'
	| 'social/facebook'
	| 'currency/BTC'
	| 'currency/ETH'
	| 'currency/EUR'
	| 'currency/KGS'
	| 'currency/RSD'
	| 'currency/USD'
	| 'currency/USDC'
	| 'currency/USDT'
	// хак, из-за которого ТС не мерджит этот юнион в просто string, из-за чего и работает автокомплит, и можно указать все равно любую строку
	| (string & {});
</script>
<script setup lang="ts">
import { IconDefaultParams } from '@/constants/defaultValues/icon';
import type { PropType } from 'vue';

const props = defineProps({
	name: {
		type: String as PropType<IconName>,
		required: true
	},
	color: {
		type: String as PropType<string>,
		default: 'var(--color-input-field)'
	},
	width: {
		type: [String, Number] as PropType<string | number>,
		default: IconDefaultParams.WIDTH
	},
	height: {
		type: [String, Number] as PropType<string | number>,
		default: IconDefaultParams.HEIGHT
	}
});

const symbolId = computed(() => `#${props.name}`);
</script>

<template>
	<svg
		aria-hidden="true"
		:width="props.width"
		:height="props.height"
	>
		<use :href="symbolId" />
	</svg>
</template>

<style scoped lang="less">
svg {
	pointer-events: none;
	color: v-bind('color');
}
</style>
