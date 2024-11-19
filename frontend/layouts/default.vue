<script setup>
import { RouteNameEnum } from '../constants/enums/route';
import { getRouteName } from '../utils';
const route = useRoute();
const mobile = inject('mobile');

const isMobileFooterVisible = computed(() => {
	const currentRouteName = getRouteName(route.name);
	if (
		currentRouteName === RouteNameEnum.HOME ||
		currentRouteName === RouteNameEnum.CITY ||
		currentRouteName === RouteNameEnum.COUNTRY
	) {
		return true;
	}
	return false;
});
</script>

<template>
	<div class="root">
		<HeaderCommon :has-back-button="getRouteName(route.name) === RouteNameEnum.EVENT" />
		<slot> </slot>

		<FooterCommon v-if="!mobile || (mobile && isMobileFooterVisible)" />
	</div>
</template>
