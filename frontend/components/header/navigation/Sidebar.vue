<script setup lang="ts">
import { RoutePathEnum } from '@/constants/enums/route';
import { SUPPORT_TG_URL } from '../../../constants/url';
import { useUserStore } from '../../../stores/user.store';
import { RouteNameEnum } from '../../../constants/enums/route';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';

const localePath = useLocalePath();

const mobile = inject('mobile');
const emit = defineEmits(['close']);
const route = useRoute();
const userStore = useUserStore();

const {
	open: openNeedAuthorizeModal,
	close: closeNeedAuthorizeModal,
	patchOptions: needAuthorizeModalPatch
} = useModal({ component: NeedAuthorize });
needAuthorizeModalPatch({ attrs: { closeNeedAuthorizeModal } });

const onButtonClick = async () => {
	if (userStore.isAuthorized) {
		await navigateTo(localePath(`${RoutePathEnum.EVENT_EDIT}new`));
	} else {
		await openNeedAuthorizeModal();
	}
};
</script>

<template>
	<div
		class="navigation"
		role="navigation"
	>
		<ul>
			<HeaderSidebarItem
				v-if="getRouteName(route.name as string) !== RouteNameEnum.AUTH"
				:link-to="localePath(RoutePathEnum.USER_PAGE)"
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
				v-if="mobile"
				:text="$t('global.button.create_event')"
				icon-name="edit"
				@click="onButtonClick"
			/>

			<HeaderSidebarItem
				:link-to="localePath(RoutePathEnum.ABOUT)"
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
				component-type="link"
				:link-to="localePath(RoutePathEnum.COOPERATION)"
				:text="$t('header.navigation.cooperation')"
				icon-name="cooperation"
				:current="getRouteName(route.name as string) === RouteNameEnum.COOPERATION"
				@click="emit('close')"
			/>

			<HeaderSidebarItem
				:link-to="localePath(RoutePathEnum.DONATION)"
				:text="$t('header.navigation.donation')"
				icon-name="donate"
				@click="emit('close')"
			/>

			<HeaderSidebarItem
				:link-to="localePath(RoutePathEnum.LIMITATION_OF_LIABILITY)"
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
		<!--              src="@/assets/img/icons/edit.svg"-->
		<!--              width="24"-->
		<!--              height="24"-->
		<!--              :alt="translate('event.button.edit')"-->
		<!--            />-->
		<!--            <img-->
		<!--              src="@/assets/img/icons/share.svg"-->
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
