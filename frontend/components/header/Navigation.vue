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
		<NuxtLink
			v-if="route.name === RouteNameEnum.HOME"
			:to="{ name: RouteNameEnum.ABOUT }"
			class="navigation__item"
		>
			<CommonIcon
				name="info"
				:alt="$translate('component.header.about')"
			/>
		</NuxtLink>

		<HeaderAuthorisation
			v-if="route.name === RouteNameEnum.HOME"
			class="navigation__item"
		/>

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
	gap: 10px;

	&__item {
		margin-right: 10px;
		height: 100%;
		display: flex;

		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
