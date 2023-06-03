<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';

const route = useRoute();
</script>

<template>
	<nav
		class="navigation"
		role="navigation"
		:aria-label="$translate('global.nav')"
	>
		<CommonButton
			v-if="route.name === RouteNameEnum.HOME"
			:link="{ name: RouteNameEnum.ABOUT }"
			is-icon
			icon-name="info"
			:alt="$translate('component.header.about')"
		/>

		<HeaderAuthorisation v-if="route.name === RouteNameEnum.HOME" />

		<!--          <div-->
		<!--            v-if="route.name === 'event'"-->
		<!--            :aria-label="$translate('component.header.event.manage')"-->
		<!--          >-->
		<!--            <img-->
		<!--              src="@/assets/img/icon/edit.svg"-->
		<!--              width="24"-->
		<!--              height="24"-->
		<!--              :alt="$translate('event.button.edit')"-->
		<!--            />-->
		<!--            <img-->
		<!--              src="@/assets/img/icon/share.svg"-->
		<!--              width="24"-->
		<!--              height="24"-->
		<!--              :alt="$translate('global.button.share')"-->
		<!--            />-->
		<!--          </div>-->
	</nav>
</template>

<style scoped lang="less">
.navigation {
	display: flex;
	align-items: center;
}
</style>
