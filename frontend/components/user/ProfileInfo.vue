<script setup>
import { useUserStore } from '~/stores/user.store';
import { getUserName } from '~/utils/user';
import { SeoItempropUserEnum } from '~/constants/enums/seo';

const userStore = useUserStore();

//const userData = userStore.userInfo;
const userData = computed(() => userStore.userInfo);
</script>

<template>
	<div class="user-info">
		<h1
			:itemprop="SeoItempropUserEnum.name"
			class="user-info__name"
		>
			{{ `${getUserName(userData?.first_name, userData?.last_name)}!` }}
		</h1>
		<p
			v-if="userData?.nickname"
			class="user-info__nickname"
			:itemprop="SeoItempropUserEnum.nickname"
		>
			{{ `@${userData?.nickname}` }}
		</p>
		<p
			v-if="userData?.company"
			class="user-info__organizer"
			:itemprop="SeoItempropUserEnum.company"
		>
			{{ userData?.company }}
		</p>
	</div>
</template>
<style scoped lang="less">
.user-info {
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-bottom: 8px;

	@media (min-width: 768px) {
		margin-right: 30px;
		padding-left: 18px;
		margin-bottom: 12px;
	}

	@media (min-width: 1440px) {
		padding-top: 18px;
		padding-left: 18px;
		margin-bottom: 12px;
	}

	&__name {
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
		line-height: 24px;
		margin-bottom: 6px;
		width: 100%;
		white-space: normal;
		overflow: hidden;

		@media (min-width: 768px) {
			font-size: var(--font-size-L);
			margin-bottom: 8px;
		}
	}

	&__nickname {
		font-size: var(--font-size-S);
		line-height: 20px;
		color: var(--color-text-secondary);

		&:not(:last-child) {
			margin-bottom: 6px;
		}

		@media (min-width: 1440px) {
			font-size: var(--font-size-XS);
			line-height: 20px;
			margin-bottom: 8px;
		}
	}

	&__organizer {
		font-size: var(--font-size-S);
		line-height: 16px;

		@media (min-width: 1440px) {
			font-size: var(--font-size-XS);
			line-height: 16px;
		}
	}
}
</style>
