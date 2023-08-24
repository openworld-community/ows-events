<script setup lang="ts">
import { RouteNameEnum } from '../../constants/enums/route';

definePageMeta({ name: RouteNameEnum.USER_FAVOURITES});
</script>

<template>
	<div>
		h1 Мои мероприятия

		<Component :page-name="RouteNameEnum.USER_FAVOURITES"/>

	</div>

	url: http//www.lengrad.ru/api/${props.page_name}/events
</template>

<style scoped lang="less">

</style>