<script setup lang="ts">
definePageMeta({
	layout: 'profile'
});

const { t } = useI18n();
const mobile = inject('mobile');

getMeta({
	title: t('meta.user.info.title'),
	description: t('meta.user.info.description')
});

// const isGoBack = computed(() => {

// })
</script>

<template>
	<div class="user-content">
		<UserMobileNavigationMenu v-if="mobile">
			<UserAdditionalBlock />
		</UserMobileNavigationMenu>

		<UserAdditionalBlock v-if="!mobile" />
	</div>
</template>

<style scoped lang="less">
.user-content {
	width: 100%;
	height: 100%;
	@media (min-width: 768px) {
		flex-grow: 1;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
