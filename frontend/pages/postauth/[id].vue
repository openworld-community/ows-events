<script setup lang="ts">
import { TOKEN_MAX_AGE_SECONDS } from '../../constants/defaultValues/time';
import type { UserInfoWithId } from '../../../common/types/user';
import { CookieNameEnum } from '../../constants/enums/common';
import { RoutePathEnum } from '~/constants/enums/route';

defineI18nRoute(false);
const langCookie = useCookie(CookieNameEnum.LOCALE);
const localePath = useLocalePath();

definePageMeta({
	layout: 'profile',
	middleware: async (to) => {
		const userToken = getFirstParam(to.params.id);
		useCookie<string>(CookieNameEnum.TOKEN, { maxAge: TOKEN_MAX_AGE_SECONDS }).value =
			userToken;
		const { data: user } = await apiRouter.user.get.useQuery({ data: { userToken } });
		if (!user.value) {
			console.error('No user data retrieved');
			return;
		}
		useCookie<UserInfoWithId | null>(CookieNameEnum.TG_USER, {
			maxAge: TOKEN_MAX_AGE_SECONDS
		}).value = user.value;
	}
});
onBeforeMount(async () => {
	const pathToRedirect = useCookie('redirectPath');

	navigateTo(
		localePath(pathToRedirect.value || RoutePathEnum.USER_PAGE, langCookie.value ?? 'ru')
	);

	pathToRedirect.value = '';
});
</script>
<template>
	<div />
</template>
