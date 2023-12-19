<script setup lang="ts">
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useFilterStore } from '../../stores/filter.store';

const filterStore = useFilterStore();
const props = defineProps({
	filterType: {
		type: String,
		required: true
	},
	filterList: {
		type: Array as PropType<string[] | { [key: string]: string }[]>,
		required: true
	},
	multiply: {
		type: Boolean,
		required: true
	},
	returnKey: {
		// для объектов: ключ значения, которое нужно возвращать
		type: String,
		default: ''
	},
	showKey: {
		// для объектов: ключ значения, которое нужно показывать в списке
		type: String,
		default: ''
	}
});

const closeModal = () => filterStore.$patch({ modal: { show: false } });
const model = ref<string | string[]>(
	filterStore?.filters[props.filterType as keyof (typeof filterStore)['filters']]
		? filterStore?.filters[props.filterType]
		: props.multiply
		? []
		: ''
);

const updateFilter = () => {
	filterStore.$patch({ filters: { [props.filterType]: model.value } });
	closeModal();
};
const resetFilter = () => {
	filterStore.$patch({ filters: { [props.filterType]: props.multiply ? [] : '' } });
	model.value = props.multiply ? [] : '';
	closeModal();
};
</script>

<template>
	<VueFinalModal
		v-model="filterStore.modal.show"
		:hide-overlay="false"
		overlay-transition="vfm-fade"
		overlay-transition-duration="2600"
		content-transition="vfm-fade"
		swipe-to-close="down"
		:click-to-close="true"
		:esc-to-close="true"
		:lock-scroll="true"
		content-class="filter-modal"
		@closed="closeModal"
	>
		<div class="filter-modal__wrapper">
			<h2 class="filter-modal__title">{{ $t(`home.filter.${filterType}.title`) }}</h2>

			<ul
				v-if="filterList"
				class="filter-modal__list list"
			>
				<li
					v-for="(item, key) in filterList"
					:key="key"
				>
					<CommonUiRowSelectItem
						v-model="model"
						:label="item[showKey] ?? item"
						:value="item[returnKey] ?? item"
						:multiply="multiply"
						class="list__item"
					/>
				</li>
			</ul>

			<div class="filter-modal__buttons buttons">
				<CommonButton
					button-kind="success"
					:button-text="$t('global.button.apply')"
					class="buttons__item"
					@click="updateFilter"
				/>
				<CommonButton
					button-kind="warning"
					:button-text="$t('global.button.reset')"
					class="buttons__item"
					@click="resetFilter"
				/>
			</div>
		</div>
	</VueFinalModal>
</template>

<style lang="less" scoped>
.filter-modal {
	&__wrapper {
		width: 100vw;
		background-color: var(--color-white);
		padding: 20px var(--padding-side);
		margin: auto auto 0;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	&__title {
		font-size: var(--font-size-L);
		margin-bottom: var(--space-subsections);
	}
}

.list {
	max-height: 200px;
	overflow-y: auto;
	margin-bottom: var(--space-subsections);
	margin-left: calc(-1 * var(--padding-side));
	margin-right: calc(-1 * var(--padding-side));

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
	display: flex;
	flex-direction: column;

	&__item:not(:last-child) {
		margin-bottom: 12px;
	}
}
</style>
