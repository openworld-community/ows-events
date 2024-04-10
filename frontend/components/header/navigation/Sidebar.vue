<script setup lang="ts">
import { RoutePathEnum } from '@/constants/enums/route';
import { SUPPORT_TG_URL } from '../../../constants/url';
import { useUserStore } from '../../../stores/user.store';
import { RouteNameEnum } from '../../../constants/enums/route';

const mobile = inject('mobile');
const emit = defineEmits(['close']);
const route = useRoute();
const userStore = useUserStore();
</script>

<template>
	<div
		class="navigation"
		role="navigation"
	>
		<ul>
			<HeaderSidebarItem
				v-if="getRouteName(route.name as string) !== RouteNameEnum.AUTH"
				:link-to="RoutePathEnum.USER_PAGE"
				:text="
					userStore.isAuthorized
						? $t('header.navigation.user')
						: $t('header.navigation.authorize')
				"
				:item-kind="userStore.isAuthorized ? 'success' : ''"
				icon-name="user"
				@click="emit('close')"
			/>
			<HeaderSidebarItem
				v-if="userStore.isAuthorized && mobile"
				:link-to="`${RoutePathEnum.EVENT_EDIT}new`"
				:text="$t('global.button.create_event')"
				icon-name="edit"
				@click="emit('close')"
			/>

			<LibraryAlert
				v-if="mobile&&!userStore.isAuthorized && getRouteName(route.name as string) !== RouteNameEnum.AUTH"
				:description-text="$t('modal.need_authorize_modal.title')"
				:link="`${RoutePathEnum.EVENT_EDIT}new`"
				confirm-button-text="global.button.authorize"
				cancel-button-text="global.button.close"
			>
				<HeaderSidebarItem
					:text="$t('global.button.create_event')"
					icon-name="edit"
				/>
			</LibraryAlert>

			<HeaderSidebarItem
				:link-to="RoutePathEnum.ABOUT"
				:text="$t('header.navigation.about')"
				icon-name="info"
				@click="emit('close')"
			/>

			<HeaderSidebarItem
				:link-to="SUPPORT_TG_URL"
				:text="$t('header.navigation.support')"
				is-external-link
				icon-name="contact-tg"
				@click="emit('close')"
			/>

			<HeaderSidebarItem
				:link-to="RoutePathEnum.DONATION"
				:text="$t('header.navigation.donation')"
				icon-name="donate"
				@click="emit('close')"
			/>

			<HeaderSidebarItem
				:link-to="RoutePathEnum.LIMITATION_OF_LIABILITY"
				:text="$t('header.navigation.limitation_of_liability')"
				icon-name="privacy"
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

	@media (min-width: 768px) {
		top: -45px;
		right: 0;
	}
}
</style>
