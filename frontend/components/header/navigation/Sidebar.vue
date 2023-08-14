<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';
import { SUPPORT_TG_URL } from '../../../constants/url';
import {SeoItemTypeEnum} from '../../../constants/enums/seo';

const emit = defineEmits(['close']);

const isAuthorized = inject<Ref<boolean>>('isAuthorized')
</script>

<template>
	<nav
		class="navigation"
		role="navigation"
		itemscope
		:itemtype="SeoItemTypeEnum.NAV"
	>
		<HeaderNavigationNavItem
			:link-to="{ name: RouteNameEnum.USER_PAGE }"
			:text="isAuthorized ? $t('header.user') : $t('header.authorize')"
			icon-name="user"
			@click="emit('close')"
		/>

		<HeaderNavigationNavItem
			:link-to="{ name: RouteNameEnum.ABOUT }"
			:text="$t('header.about')"
			icon-name="info"
			@click="emit('close')"
		/>

		<HeaderNavigationNavItem
			:link-to="SUPPORT_TG_URL"
			:text="$t('header.support')"
			is-external-link
			icon-name="contact-tg"
			@click="emit('close')"
		/>

    <HeaderNavigationNavItem
      :link-to="{name: RouteNameEnum.DONATION}"
      :text="$t('header.donation')"
      icon-name="donate"
      @click="emit('close')"
      />

		<HeaderNavigationNavItem
			:link-to="{ name: RouteNameEnum.LIMITATION_OF_LIABILITY }"
			:text="$t('header.limitation_of_liability')"
			icon-name="privacy"
			@click="emit('close')"
		/>

		<!--          <div-->
		<!--            v-if="route.name === 'event'"-->
		<!--            :aria-label="translate('modal.header.event.manage')"-->
		<!--          >-->
		<!--            <img-->
		<!--              src="@/assets/img/icon/edit.svg"-->
		<!--              width="24"-->
		<!--              height="24"-->
		<!--              :alt="translate('event.button.edit')"-->
		<!--            />-->
		<!--            <img-->
		<!--              src="@/assets/img/icon/share.svg"-->
		<!--              width="24"-->
		<!--              height="24"-->
		<!--              :alt="translate('global.button.share')"-->
		<!--            />-->
		<!--          </div>-->
	</nav>
</template>

<style scoped lang="less">
.navigation {
	display: flex;
	width: max-content;
	flex-direction: column;
	align-items: flex-end;
	position: absolute;
	top: 0;
	right: 0;
	background-color: var(--color-white);
	box-shadow: var(--shadow-sidebar);
	border-radius: 6px;

	transition: transform 0.3s ease;
	transform: translateY(var(--header-height));
}
</style>
