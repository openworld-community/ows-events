<script setup lang="ts">
import { RoutePathEnum } from '@/constants/enums/route';
import { SUPPORT_TG_URL } from '../../../constants/url';
import { useUserStore } from '../../../stores/user.store';
import { RouteNameEnum } from '../../../constants/enums/route';

const emit = defineEmits(['close']);
const route = useRoute();
const userStore = useUserStore();
const localePath = useLocalePath();
</script>

<template>
	<div
		class="navigation"
		role="navigation"
	>
		<ul>
			<HeaderSidebarItem
				component-type="link"
				:link-to="localePath(RoutePathEnum.USER_PAGE)"
				:text="
					userStore.isAuthorized
						? $t('header.navigation.user')
						: $t('header.navigation.authorize')
				"
				:item-kind="userStore.isAuthorized ? 'success' : ''"
				icon-name="user"
				:current="getRouteName(route.name as string) === RouteNameEnum.USER_PAGE"
				@click="emit('close')"
			/>

			<HeaderSidebarItem
				component-type="link"
				:link-to="localePath(RoutePathEnum.ABOUT)"
				:text="$t('header.navigation.about')"
				icon-name="info"
				:current="getRouteName(route.name as string) === RouteNameEnum.ABOUT"
				@click="emit('close')"
			/>

			<HeaderSidebarItem
				component-type="link"
				:link-to="SUPPORT_TG_URL"
				:text="$t('header.navigation.support')"
				is-external-link
				icon-name="contact-tg"
				@click="emit('close')"
			/>

			<HeaderSidebarItem
				component-type="link"
				:link-to="localePath(RoutePathEnum.DONATION)"
				:text="$t('header.navigation.donation')"
				icon-name="donate"
				:current="getRouteName(route.name as string) === RouteNameEnum.DONATION"
				@click="emit('close')"
			/>

			<HeaderSidebarItem
				component-type="link"
				:link-to="localePath(RoutePathEnum.LIMITATION_OF_LIABILITY)"
				:text="$t('header.navigation.limitation_of_liability')"
				icon-name="privacy"
				:current="getRouteName(route.name as string) === RouteNameEnum.LIMITATION_OF_LIABILITY"
				@click="emit('close')"
			/>
		</ul>

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
	</div>
</template>

<style scoped lang="less">
.navigation {
	display: flex;
	width: max-content;
	flex-direction: column;
	align-items: flex-end;
	position: absolute;
	top: -10px;
	right: 0;
	background-color: var(--color-white);
	box-shadow: var(--shadow-sidebar);
	border-radius: 6px;

	transition: transform 0.3s ease;
	transform: translateY(var(--header-height));
}
</style>
