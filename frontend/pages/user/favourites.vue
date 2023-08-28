<script setup lang="ts">
import { RouteNameEnum } from '../../constants/enums/route';
import { useUserStore } from '../../stores/user.store';

definePageMeta({ name: RouteNameEnum.USER_MY_EVENTS });

const userStore = useUserStore();
const favouriteId = computed(() => userStore.favourites);
</script>

<template>
	<div class="favourites">
		<h1 class="favourites__title">{{ $t('user.favourites') }}</h1>
		<p
			v-if="!favouriteId"
			class="favourites__empty"
		>
			{{ $t('user.no_favourites') }}
		</p>
	</div>
</template>

<style scoped lang="less">
.favourites {
	padding: var(--padding-vertical) var(--padding-side);

	&__title {
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
		margin-bottom: var(--space-subsections);
		text-align: center;
	}

	&__empty {
		text-align: center;
		font-size: var(--font-size-S);
		color: var(--color-text-secondary);
	}
}
</style>