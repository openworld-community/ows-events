<script setup lang="ts">
import { useFilterStore } from '../../stores/filter.store';

const route = useRoute();
const filterStore = useFilterStore();
const props = defineProps<{ city: City; country: Country }>();
const emit = defineEmits<{
	'update:city': [city: typeof props.city];
	'update:country': [country: typeof props.country];
}>();

const updateCountry = (country: typeof props.country) => {
	emit('update:country', country);
	props.city && emit('update:city', '');
};
const updateCity = (city: typeof props.city) => {
	emit('update:city', city);
};

watch(
	() => [props.country, props.city] as const,
	([country, city]) => {
		return navigateTo({
			query: { ...route.query, country: country || undefined, city: city || undefined }
		});
	}
);

// const showModal = ref(false); // это для примера, а актуальные данные есть в пропсах, так и продолжай все значения данных кидать через них
const filterType = ref(''); // это для примера, а актуальные данные есть в пропсах, так и продолжай все значения данных кидать через них
const filterList = ref<Set<string>>(new Set());

// provide('city', props.city);
// provide('country', props.country);
// provide('showModal', showModal);
// provide('filterType', filterType);
// provide('updateCity', updateCity); // просто провайдим имеющиеся ф-ии внутрь и дергаем их оттуда. Это будет явная передача функционала и обновление данных
// provide('updateCountry', updateCountry); // просто провайдим имеющиеся ф-ии внутрь и дергаем их оттуда. Это будет явная передача функционала и обновление данных
// provide('filterList', filterList)

const openFilterModal = async (type: string, list: Set<string>) => {
  filterList.value = await list;
	filterStore.$patch({ showModal: true });
	filterType.value = type;
};

watch(() => filterStore.country, () => filterStore.$patch({city: ''}))
</script>

<template>
	<section class="filter">
		<!--		<CommonUiBaseSelect-->
		<!--			class="filter__field"-->
		<!--			name="country"-->
		<!--			:placeholder="$t('global.country')"-->
		<!--			:list="filterStore.usedCountries"-->
		<!--			:model-value="country"-->
		<!--			:aria-label="$t('home.filter.aria_country')"-->
		<!--			@update:model-value="updateCountry"-->
		<!--		/>-->
		<!--		<CommonUiBaseSelect-->
		<!--			class="filter__field"-->
		<!--			name="city"-->
		<!--			:placeholder="$t('global.city')"-->
		<!--			:list="filterStore.getUsedCitiesByCountry(country) ?? []"-->
		<!--			:disabled="!country"-->
		<!--			:model-value="city"-->
		<!--			dropdown-position="right"-->
		<!--			:aria-label="$t('home.filter.aria_city')"-->
		<!--			@update:model-value="updateCity"-->
		<!--		/>-->

		<CommonButton
			class="filter__field"
			button-kind="filter"
			:filled="!!filterStore.country"
			:button-text="
				filterStore.country ? filterStore.country : $t('home.filter.country.button')
			"
			icon-name="container"
			@click="openFilterModal('country', filterStore.usedCountries)"
		/>

		<CommonButton
			class="filter__field"
			button-kind="filter"
			:filled="!!filterStore.city"
			:button-text="filterStore.city ? filterStore.city : $t('home.filter.city.button')"
			icon-name="container"
			:is-disabled="!filterStore.country"
			@click="
				openFilterModal(
					'city',
					filterStore.getUsedCitiesByCountry(filterStore.country) ?? []
				)
			"
		/>

		<HomeFilterModal
			:filter-list="filterList"
			:filter-type="filterType"
		/>
	</section>
</template>

<style scoped lang="less">
.filter {
	display: flex;

	&__field {
		&:not(:last-child) {
			margin-right: 15px;
		}
	}
}
</style>
