<script setup lang="ts">
import { UserInfo } from '../../../common/types/user';
import { getToken, getUserInfoByToken } from '~/services/auth';

const route = useRoute();
const router = useRouter();
const eventId = route.params.id as string;
const user = useCookie<UserInfo | null>('user');
const tokenCookie = useCookie<string>('token');
try {
	const token = await getToken(eventId);
	if (token) {
		tokenCookie.value = token;

		const userInfo = await getUserInfoByToken(token);

		user.value = userInfo;

		router.push(`/`);
	}
} catch (e) {
	console.log(e);
}
</script>

<template>
	<main></main>
</template>

<style lang="less" scoped></style>
