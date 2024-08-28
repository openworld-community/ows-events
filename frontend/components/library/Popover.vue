<script setup lang="ts">
import { PopoverContent, Popover, PopoverTrigger } from './ui/MyPopover';

const props = defineProps({
	variant: {
		type: String as PropType<'primary'>,
		default: 'primary'
	},
	ariaLabel: {
		type: String,
		default: ''
	},
	open: {
		type: Boolean,
		required: false
	},
	side: {
		type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
		default: 'bottom'
	},
	align: {
		type: String as PropType<'start' | 'center' | 'end'>,
		default: 'start'
	},
	disabled: {
		type: Boolean,
		default: false
	},
	height: { type: Number, default: 200 }
});

const _open = ref(false);

const model = computed({
	get() {
		if (props.open) {
			return props.open;
		} else {
			return _open.value;
		}
	},
	set(value) {
		_open.value = value;
		return value;
	}
});
</script>

<template>
	<Popover v-model:open="model">
		<PopoverTrigger
			:class="['popover__trigger', { 'popover__trigger--primary': variant === 'primary' }]"
			:aria-label="ariaLabel"
			:disabled="disabled"
		>
			<slot name="trigger" />
		</PopoverTrigger>

		<PopoverContent
			:class="['popover__content', { 'popover__content--primary': variant === 'primary' }]"
			:side="side"
			:side-offset="5"
			:align="align"
		>
			<slot name="content"></slot>
		</PopoverContent>
	</Popover>
</template>

<style lang="less" scoped>
:deep(.popover) {
	&__content {
		width: var(--radix-popover-trigger-width);
		max-height: var(--radix-popover-content-available-height);

		animation-duration: 0.8s;
		animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

		min-width: 267px;
		background-color: #ffffff;
		box-shadow: var(--shadow-dropdown);

		border-radius: 8px;

		min-height: 100px;
		max-width: 300px;
		z-index: 100;
		overflow: hidden;

		&--primary {
			//to set height for the content - set height to the real content
			height: fit-content;
			min-height: 100px;
			max-height: 300px;
			min-width: 200px;
		}

		&[data-side='top'] {
			animation-name: slideUp;
		}
		&[data-side='bottom'] {
			animation-name: slideDown;
		}
	}
}

.popover {
	&__trigger {
		width: 100%;

		&--primary {
			min-width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			border: 1px solid #dbdbdb;
			border-radius: 8px;
			background-color: #ffffff;
			font-family: var(--font-family-main);
			font-size: var(--font-size-M);
			color: var(--color-text-main);
			padding: 8px 12px 8px 12px;
			@media (min-width: 1440px) {
				border-color: transparent;
			}
			&:focus-within {
				border-color: var(--color-accent-green-main);
			}
		}
	}

	&__trigger[data-state='open'] {
		border-color: var(--color-accent-green-main);
	}
	&__trigger[data-state='close'] {
		border-color: transparent;
	}
	&__trigger:disabled {
		opacity: 0.8;
	}
}

@keyframes slideDown {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slideUp {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
