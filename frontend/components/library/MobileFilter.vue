<script setup lang="ts">
import type { RoutePathEnum } from '~/constants/enums/route';
const localePath = useLocalePath();

const props = defineProps({
	placeholder: {
		type: String,
		default: ''
	},
	currentText: {
		type: String,
		default: ''
	},
	options: {
		type: [Array, String, Set] as PropType<
			string | string[] | { [key: string]: string }[] | Set<string>
		>,
		required: true
	},
	path: {
		type: String as PropType<RoutePathEnum>,
		required: true
	},

	disabled: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},

	hasIconItems: {
		// добавление иконок в список (иконки должны быть сохранены в отдельной папке с названием, идентичным props.name, и называться соответственно айтему)
		type: Boolean,
		default: false
	},

	// Для селектов, название иконки должно быть идентично значению селекта
	hasValueIcon: {
		type: Boolean,
		default: false
	}
});

const innerModel = ref<string>('');

const clearModel = () => {
	innerModel.value = '';
};

const navigate = (to: string) => {
	navigateTo(localePath({ path: `${props.path}/${transformToQuery(to)}` }));
};
</script>

<template>
	<LibraryDownsheet :disabled="disabled">
		<template #trigger>
			<div
				class="mobile-filter__trigger-wrap"
				:data-placeholder="!!currentText === false"
			>
				<span class="mobile-filter__text">{{
					currentText ? currentText : placeholder
				}}</span>
				<CommonIcon
					name="container"
					color="var(--color-input-icons)"
				/>
			</div>
		</template>
		<template #content>
			<div class="mobile-filter__content">
				<DialogTitle>
					<h2 class="mobile-filter__title">{{ title }}</h2>
				</DialogTitle>

				<ul class="mobile-filter__list list">
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
							@click="navigate(innerModel)"
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
		</template>
	</LibraryDownsheet>
</template>

<style lang="less" scoped>
.mobile-filter {
	width: 100%;
	padding: 20px var(--padding-side);
	margin: auto auto 0;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;

	&__trigger-wrap {
		width: 100%;
		min-width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);

		border-radius: 8px;
		border: 2px black;
		color: var(--color-text-main);
		padding: 8px 12px 8px 12px;
	}

	&__trigger-wrap[data-placeholder='true'] {
		border-color: var(--color-dark);
		color: var(--color-input-icons);
	}

	&__trigger-wrap[data-placeholder='false'] {
		font-family: var(--font-family-main);
		//font-size: var(--font-size-M);
		color: var(--color-white);
		background-color: var(--color-dark);
	}

	&__content {
		width: 100%;
		padding: 20px var(--padding-side);
		margin: auto auto 0;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

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
