<script setup lang="ts">
import { useLocationStore, type City, type Country } from '@/stores/location.store';

const route = useRoute();
const { translate } = useTranslation();
const props = defineProps<{ city: City; country: Country }>();
const emit = defineEmits<{
	'update:city': [city: typeof props.city];
	'update:country': [country: typeof props.country];
}>();

const locationStore = useLocationStore();

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
</script>

<template>
	<section class="filter">
		<CommonUiBaseSelect
			class="filter__field"
			name="country"
			:placeholder="translate('global.country')"
			:list="locationStore.usedCountries"
			:model-value="country"
			@update:model-value="updateCountry"
		/>
		<CommonUiBaseSelect
			class="filter__field"
			name="city"
			:placeholder="translate('global.city')"
			:list="locationStore.getUsedCitiesByCountry(country) ?? []"
			:disabled="!country"
			:model-value="city"
			dropdown-position="right"
			@update:model-value="updateCity"
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
