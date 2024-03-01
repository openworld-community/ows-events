<script setup lang="ts">
import { ref } from 'vue';
import {
	ComboboxContent,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxRoot,
	ComboboxTrigger,
	ComboboxViewport,
	ComboboxCancel
} from 'radix-vue';
import { vOnClickOutside } from '@vueuse/components';

defineProps({
	name: {
		type: String,
		default: ''
	},
	noBorder: {
		type: Boolean,
		default: false
	},
	list: {
		type: [Array, String, Set] as PropType<
			string | string[] | { [key: string]: string }[] | Set<string>
		>,
		// required: true,
		default: () => ['Apple', 'Banana', 'Grape', 'Cucumber', 'Tomato']
	},
	// передавать в виде ключа i18n
	// i.e. 'form.event.fields.price_placeholder'
	placeholder: {
		type: String,
		required: true
	},
	disabled: {
		type: Boolean,
		default: false
	},
	error: {
		type: Boolean,
		default: false
	}
});

const model = ref('');

//const isOpen = ref<boolean>(false)

//const handleOpen = () => {
// return isOpen.value === true ? isOpen.value = false : isOpen.value = true
//}

const clearModel = () => {
	model.value = '';
	// isOpen.value = false
};
</script>

<template>
	<ComboboxRoot
		v-model="model"
		as-child
		:name="name"
		:disabled="disabled"
	>
		<div class="cb__wrapper">
			<ComboboxInput
				:class="['cb__input', { 'no-border': noBorder }]"
				:disabled="disabled"
				tabindex="1"
				:placeholder="$t(placeholder)"
			/>
			<div class="cb__input--actions">
				<ComboboxTrigger
					v-if="!model.length"
					as-child
					tabindex="1"
					class="cb__trigger"
				>
					<CommonButton
						button-kind="multiselect"
						:class="['cb__trigger--expand']"
					/>
				</ComboboxTrigger>
				<ComboboxCancel
					v-if="model.length"
					as-child
					class="cb__cancel"
					@click="clearModel"
				>
					<CommonButton
						is-icon
						icon-name="close"
						:interactive="false"
						class="cb__cancel--icon"
					/>
				</ComboboxCancel>
			</div>

			<ComboboxContent
				class="cb__content"
				as-child
				tabindex="1"
			>
				<ComboboxViewport>
					<ComboboxEmpty class="cb__empty" />

					<LibraryScrollArea>
						<ComboboxGroup
							as="ul"
							class="cb__content--list"
						>
							<LibraryUiItemSearch
								v-for="(option, index) in list"
								:key="index"
								:value="option"
							>
								<span>
									{{ option }}
								</span>
							</LibraryUiItemSearch>
						</ComboboxGroup>
					</LibraryScrollArea>
				</ComboboxViewport>
			</ComboboxContent>
		</div>
	</ComboboxRoot>
</template>

<style scoped lang="less">
.cb__wrapper {
	position: relative;
}
.cb__input {
	width: 100%;
	padding: 8px 35px 8px 12px;
	border: 1px solid #dbdbdb;
	border-radius: 8px;

	&::placeholder {
		color: var(--color-input-icons);
	}

	&.no-border {
		border-color: transparent;
	}

	&:hover {
		border-color: crimson;
	}
	&:focus {
		border-color: crimson;
	}
	&:focus-within {
		border-color: crimson;
	}

	&--actions {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		top: 50%;
		right: 0;
		z-index: 10;
		transform: translateY(-50%);
	}
}

.cb__cancel {
	padding-right: 2px;
}
.cb__trigger {
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: crimson;
	}
	&:focus {
		background-color: crimson;
	}
	&:focus-within {
		background-color: crimson;
	}

	&--expand {
		padding: 0;
		// padding-right: 5px;
		background-color: transparent;
		border-color: transparent;

		&:deep(svg) {
			position: static;
			transition: rotate 0.15s ease-in-out, color 0.15s ease-in-out;
		}

		&--opened:deep(svg) {
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
	padding-left: 8px;
	padding-right: 8px;
}

.cb__content {
	position: absolute;
	top: calc(100% + 5px);
	left: 0;
	z-index: 20;

	background-color: #fff;
	width: 100%;
	border: 1px solid #dbdbdb;
	border-radius: 8px;

	padding-block: 4px;

	&--list {
		display: flex;
		flex-direction: column;
		// gap: 5px;

		&--item {
			display: flex;
			justify-content: space-between;
			padding: 2px 0 2px 10px;
			cursor: pointer;

			&:active {
				background-color: var(--color-accent-green-main-10);
			}

			&:focus-visible {
				background-color: var(--color-accent-green-main-10);
			}
			&:focus {
				background-color: var(--color-accent-green-main-10);
			}

			&:hover {
				@media (hover: hover) {
					background-color: var(--color-accent-green-main-10);
				}
			}
		}
		&--list--item {
			&:focus-visible {
				background-color: var(--color-accent-green-main-10);
			}
			&:focus {
				background-color: var(--color-accent-green-main-10);
			}
		}
		&__ilist--tem[data-highlighted] {
			background-color: red;
		}
	}
}

.itop:focus {
	background-color: var(--color-accent-green-main-10);
}
</style>
