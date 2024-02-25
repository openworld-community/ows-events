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
				tabindex="1"
				as="div"
				class="select__trigger"
				:data-error="error"
			>
				<SelectValue
					:placeholder="placeholder"
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
				position="popper"
				:side-offset="5"
			>
				<SelectViewport as-child>
					<LibraryScrollArea>
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
								<span style="display: flex; align-items: center; gap: 4px">
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
			class="select__clear-button"
			aria-label="clear"
			tabindex="1"
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
	min-width: 100%;

	&__trigger {
		width: 100%;
		min-width: 100%;
		display: flex;
		justify-content: space-between;
		height: 40px;
		border: 1px solid #dbdbdb;
		border-radius: 8px;
		background-color: #ffffff;
		padding: 8px 12px 8px 12px;
		transition: border-color 0.3s ease;
		cursor: pointer;

		&:focus-within {
			border-color: var(--color-accent-green-main);
		}

		&:focus {
			outline: 1px solid var(--color-accent-green-main);
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
		height: 160px;
		min-height: 100px;
		max-height: 200px;
	}
	&__clear-button {
		position: absolute;
		z-index: 10;
		top: 8px;
		right: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
		border-color: 4px;

		&:deep(svg) {
			color: var(--color-accent-green-main);
		}
		&:focus-within {
			outline: var(--color-accent-green-main);
			border-color: var(--color-accent-green-main);
			border-radius: 4px;

			&:deep(svg) {
				color: var(--color-accent-green-main);
			}
		}

		&:focus {
			outline: var(--color-accent-green-main);
			border-radius: 4px;
			&:deep(svg) {
				color: var(--color-accent-green-main);
			}
		}
		&:hover {
			border-color: var(--color-accent-green-main);

			&:deep(svg) {
				color: var(--color-accent-green-main);
			}
		}
	}
}
</style>
