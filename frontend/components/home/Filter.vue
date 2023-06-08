<script setup lang="ts">
import { useLocationStore } from '~/stores/location.store';
import { storeToRefs } from 'pinia';

const locationStore = useLocationStore();
await locationStore.loadCountries();
const { countries, cities, pickedCountry, pickedCity } = storeToRefs(locationStore);
</script>

<template>
	<section class="filter">
		<CommonInput
			class="filter__field"
			input-type="datalist"
			input-name="country"
			:input-placeholder="$translate('global.country')"
			:options-list="countries"
			:model-value="pickedCountry"
			@update:model-value="(value) => locationStore.pickCountry(value)"
		/>
		<CommonInput
			:key="pickedCountry"
			:input-disabled="!pickedCountry"
			class="filter__field"
			input-type="datalist"
			input-name="city"
			:input-placeholder="$translate('global.city')"
			:options-list="cities"
			:model-value="pickedCity"
			@update:model-value="(value) => locationStore.pickCity(value)"
		/>
	</section>
</template>

<style scoped lang="less">
.filter {
	display: flex;
	gap: 15px;

	&__field {
	}
}
</style>
