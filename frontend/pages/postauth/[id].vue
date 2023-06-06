<script setup lang="ts">
import { UserInfo } from '../../../common/types/user';
import { getToken, getUserInfoByToken } from '~/services/auth';
import { RouteNameEnum } from '~/constants/enums/route';

const route = useRoute();
const eventId = route.params.id as string;
const user = useCookie<UserInfo | null>('user');
const tokenCookie = useCookie<string>('token');
try {
	const token = await getToken(eventId);
	if (token) {
		tokenCookie.value = token as string;

		user.value = (await getUserInfoByToken(token)) as UserInfo;

		navigateTo({name: RouteNameEnum.HOME});
	}
} catch (e) {
	console.log(e);
}
</script>

<template>
	<main></main>
</template>

<style lang="less" scoped></style>
