<script setup lang="ts">
import { RoutePathEnum } from '~/constants/enums/route';
import { TOKEN_MAX_AGE_SECONDS } from '../../constants/defaultValues/time';
import type { UserInfoWithId } from '../../../common/types/user';
import { CookieNameEnum } from '../../constants/enums/common';

defineI18nRoute(false);
const langCookie = useCookie(CookieNameEnum.LOCALE);
const localePath = useLocalePath();
definePageMeta({
	middleware: async (to, from) => {
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
navigateTo(localePath(RoutePathEnum.HOME, langCookie.value ?? 'ru'));
</script>
<template>
	<div />
</template>
