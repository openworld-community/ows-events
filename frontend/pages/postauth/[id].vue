<script setup lang="ts">
import { RoutePathEnum } from '~/constants/enums/route';
import { TOKEN_MAX_AGE_SECONDS } from '../../constants/defaultValues/time';
import type { TGUserInfo } from '../../../common/types/user';
import { CookieNameEnum } from '../../constants/enums/common';

const localePath = useLocalePath();
const langCookie = useCookie(CookieNameEnum.LOCALE);
definePageMeta({
	middleware: async () => {
		console.log('ROUTE1');
		const route = useRoute();
		console.log('ROUTE', route);
		const userToken = getFirstParam(route.params.id);
		useCookie<string>(CookieNameEnum.TOKEN, { maxAge: TOKEN_MAX_AGE_SECONDS }).value =
			userToken;
		const { data: user } = await apiRouter.auth.getUser.useQuery({ data: { userToken } });
		if (!user.value) {
			console.error('No user data retrieved');
			return;
		}
		useCookie<TGUserInfo | null>(CookieNameEnum.TG_USER, {
			maxAge: TOKEN_MAX_AGE_SECONDS
		}).value = user.value;
	}
});
await navigateTo(localePath(RoutePathEnum.HOME, langCookie.value ?? 'ru'));
</script>
<template>
	<div />
</template>
