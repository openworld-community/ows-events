<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	color: {
		type: String as PropType<string>,
		default: 'var(--color-white)'
	},
	size: {
		type: String as PropType<'small' | 'big' | 'middle'>,
		default: 'small'
	}
});
</script>

<template>
	<div
		:class="[
			'lds-spinner',
			{ 'spinner-big': size === 'big' },
			{ 'spinner-small': size === 'small' },
			{ 'spinner-middle': size === 'middle' }
		]"
	>
		<div
			v-for="number in Array.from({ length: 8 }, (_, i) => i + 1)"
			:key="number"
			:style="{
				transform: `rotate(${45 * (number - 1)}deg)`,
				animationDelay: `${-0.8 + number / 10}s`
			}"
		></div>
	</div>
</template>

<style scoped lang="less">
.lds-spinner {
	display: inline-block;
	position: relative;
}

.spinner-small {
	width: 24px;
	height: 24px;
}
.spinner-big {
	width: 40px;
	height: 40px;
}

.spinner-middle {
	width: 30px;
	height: 30px;
}

.lds-spinner div {
	animation: lds-spinner 0.8s linear infinite;
}

.spinner-small div {
	transform-origin: 12px 12px;
}
.spinner-big div {
	transform-origin: 20px 20px;
}

.spinner-middle div {
	transform-origin: 15px 15px;
}

.lds-spinner div:after {
	content: ' ';
	display: block;
	position: absolute;

	border-radius: 1px;
	background-color: v-bind('color');
}

.spinner-small div:after {
	top: 16px;
	left: 11px;
	width: 1.5px;
	height: 4.5px;
}

.spinner-big div:after {
	top: 4px;
	left: 18px;
	width: 3.5px;
	height: 11.5px;
}

.spinner-middle div:after {
	top: 4px;
	left: 14px;
	width: 2.5px;
	height: 8.5px;
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
