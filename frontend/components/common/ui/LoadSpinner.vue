<script
	setup
	lang="ts"
>
import type { PropType } from 'vue';

defineProps({
	color: {
		type: String as PropType<string>,
		default: 'var(--color-white)'
	}
});
</script>

<template>
	<div class="lds-spinner">
		<div
			v-for="number in Array.from({ length: 8 }, (_, i) => i + 1)"
			:key="number"
			:style="{ transform: `rotate(${45 * (number - 1)}deg)`, animationDelay: `${-0.8 + (number / 10)}s` }"
		></div>
	</div>
</template>

<style
	scoped
	lang="less"
>
.lds-spinner {
	display: inline-block;
	position: relative;
	width: 24px;
	height: 24px;
}

.lds-spinner div {
	transform-origin: 12px 12px;
	animation: lds-spinner 0.8s linear infinite;
}

.lds-spinner div:after {
	content: ' ';
	display: block;
	position: absolute;
	top: 16px;
	left: 11px;
	width: 1.5px;
	height: 4.5px;
	border-radius: 1px;
	background: v-bind('color');
}

@keyframes lds-spinner {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}
</style>
