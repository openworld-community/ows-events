<script setup lang="ts">
import { SelectContent, SelectRoot, SelectTrigger, SelectValue, SelectViewport } from 'radix-vue';
const props = defineProps({
	options: {
		type: [Array, String, Set] as PropType<
			string | string[] | { [key: string]: string }[] | Set<string>
		>,
		required: true
	},
	modelValue: {
		type: String,
		required: true
	},
	placeholder: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	align: {
		type: String as PropType<'start' | 'center' | 'end'>,
		default: 'start'
	},
	side: {
		type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
		default: 'bottom'
	},
	//type of trigger - without border for main page
	noBorder: {
		type: Boolean,
		default: false
	},
	optionAsIcon: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	required: {
		type: Boolean,
		default: false
	},
	error: {
		type: Boolean,
		default: false
	}
});
const emit = defineEmits(['update:model-value']);
const model = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:model-value', value);
	}
});
const height = ref(200);
const onRemove = () => {
	emit('update:model-value', '');
};
</script>

<template>
	<div
		style="position: relative"
		class="select"
	>
		<SelectRoot
			v-model="model"
			:disabled="disabled"
			:name="name"
			:required="required"
		>
			<SelectTrigger
				:tabindex="disabled ? -1 : 0"
				as="div"
				:class="['select__trigger', { 'select__trigger--no-border': noBorder }]"
				:data-error="error"
			>
				<SelectValue
					:placeholder="required ? `${placeholder} *` : placeholder"
					class="select__value"
				/>

				<CommonIcon
					v-if="!model"
					name="container"
					color="var(--color-input-icons)"
				/>
			</SelectTrigger>

			<SelectContent
				class="select__content"
				:style="{ maxHeight: `${height}px` }"
				position="popper"
				:side-offset="5"
				:align="align"
				:side="side"
			>
				<SelectViewport as-child>
					<LibraryScrollArea :height="height">
						<ul class="select__list">
							<LibraryUiItemSelect
								v-for="option in options"
								:key="typeof option === 'string' ? option : option['value']"
								:value="typeof option === 'string' ? option : option['value']"
								:icon-name="optionAsIcon ? `${name}/${option}` : ''"
							>
								<span class="select__item-content">
									<CommonIcon
										v-if="optionAsIcon"
										:name="`${name}/${option}`"
									/>
									{{ typeof option === 'string' ? option : option['label'] }}
								</span>
							</LibraryUiItemSelect>
						</ul>
					</LibraryScrollArea>
				</SelectViewport>
			</SelectContent>
		</SelectRoot>
		<button
			v-if="model"
			type="button"
			class="select__clear-select"
			:aria-label="$t('global.button.clear')"
			tabindex="0"
			@click="onRemove"
			@click.enter="onRemove"
		>
			<CommonIcon
				name="close"
				color="var(--color-input-icons)"
			/>
		</button>
	</div>
</template>

<style scoped lang="less">
:deep(.select) {
	&__content {
		min-width: 267px;
		background-color: #ffffff;
		box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
		position: absolute;
		z-index: 100;
		border-radius: 8px;
		border: 2px black;
		width: var(--radix-select-trigger-width);
		height: auto;
		min-height: 100px;
		max-width: 300px;
		transform-origin: var(--radix-select-content-transform-origin);
		animation: scaleIn, 0.5s, cubic-bezier(0.2, 0.8, 0.3, 1);
	}
}
.select {
	width: 100%;
	min-width: 10%;
	position: relative;
	&:deep(.scroll-area__viewport) {
		width: 100%;
	}

	&__trigger {
		width: 100%;
		min-width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		border: 1px solid #dbdbdb;
		border-radius: 8px;
		background-color: var(--color-white);
		padding: 8px 12px 8px 12px;
		transition: border-color 0.3s ease;
		cursor: pointer;

		&--no-border[data-state='open'] {
			border-color: var(--color-accent-green-main);
		}

		&:focus-within {
			outline: none;
			border-color: var(--color-accent-green-main);
		}
		&:focus {
			outline: none;
			border-color: var(--color-accent-green-main);
		}

		&:hover {
			border-color: var(--color-accent-green-main);
		}

		&--no-border {
			border-color: transparent;

			&:hover {
				border-color: transparent;
			}

			@media (min-width: 1440px) {
				height: 72px;
			}
		}
	}

	&__value {
		font-family: var(--font-family-main);
		font-size: var(--font-size-M);
		color: var(--color-text-main);
	}

	&__trigger[data-placeholder] {
		.select__value {
			font-family: var(--font-family-main);
			font-size: var(--font-size-M);
			color: var(--color-input-icons);
		}
	}

	&__trigger[data-disabled] {
		pointer-events: none;
		border-color: var(--color-input-field);
		opacity: 0.4;

		&.select__trigger--no-border {
			border-color: transparent !important;
		}
	}

	&__trigger[data-error='true'] {
		border-color: var(--color-accent-red);
	}

	&__list {
		//height: auto;
		padding: 8px 4px;
		width: 100%;
		min-width: fit-content;
	}

	&__clear-select {
		position: absolute;
		z-index: 10;
		top: 0;
		right: 12px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		border-color: 4px;

		&:focus-within {
			outline: none;
		}

		&:focus {
			outline: none;
		}
	}

	&__item-content {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	&__clear-select:hover :deep(svg),
	&__clear-select:focus :deep(svg),
	&__clear-select:focus-within :deep(svg) {
		color: var(--color-accent-green-main);
	}
}
@keyframes scaleIn {
	from {
		opacity: 0;
		transform: scale(0);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
