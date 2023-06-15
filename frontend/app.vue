<script lang="ts" setup>
import './assets/less/app.less';
import 'vue-final-modal/style.css';
import 'virtual:svg-icons-register';
import { useLocationStore } from './stores/location.store';
import { ModalsContainer } from 'vue-final-modal';
import { LOCATION_API_URL } from './constants/url';
import type { UserLocation } from '../common/types/location';

const { $translate } = useNuxtApp();

useHead({
	//TODO доработать метаданные
	title: $translate('meta.title'),
	meta: [{ name: 'Афиша переделано', content: 'Это площадка для поиска мероприятий' }]
});
const { data } = await useFetch(LOCATION_API_URL, {
	transform: (data: {
		location: { city: string; country: { code: string; name: string } };
	}): UserLocation => {
		return {
			code: data.location.country.code,
			city: data.location.city,
			country: data.location.country.name
		};
	}
});
await useLocationStore().init(data.value ?? {});
</script>
<template>
	<HeaderCommon />
	<main class="main">
		<ModalsContainer />
		<NuxtPage />
	</main>
</template>

<style lang="less" scoped>
.main {
	height: 100%;
	padding-top: var(--header-height);
}
</style>
