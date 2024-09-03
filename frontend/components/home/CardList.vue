<script setup lang="ts">
const mobile = inject('mobile');
const filterStore = useFilterStore();

import { countries as supportedCountries } from '../../../common/const/supportedCountries';

const { locale } = useI18n();

import { useFilterStore } from '~/stores/filter.store';
</script>
<template>
	<SearchCardsWrapper>
		<SearchLoader
			v-if="filterStore.loading"
			:size="mobile ? 'middle' : 'big'"
		/>
		<SearchHeading
			v-if="filterStore.filteredEvents && filterStore.filteredEvents.length !== 0"
			position="up"
			:title="`${$t('home.headings.up', {
				country: `${supportedCountries['RS'][locale]}`
			})}
			&nbsp;&nbsp;|&nbsp;&nbsp;
			 ${$t('home.headings.up', { country: `${supportedCountries['ME'][locale]}` })}`"
		/>
		<SearchNotFound
			v-if="
				!filterStore.loading &&
				filterStore.filteredEvents &&
				filterStore.filteredEvents.length === 0
			"
			:title="$t('event.filteredEvents.no_events_found')"
		/>
		<SearchEventCardsList :events="filterStore.filteredEvents ?? []" />
		<SearchHeading
			v-if="filterStore.filteredEvents && filterStore.filteredEvents.length !== 0"
			position="down"
			:title="`${$t('home.headings.down', {
				country: `${supportedCountries['RS'][locale]}`
			})}
			&nbsp;&nbsp;|&nbsp;&nbsp;
			 ${$t('home.headings.down', { country: `${supportedCountries['ME'][locale]}` })}`"
		/>
	</SearchCardsWrapper>
</template>
