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
				tabindex="0"
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
						<ul style="height: auto; padding: 8px 4px">
							<LibraryUiItemSelect
								v-for="option in options"
								:key="typeof option === 'string' ? option : option['value']"
								:value="typeof option === 'string' ? option : option['value']"
								:icon-name="optionAsIcon ? `${name}/${option}` : ''"
								side="top"
								side-offset="5"
								position="popper"
								avoid-collisions
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
			class="select__clear-btn"
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

<style lang="less">
.select {
	width: 100%;
	min-width: 10%;

	&__trigger {
		width: 100%;
		min-width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		border: 1px solid #dbdbdb;
		border-radius: 8px;
		background-color: #ffffff;
		padding: 8px 12px 8px 12px;
		transition: border-color 0.3s ease;
		cursor: pointer;

		&--no-border {
			border-color: transparent;
			@media (min-width: 1440px) {
				height: 72px;
			}
		}

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
		border-color: var(--color-input-field);
		opacity: 0.4;
	}
	&__trigger[data-error='true'] {
		border-color: var(--color-accent-red);
	}

	&__content {
		min-width: 267px;
		background-color: #ffffff;
		box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
		z-index: 99;
		border-radius: 8px;
		border: 2px black;
		width: var(--radix-select-trigger-width);
		//	height: auto;
		min-height: 100px;
	}
	&__clear-btn {
		position: absolute;
		z-index: 10;
		top: 16%;
		right: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
		border-color: 4px;

		&:focus-within {
			outline: none;
			border-color: var(--color-accent-green-main);
			border-radius: 4px;
		}

		&:focus {
			outline: none;
			border-radius: 4px;
			border-color: var(--color-accent-green-main);
		}
	}

	&__item-content {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	&__clear-btn:hover svg {
		color: var(--color-accent-green-main);
	}
	&__clear-btn:focus svg {
		color: var(--color-accent-green-main);
	}
	&__clear-btn:focus-withn svg {
		color: var(--color-accent-green-main);
	}
}
</style>
