<script setup lang="ts">
import { RouteNameEnum } from '~/constants/enums/route';
import type { UserInfo } from '../../../common/types/user';

const route = useRoute();
const userID = getFirstParam(route.params.id);
const userCookie = useCookie<UserInfo | null>('user');
const tokenCookie = useCookie<string>('token');
const { data: token } = await apiRouter.auth.getToken.useQuery({ data: { id: userID } });
if (!token.value) {
	console.error('No token retrieved');
} else {
	tokenCookie.value = token.value;
	const { data: user } = await apiRouter.auth.getUser.useQuery({
		data: { userToken: token.value }
	});
	if (!user.value) {
		console.error('No user data retrieved');
	} else {
		userCookie.value = user.value;
	}
}
await navigateTo({ name: RouteNameEnum.HOME });
</script>

<template>
	<main></main>
</template>
