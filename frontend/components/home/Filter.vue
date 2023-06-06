<script setup lang="ts">
import { useLocationStore } from '~/stores/location.store';
import { storeToRefs } from 'pinia';
import { useEventsStore } from '~/stores/events.store';

const locationStore = useLocationStore();
locationStore.loadCountries();
const { countries, cities, pickedCountry, pickedCity } = storeToRefs(locationStore);

const eventsStore = useEventsStore();
const { country, city } = storeToRefs(eventsStore);

locationStore.pickCountry(pickedCountry.value);

watch(pickedCountry, () => {
	city.value = pickedCity.value;
});

watch(country, (_country) => {
	locationStore.pickCountry(_country);
	city.value = pickedCity.value;
	debounce(eventsStore.loadPosterEvents);
});

watch(city, (_city) => {
	locationStore.pickCity(_city);
	debounce(eventsStore.loadPosterEvents);
});
</script>

<template>
	<section class="filter">
		<CommonInput
			v-model="country"
			class="filter__field"
			input-type="datalist"
			input-name="country"
			:input-placeholder="$translate('global.country')"
			:options-list="countries"
		/>
		<CommonInput
			:key="country"
			v-model="city"
			:input-disabled="!country"
			class="filter__field"
			input-type="datalist"
			input-name="city"
			:input-placeholder="$translate('global.city')"
			:options-list="cities"
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
