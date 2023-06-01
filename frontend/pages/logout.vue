<script setup lang="ts">
import { UserInfo } from '../../common/types/user';

const router = useRouter();
const user = useCookie<UserInfo | null>('user');
const tokenCookie = useCookie<string | null>('token');

user.value = null;
tokenCookie.value = null;

router.push(`/`);
</script>

<template>
	<main></main>
</template>

<style lang="less" scoped></style>
