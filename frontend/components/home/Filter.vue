<script setup lang="ts">
import { useLocationStore, type City, type Country } from '~/stores/location.store';

const props = defineProps<{ city: City; country: Country }>();
const emit = defineEmits<{
	'update:city': [city: typeof props.city];
	'update:country': [country: typeof props.country];
}>();

const locationStore = useLocationStore();
function updateCountry(country: typeof props.country) {
	locationStore.loadCitiesByCountry(country);
	emit('update:country', country);
	emit('update:city', '');
}

locationStore.loadCountries();
</script>

<template>
	<section class="filter">
		<CommonInput
			class="filter__field"
			input-type="datalist"
			input-name="country"
			:input-placeholder="$translate('global.country')"
			:options-list="locationStore.countries"
			:model-value="country"
			@update:model-value="(value: typeof country) => updateCountry(value)"
		/>
		<CommonInput
			:input-disabled="!country"
			class="filter__field"
			input-type="datalist"
			input-name="city"
			:input-placeholder="$translate('global.city')"
			:options-list="locationStore.citiesByCountry.get(country)"
			:model-value="city"
			@update:model-value="(value: typeof city) => emit('update:city',value)"
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
