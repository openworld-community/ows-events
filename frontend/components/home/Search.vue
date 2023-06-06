<script setup lang="ts">
import { useEventsStore } from '~/stores/events.store';
import { storeToRefs } from 'pinia';

const route = useRoute();
const eventsStore = useEventsStore();
const { search } = storeToRefs(eventsStore);

const searchFromRoute = route.query.search?.toString();
search.value = searchFromRoute === 'None' ? '' : searchFromRoute || '';

watch(search, (_search) => {
	debounce(eventsStore.loadPosterEvents);
	navigateTo({ query: { ...route.query, search: _search || 'None' } });
});
</script>

<template>
	<CommonInput
		v-model="search"
		input-class="input is-info search-input"
		input-type="text"
		input-name="search"
		:input-placeholder="$translate('global.search')"
	/>
</template>

<style scoped lang="less"></style>
