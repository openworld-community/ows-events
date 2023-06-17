<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';
import { SUPPORT_TG_URL } from '../../constants/url';

const route = useRoute();
</script>

<template>
	<nav
		v-if="route.name === RouteNameEnum.HOME"
		class="navigation"
		role="navigation"
		:aria-label="$translate('global.nav')"
	>
		<CommonButton
			:link="SUPPORT_TG_URL"
			is-external-link
			is-icon
			button-kind="ordinary"
			icon-name="contact-tg"
			:alt="$translate('component.header.support')"
		/>
		<CommonButton
			:link="{ name: RouteNameEnum.ABOUT }"
			is-icon
			icon-name="info"
			button-kind="ordinary"
			:alt="$translate('component.header.about')"
		/>

		<HeaderAuthorisation />

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
