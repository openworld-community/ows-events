<script setup lang="ts">
import { RouteNameEnum } from '../../constants/enums/route';
import { useUserStore } from '../../stores/user.store';
import { apiRouter } from '../../composables/useApiRouter';
import auth from '../../middleware/auth.global';

definePageMeta({ name: RouteNameEnum.USER_MY_EVENTS });
</script>

<template>
	<div>
		h1 Любимые
		<!--		<Component :page-name="RouteNameEnum.USER_MY_EVENTS" />-->
	</div>
</template>

<style scoped lang="less"></style>
