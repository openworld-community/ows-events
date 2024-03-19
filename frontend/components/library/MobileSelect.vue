<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: String,
		required: true
	},
	options: {
		type: [Array, String, Set] as PropType<
			string | string[] | { [key: string]: string }[] | Set<string>
		>,
		required: true
	},

	name: {
		type: String,
		required: true
	},

	placeholder: {
		type: String,
		default: ''
	},

	disabled: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},

	hasIconItems: {
		// добавление иконок в список (иконки должны быть сохранены в отдельной папке с названием, идентичным props.name, и называться соответственно айтему)
		type: Boolean,
		default: false
	},
	error: {
		type: [String, Boolean],
		default: ''
	},
	required: {
		type: Boolean,
		default: false
	},
	// Для селектов, название иконки должно быть идентично значению селекта
	hasValueIcon: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['update:model-value']);

const model = computed<string>({
	get() {
		innerModel.value = props.modelValue;

		return props.modelValue ? (props.modelValue as string) : '';
	},
	set(value) {
		emit('update:model-value', value);

		return value;
	}
});
const innerModel = ref<string>('');

const onOpen = () => {
	innerModel.value = props.modelValue;
};

const clearModel = () => {
	model.value = '';
};
</script>

<template>
	<DialogRoot>
		<DialogTrigger class="mobile-filter">
			<CommonUiBaseInput
				v-model="model"
				:name="name"
				:disabled="disabled"
				:placeholder="placeholder"
				:error="error"
				:required="required"
				:input-readonly="true"
				icon-name="container"
				:has-value-icon="hasValueIcon"
				:mobile-select="true"
			/>
		</DialogTrigger>
		<LibraryUiModalDownsheetContent @open-auto-focus="onOpen">
			<div class="mobile-select">
				<DialogTitle>
					<h2 class="mobile-select__title">{{ $t(`home.filter.${title}.title`) }}</h2>
				</DialogTitle>
				<VisuallyHidden
					v-if="!description"
					as-child
				>
					<DialogDescription />
				</VisuallyHidden>
				<DialogDescription v-else>{{ description }}</DialogDescription>

				<ul class="mobile-select__list list">
					<li
						v-for="(item, key) in options"
						:key="key"
					>
						<CommonUiRowSelectItem
							v-model="innerModel"
							:label="item['label'] ?? item"
							:value="item['value'] ?? item"
							class="list__item"
						/>
					</li>
				</ul>

				<div class="mobile-select__buttons buttons">
					<DialogClose as-child>
						<CommonButton
							button-kind="success"
							class="buttons__item"
							:button-text="$t('global.button.apply')"
							@click="emit('update:model-value', innerModel)"
						>
						</CommonButton>
					</DialogClose>
					<DialogClose as-child>
						<CommonButton
							button-kind="warning"
							no-border
							:button-text="$t('global.button.reset')"
							class="buttons__item"
							@click="clearModel"
						>
						</CommonButton>
					</DialogClose>
				</div>
			</div>
		</LibraryUiModalDownsheetContent>
	</DialogRoot>
</template>

<style lang="less" scoped>
.mobile-select {
	width: 100%;
	padding: 20px var(--padding-side);
	margin: auto auto 0;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;

	&__title {
		font-size: var(--font-size-L);
		margin-bottom: var(--space-subsections);
	}

	&__list {
		max-height: 200px;
		overflow-y: scroll;
		margin-bottom: var(--space-subsections);
		margin-left: calc(-1 * var(--padding-side));
		margin-right: calc(-1 * var(--padding-side));
	}
	.list {
		&__item {
			padding: 8px var(--padding-side);
		}

		&__icon {
			min-width: 24px;
			margin-left: 10px;
		}

		&__input {
			appearance: none;
		}
	}
}
.buttons {
	width: 100%;
	display: flex;
	flex-direction: column;

	&__item:not(:last-child) {
		align-self: stretch;
		margin-bottom: 12px;
	}
}
</style>
