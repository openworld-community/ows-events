<script setup lang="ts">
import { TOKEN_MAX_AGE_SECONDS } from '../../constants/defaultValues/time';
import type { UserCookie } from '../../../common/types/user';
import { CookieNameEnum } from '../../constants/enums/common';
import { RoutePathEnum } from '~/constants/enums/route';
import { type LoginType, useSendTrackingEvent } from '../../composables/useSendTrackingEvent';

defineI18nRoute(false);

// in cookie ru variable wishould get from i18n locale.value
const langCookie = useCookie(CookieNameEnum.LOCALE);
const localePath = useLocalePath();

definePageMeta({
	layout: false,
	middleware: async (to) => {
		const userToken = getFirstParam(to.params.id);
		const trackEvent = useSendTrackingEvent();
		if (to.query.method)
			trackEvent.sendAnalytics.login({ method: to.query.method } as LoginType);
		useCookie<string>(CookieNameEnum.TOKEN, { maxAge: TOKEN_MAX_AGE_SECONDS }).value =
			userToken;
		const { data: user } = await apiRouter.user.get.useQuery({ data: { userToken } });
		if (!user.value) {
			console.error('No user data retrieved');
			return;
		}
		useCookie<UserCookie | null>(CookieNameEnum.TG_USER, {
			maxAge: TOKEN_MAX_AGE_SECONDS
		}).value = user.value;
	}
});
onBeforeMount(async () => {
	const pathToRedirect = useCookie('redirectPath');
	//path contain en or ru variable - locale path not needed
	pathToRedirect?.value
		? navigateTo(pathToRedirect.value)
		: navigateTo(localePath(RoutePathEnum.USER_PAGE));

	pathToRedirect.value = '';
});
</script>
<template>
	<div />
</template>
