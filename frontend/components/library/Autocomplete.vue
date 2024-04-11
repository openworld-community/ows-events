<script setup lang="ts">
import {
	ComboboxAnchor,
	ComboboxContent,
	ComboboxInput,
	ComboboxRoot,
	ComboboxTrigger,
	ComboboxViewport,
	ComboboxCancel,
} from 'radix-vue';
import type { PropType } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	noBorder: {
		type: Boolean,
		default: false
	},
	options: {
		type: [Array, String, Set] as PropType<
			string | string[] | { [key: string]: string }[]
		>,
		required: true,
	},
	optionAsIcon: {
		type: Boolean,
		default: false
	},
	// передавать в виде ключа i18n
	// i.e. 'form.event.fields.price_placeholder'
	placeholder: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	error: {
		type: Boolean,
		default: false
	},
	// передавать в виде ключа i18n
	// i.e. 'form.event.fields.price_placeholder'
	label: {
		type: String,
		default: ''
	},
	height: {
		type: Number,
		default: 200
	},
	required: {
		type: Boolean,
		default: false
	},
});

const emit = defineEmits(['update:model-value'])

const isOpen = ref(false)
const model = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		return emit('update:model-value', value)
	}
});

const handleOpen = () => {
	isOpen.value === false ? isOpen.value = true : isOpen.value = false
}
const close = () => {
	isOpen.value = false
}
const clearModel = () => emit('update:model-value', '')
</script>

<template>
	<label
		v-if="label"
		for="search"
		class="cb__label"
	>
		{{ required ? `${$t(label)} *` : $t(label) }}
	</label>
	<ComboboxRoot
		v-model="model"
		:name="name"
		:disabled="disabled"
		:display-value="(value) => typeof value === 'string' ? value : value['label']"
		:open="isOpen"
		as-child
	>
		<div
			v-on-click-outside="close"
			class="cb__wrapper"
		>
			<ComboboxAnchor>
				<ComboboxInput
					:class="['cb__input', { 'no-border': noBorder }]"
					:data-disabled="disabled"
					name="search"
					:placeholder="placeholder"
					:data-error="error"
					autocomplete="off"
					@click="handleOpen"
				/>
				<div class="cb__input--actions">
					<ComboboxTrigger
						v-if="!model"
						class="cb__trigger"
						as-child
						@click="handleOpen"
					>
						<CommonButton
							tabindex="0"
							button-kind="multiselect"
							class="cb__trigger--expand"
						/>
					</ComboboxTrigger>
					<ComboboxCancel
						v-if="model"
						as-child
						class="cb__cancel"
					>
						<CommonButton
							tabindex="0"
							is-icon
							icon-name="close"
							:interactive="false"
							class="cb__cancel--icon"
							:is-disabled="disabled"
							@click="clearModel(); close()"
						/>
					</ComboboxCancel>
				</div>
			</ComboboxAnchor>
			<!-- ComboboxContent мерджится с popper wrapper и стиль по классу не применяется -->
			<ComboboxContent
				class="cb__content"
				tabindex="0"
				:style="{ maxHeight: `${height}px` }"
				position="popper"
				:side-offset="5"
				style="background-color: #fff;"
				@click="handleOpen"
			>
				<ComboboxViewport>
					<LibraryScrollArea :height="height">
						<ComboboxEmpty class="cb__empty">
							{{ $t('global.notFound') }}
						</ComboboxEmpty>
						<ul class="cb__content--list">
							<LibraryUiItemSearch
								v-for="option in options"
								:key="typeof option === 'string' ? option : option['value']"
								:value="option"
								:icon-name="optionAsIcon ? `${name}/${option}` : ''"
								avoid-collisions
							>
								<span class="search-item">
									<CommonIcon
										v-if="optionAsIcon"
										:name="`${name}/${option}`"
									/>
									{{ typeof option === 'string' ? option : option['label'] }}
								</span>
							</LibraryUiItemSearch>
						</ul>
					</LibraryScrollArea>
				</ComboboxViewport>
			</ComboboxContent>
		</div>
	</ComboboxRoot>
</template>

<style scoped lang="less">
.cb__wrapper {
	position: relative;
	font-family: var(--font-family-main);
	font-size: var(--font-size-M);

	&>div[data-radix-popper-content-wrapper] {
		/* у поппера обертки инлайн стили, веса по тегу не хватает */
		box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
		position: absolute !important;
		width: 100% !important;
		max-width: 100% !important;
		min-width: 200px !important;
		z-index: 20 !important;
	}
}

.cb__label {
	display: block;
	margin-bottom: 3px;
}

.cb__input {
	width: 100%;
	padding: 8px 35px 8px 12px;
	border: 1px solid #dbdbdb;
	border-radius: 8px;

	&::placeholder {
		color: var(--color-input-icons);
	}

	&[data-error="true"] {
		border-color: var(--color-accent-red);
	}

	&[data-disabled="true"] {
		border-color: var(--color-input-field);
		opacity: 0.4;
		pointer-events: none;
	}

	&.no-border {
		border-color: transparent;
	}

	&:hover {
		border-color: var(--color-accent-green-main);
	}

	&:focus {
		border-color: var(--color-accent-green-main);
	}

	&:focus-within {
		border-color: var(--color-accent-green-main);
	}

	&--actions {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		top: 50%;
		right: 8px;
		height: 100%;
		z-index: 10;
		transform: translateY(-50%);
	}
}

.cb__cancel {
	padding-right: 2px;
	height: 100%;

	&:deep(svg) {
		position: static;
		transition: rotate 0.15s ease-in-out, color 0.15s ease-in-out;
	}

	&:hover,
	&:focus-visible {
		&:deep(svg) {
			color: var(--color-accent-green-main);
		}
	}
}

.cb__trigger {
	display: flex;
	justify-content: center;
	align-items: center;

	&[data-disabled] {
		pointer-events: none;
		opacity: 0.4;
	}

	&:hover,
	&:focus-visible {
		&:deep(svg) {
			color: var(--color-accent-green-main);
		}
	}

	&--expand {
		padding: 0;
		background-color: transparent;
		border-color: transparent;

		&:deep(svg) {
			position: relative;
			top: 0;
			right: 0;
			transform: none;
			transition: rotate 0.15s ease-in-out, color 0.15s ease-in-out;
		}

		&[aria-expanded="true"]:deep(svg) {
			rotate: 180deg;
			color: var(--color-accent-green-main);
		}

		&:focus,
		&:active {
			border-color: transparent;
		}
	}
}

.cb__empty {
	padding-inline: 8px;
}

.cb__content {
	width: 100%;
	height: auto;
	min-height: 100px;

	border: 1px solid #dbdbdb;
	border-radius: 8px;

	&--list {
		display: flex;
		flex-direction: column;
	}
}
</style>
