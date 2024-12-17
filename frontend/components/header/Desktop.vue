<script setup lang="ts">
import { useUserStore } from '../../stores/user.store';
import { RoutePathEnum } from '~/constants/enums/route';

const userStore = useUserStore();
</script>

<template>
	<HeaderUiWrapper>
		<template #left>
			<HeaderUiLogo />
		</template>
		<template #center>
			<HeaderNavigationMain />
		</template>

		<template #right>
			<HeaderUiCreateButton />
			<HeaderLanguageSelector />

			<CommonButton
				:link="RoutePathEnum.USER_PAGE"
				button-kind="ordinary"
				icon-name="user"
				icon-color="var(--color-text-main)"
				:button-text="
					userStore.isAuthorized
						? $t('header.navigation.user')
						: $t('header.navigation.authorize')
				"
			/>
		</template>
	</HeaderUiWrapper>
</template>
