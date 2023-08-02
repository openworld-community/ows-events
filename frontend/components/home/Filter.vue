<script setup lang="ts">
import { useFilterStore } from '../../stores/filter.store';
import UserLocation from './UserLocation.vue';

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

const filterType = ref('');
const filterList = ref<Set<string>>(new Set());

const updateSearchLine = (value: string) => {
  filterStore.$patch({searchLine: value})
}

const openFilterModal = async (type: string, list: Set<string>) => {
	filterList.value = await list;
	filterStore.$patch({ showModal: true });
	filterType.value = type;
};

// запись данных фильтров в query параметры
watch(
  () => [filterStore.country, filterStore.city, filterStore.searchLine] as const,
  ([country, city, search]) => {
    return navigateTo({
      query: { ...route.query, country: country || undefined, city: city || undefined, search: search || undefined  }
    });
  }
);

// очистка city при изменении country
watch(
	() => filterStore.country,
	() => filterStore.$patch({ city: '' })
);
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
    <CommonUiBaseInput
      class-name="filter__search"
      name="search"
      type="text"
      icon-name="search"
      :model-value="filterStore.searchLine"
      :placeholder="$t('global.search')"
      @update:model-value="updateSearchLine"
    />

		<UserLocation class="filter__location" />

		<div class="filter__fields">
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
		</div>
		<HomeFilterModal
			:filter-list="filterList"
			:filter-type="filterType"
		/>
	</section>
</template>

<style scoped lang="less">
.filter {
	display: flex;
	flex-direction: column;

  &__search {
    display: flex;
    width: 100%;
    margin-bottom: 36px;
  }

  &__location {
    display: flex;
    width: 100%;
    margin-bottom: var(--space-subsections);
  }

  &__fields {
    display: flex;
  }

	&__field {
		&:not(:last-child) {
			margin-right: 15px;
		}
	}
}
</style>
