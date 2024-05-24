<script setup>
import { RouteNameEnum } from '../constants/enums/route';
import { getRouteName } from '../utils';
const route = useRoute();
const mobile = inject('mobile');
</script>

<template>
	<div class="root">
		<HeaderCommon
			:has-back-button="
				getRouteName(route.name) === RouteNameEnum.EVENT ||
				(getRouteName(route.name) === RouteNameEnum.HOME && !!mobile)
			"
		/>
		<slot> </slot>

		<FooterCommon
			v-if="!mobile || (mobile && getRouteName(route.name) === RouteNameEnum.HOME)"
		/>
	</div>
</template>
