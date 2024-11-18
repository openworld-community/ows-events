<script setup>
import { RouteNameEnum } from '../constants/enums/route';
import { getRouteName } from '../utils';
const route = useRoute();
const mobile = inject('mobile');
const tablet = inject('tablet');

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
		<HeaderMobile v-if="mobile" />
		<HeaderTablet v-if="tablet" />
		<HeaderDesktop v-if="!mobile && !tablet" />
		<slot> </slot>

		<FooterCommon v-if="!mobile || (mobile && isMobileFooterVisible)" />
	</div>
</template>
