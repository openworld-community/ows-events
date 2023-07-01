<script lang="ts">
export type WrappedInputClass = 'wrapped-input';
</script>
<script setup lang="ts">
import type { IconName } from '../Icon.vue';
defineProps<{
	onRemove: () => void;
	label?: string;
	icon?: { name: IconName; onClick?: () => void } | 'DELETE';
	error?: string;
}>();
</script>
<template>
	<label
		class="wrapper"
		:class="[{ error }]"
	>
		<span
			v-if="label"
			class="label"
		>
			{{ label }}
		</span>
		<slot />
		<div
			v-if="icon && (icon === 'DELETE' || icon.name)"
			class="input-icon"
		>
			<CommonButton
				v-if="icon === 'DELETE'"
				is-icon
				icon-name="delete"
				:alt="$t('global.button.delete')"
				@click.capture.prevent.stop="onRemove"
			/>
			<CommonButton
				v-else-if="icon?.onClick"
				is-icon
				:icon-name="icon.name"
			/>
			<CommonIcon
				v-else
				:name="icon.name"
			/>
		</div>
		<span
			v-if="error"
			class="error"
		>
			{{ error }}
		</span>
	</label>
</template>
<style scoped lang="less">
.label {
	display: block;
	font-size: var(--font-size-S);
	color: var(--color-text-main);
	margin-bottom: 5px;
}

.wrapper {
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;
}
.input-icon {
	display: block;
	width: 26px;
	height: 26px;
	text-align: center;
	vertical-align: middle;
	margin: 0; //временно, чтобы перебить стили Bulma
	padding: 0;
	line-height: 0;
	position: absolute;
	top: 8px;
	right: 10px;
	cursor: pointer;

	//На будущее, для дизайна инпутов с кнопкой "Отмена":
	//&--cancel {
	//  color: #363636;
	//  opacity: 0.3;
	//  margin-left: 8px;
	//}
}

:deep(.wrapped-input) {
	display: flex;
	appearance: none;
	width: 100%;
	min-width: 100%;
	justify-content: space-between;
	height: 40px;
	border: 1px solid var(--color-input-field);
	border-radius: 24px;
	box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
	background-color: var(--color-white);
	font-family: var(--font-family-main);
	font-size: var(--font-size-M);
	color: var(--color-text-main);
	padding: 8px 35px 8px 12px;

	&::placeholder {
		font-family: var(--font-family-main);
		font-size: var(--font-size-M);
		color: var(--color-input-icons);
	}

	&:active,
	&:focus {
		outline: none;
		border: 1px solid #48c78e;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	&:disabled {
		background-color: var(--color-background-secondary);
	}

	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		box-shadow: 0 0 0 30px white inset;
	}

	&::-webkit-inner-spin-button,
	&::-webkit-calendar-picker-indicator {
		position: absolute;
		top: 10px;
		right: 14px;
		opacity: 0;
		z-index: 1;
	}
}
.error,
.error :deep(.wrapped-input) {
	color: var(--color-accent-red);
}
</style>
