<script setup>
import { useUserStore } from '~/stores/user.store';
import { getUserName } from '~/utils/user';
import { SeoItempropUserEnum } from '~/constants/enums/seo';

const userStore = useUserStore();
const userData = userStore.userInfo;
</script>

<template>
	<div class="user-info">
		<h1 class="user-info__name">
			{{ $t('user.greeting') }},
			<span :itemprop="SeoItempropUserEnum.name">{{ `${getUserName()}!` }}</span>
		</h1>
		<p
			v-if="userData?.nickname"
			class="user-info__nickname"
			:itemprop="SeoItempropUserEnum.nickname"
		>
			{{ `@${userData?.nickname}` }}
		</p>
		<p class="user-info__password">********</p>
		<p
			v-if="userData?.company"
			class="user-info__organizer"
			:itemprop="SeoItempropUserEnum.company"
		>
			{{ userData?.company }}
		</p>
	</div>
</template>
<style>
.user-info {
	display: flex;
	width: 100%;

	flex-direction: column;
	padding-top: 18px;

	@media (min-width: 768px) {
		width: 40%;
		margin-right: 30px;
	}

	@media (min-width: 1440px) {
		width: 32%;
		padding-top: 44px;
	}

	&__name {
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
		line-height: 24px;
		margin-bottom: 6px;

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
