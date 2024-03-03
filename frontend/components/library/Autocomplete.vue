<script
	setup
	lang="ts"
>
import { ref } from 'vue';
import {
	ComboboxAnchor,
	ComboboxPortal,
	ComboboxContent,
	ComboboxGroup,
	ComboboxInput,
	ComboboxRoot,
	ComboboxTrigger,
	ComboboxViewport,
	ComboboxCancel,
} from 'radix-vue';
import type { PropType } from 'vue';

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

const model = ref(props.modelValue);
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
		as-child
	>
		<div class="cb__wrapper">
			<ComboboxAnchor>
				<ComboboxInput
					:class="['cb__input', { 'no-border': noBorder }]"
					:data-disabled="disabled"
					name="search"
					tabindex="1"
					:placeholder="$t(placeholder)"
					:data-error="error"
				/>
				<div class="cb__input--actions">
					<ComboboxTrigger
						v-if="!model.length"
						tabindex="1"
						class="cb__trigger"
						as-child
					>
						<CommonButton
							button-kind="multiselect"
							class="cb__trigger--expand"
						/>
					</ComboboxTrigger>
					<ComboboxCancel
						v-if="model.length"
						as-child
						class="cb__cancel"
					>
						<CommonButton
							is-icon
							icon-name="close"
							:interactive="false"
							class="cb__cancel--icon"
						/>
					</ComboboxCancel>
				</div>
			</ComboboxAnchor>
			<ComboboxContent
				class="cb__content"
				tabindex="1"
				:style="{ maxHeight: `${height}px` }"
				position="popper"
				:side-offset="5"
			>
				<ComboboxViewport>
					<LibraryScrollArea :height="height">
						<ComboboxEmpty class="cb__empty">
							{{ $t('global.notFound') }}
						</ComboboxEmpty>
						<ComboboxGroup
							as="ul"
							class="cb__content--list"
						>
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
						</ComboboxGroup>
					</LibraryScrollArea>
				</ComboboxViewport>
			</ComboboxContent>
		</div>
	</ComboboxRoot>
</template>

<style
	scoped
	lang="less"
>
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

	&:hover {
		background-color: var(--color-accent-green-main-10);

		&:deep(svg) {
			color: var(--color-accent-green-main);
		}
	}

	&:focus-visible {
		background-color: var(--color-accent-green-main-10);
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

	&:hover:deep(svg) {
		color: var(--color-accent-green-main);
	}

	&:focus-visible {
		background-color: var(--color-accent-green-main-10);
	}

	&--expand {
		padding: 0;
		background-color: transparent;
		border-color: transparent;

		&:deep(svg) {
			position: static;
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

	/* position: absolute;
	z-index: 20; */

	background-color: var(--backround-color);
	border: 1px solid #dbdbdb;
	border-radius: 8px;

	&--list {
		display: flex;
		flex-direction: column;
	}
}
</style>
