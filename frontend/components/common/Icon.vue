<script lang="ts">
export type IconName =
	| 'afisha-logo-light'
	| 'afisha-logo-dark'
	| 'arrow-right'
	| 'back'
	| 'button-plus'
	| 'calendar'
	| 'check'
	| 'clock'
	| 'close'
	| 'contact-tg'
	| 'container'
	| 'copy'
	| 'delete'
	| 'donate'
	| 'edit'
	| 'error'
	| 'globe'
	| 'heart'
	| 'heart-filled'
	| 'info'
	| 'language/en'
	| 'language/ru'
	| 'login'
	| 'logout'
	| 'map-pin'
	| 'notebook'
	| 'picture'
	| 'plus'
	| 'privacy'
	| 'password'
	| 'search'
	| 'share'
	| 'trash'
	| 'user'
	| 'donate/patreon'
	| 'donate/boosty'
	| 'donate/paypal'
	| 'donate/bitcoin'
	| 'donate/ethereum'
	| 'donate/usdc'
	| 'donate/usdt'
	| 'social/telegram'
	| 'social/instagram'
	| 'social/twitter'
	| 'social/linkedin'
	| 'social/facebook'
	| 'social/telegram-round'
	| 'social/instagram-round'
	| 'social/twitter-round'
	| 'social/linkedin-round'
	| 'social/facebook-round'
	| 'currency/BTC'
	| 'currency/ETH'
	| 'currency/EUR'
	| 'currency/KGS'
	| 'currency/RSD'
	| 'currency/USD'
	| 'currency/USDC'
	| 'currency/USDT'
	| 'dollar'
	| 'email'
	| 'dots-three-vertical'
	// хак, из-за которого ТС не мерджит этот юнион в просто string, из-за чего и работает автокомплит, и можно указать все равно любую строку
	| (string & {});
</script>
<script setup lang="ts">
import { IconDefaultParams } from '@/constants/defaultValues/icon';
import type { PropType } from 'vue';

const props = defineProps({
	name: {
		type: String as PropType<string>,
		required: true
	},
	color: {
		type: String as PropType<string>,
		default: 'var(--color-input-icons)'
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
</script>

<template>
	<span>
		<nuxt-icon
			:name="props.name"
			:filled="true"
			aria-hidden="true"
		/>
	</span>
</template>

<style scoped lang="less">
.nuxt-icon:deep(svg) {
	pointer-events: none;
	color: v-bind('color');
	width: v-bind('width');
	height: v-bind('height');
}
</style>
