<script setup lang="ts">
import { useLocationStore, type City, type Country } from '@/stores/location.store';

const route = useRoute();
const mobile = inject('mobile');
const props = defineProps<{ search: string; city: City; country: Country }>();
const emit = defineEmits<{
	'update:search': [search: typeof props.search];
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
	() => [props.search, props.country, props.city] as const,
	([search, country, city]) => {
		return navigateTo({
			query: {
				...route.query,
				search: search || undefined,
				country: country || undefined,
				city: city || undefined
			}
		});
	}
);
</script>

<template>
	<section class="filter">
		<CommonUiBaseInput
			class="filter__field filter__field--no-separator"
			name="search"
			type="text"
			icon-name="search"
			appearance="no-border"
			:model-value="search"
			:placeholder="$t('home.filter.search')"
			@update:model-value="(search: typeof search)=>emit('update:search', search)"
		/>
		<div class="filter__wrapper">
			<CommonUiBaseSelect
				class="filter__field"
				name="country"
				:placeholder="$t('global.country')"
				appearance="no-border"
				:list="locationStore.usedCountries"
				:model-value="country"
				:aria-label="$t('home.filter.aria_country')"
				@update:model-value="updateCountry"
			/>
			<CommonUiBaseSelect
				class="filter__field"
				name="city"
				:placeholder="$t('global.city')"
				appearance="no-border"
				:list="locationStore.getUsedCitiesByCountry(country) ?? []"
				:disabled="!country"
				:model-value="city"
				:dropdown-position="mobile ? 'right' : 'left'"
				:aria-label="$t('home.filter.aria_city')"
				@update:model-value="updateCity"
			/>
		</div>
	</section>
</template>

<style scoped lang="less">
.filter {
	display: flex;
	width: 100%;
	flex-direction: column;

	@media (min-width: 1440px) {
		max-width: calc(100% - 2 * var(--padding-side));
		flex-direction: row;
		align-items: center;
		background-color: var(--color-white);
		box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
		border-radius: 8px;

		&:deep(svg) {
			top: 25px;
		}

		&:deep(button) {
			top: 25px;
		}

		&:deep(input) {
			height: 72px;
		}
	}

	&__wrapper {
		display: flex;
		width: 100%;
		margin-top: 8px;

		@media (min-width: 1440px) {
			align-items: center;
			margin-top: 0;
		}
	}

	&__field {
		&:not(:last-child) {
			margin-right: 8px;

			@media (min-width: 1440px) {
				margin-right: 0;
			}
		}
	}
}

@media (min-width: 1440px) {
	// Добавление сепараторов
	.filter__field:not(.filter__field--no-separator)::before {
		//@media(min-width: 1440px) {
		width: 1px;
		content: '';
		background-color: var(--color-text-secondary);
		height: 80%;
		position: absolute;
		top: 10%;
		left: -1px;
		//}
	}

	// Скрытие сепараторов при фокусе (в т.ч. псевдоэлементов соседнего компонента)
	//если поле внутри имеет инпут в фокусе
	.filter__field:has(input:focus)::before,
		//если поле внутри имеет инпут в фокусе, а в разметке рядом есть еще одно поле
	.filter__field:has(input:focus) + .filter__field::before,
		//если поле внутри имеет инпут в фокусе, а в разметке рядом есть враппер с полями, то у первого child
	.filter__field:has(input:focus) + .filter__wrapper .filter__field:first-child::before,
		//если враппер имеет последнее child поле с инпутом в фокусе и рядом еще один враппер, то у первого child
	.filter__wrapper:has(.filter__field:last-child input:focus) + .filter__wrapper .filter__field:first-child::before,
		//если враппер имеет последнее child поле с инпутом в фокусе и рядом есть еще одно поле
	.filter__wrapper:has(.filter__field:last-child input:focus) + .filter__field::before
		//псевдоэлементы ::before становятся прозрачными
	{
		background-color: transparent;
	}

	//При добавлении компонентов четко соблюдать наименования классов и компоновку
}
</style>
