<script setup lang="ts">
import { useLocationStore, type City, type Country } from '@/stores/location.store';

const props = defineProps<{ city: City; country: Country }>();
const emit = defineEmits<{
	'update:city': [city: typeof props.city];
	'update:country': [country: typeof props.country];
}>();

const locationStore = useLocationStore();
const updateCountry = (country: typeof props.country) => {
	emit('update:country', country);
	emit('update:city', '');
}
const updateCity = (city: typeof props.city) => {
	emit('update:city', city);
}
</script>

<template>
	<section class="filter">
    <CommonUiBaseSelect
      class="filter__field"
      name="country"
      :placeholder="$translate('global.country')"
      :list="locationStore.countries"
      :model-value="country"
      @update:model-value="updateCountry($event)"
    />
    <CommonUiBaseSelect
      class="filter__field"
      name="city"
      :placeholder="$translate('global.city')"
      :list="locationStore.getCitiesByCountry(country)"
      :disabled="!country"
      :model-value="city"
      @update:model-value="updateCity($event)"
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
