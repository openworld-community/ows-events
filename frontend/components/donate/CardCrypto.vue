<script setup lang="ts">
import type { DataDonateCrypto } from './DonateData';
import {
	SeoItempropDonateEnum,
	SeoItemTypeEnum,
	SeoItempropGlobalEnum
} from '../../constants/enums/seo';
defineProps<DataDonateCrypto>();

const { copy, copied } = useClipboard({ source: '', legacy: true });
</script>

<template>
	<li
		class="card"
		itemscope
		:itemtype="SeoItemTypeEnum.DONATE_METHOD"
		:itemprop="SeoItempropDonateEnum.METHOD"
	>
		<div class="card__label">
			<div class="card__icon-wrapper">
				<CommonIcon
					:name="`donate/${icon}`"
					class="card__icon"
					color="var(--color-white)"
					width="48px"
					height="48px"
				/>
			</div>

			<p
				class="card__name text1"
				:itemprop="SeoItempropGlobalEnum.DESCRIPTION"
			>
				{{ $t(method) }}
			</p>
		</div>

		<div class="card__button">
			<CommonButton
				button-kind="text"
				:button-text="!copied ? $t('global.button.copy') : $t('global.button.copied')"
				icon-name="copy"
				:itemprop="SeoItempropDonateEnum.LINK"
				@click="copy(account)"
			/>
		</div>
	</li>
</template>

<style lang="less" scoped>
.card {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #f5f5f5;
	border-radius: 8px;
	height: 76px;
	@media (min-width: 768px) {
		width: 100%;
		max-width: 740px;
		align-self: center;
	}

	@media (min-width: 1440px) {
		width: 45%;
	}

	&__label {
		display: flex;
		align-items: center;
		margin-left: 15px;
	}

	&__icon-wrapper {
		display: flex;
		width: 48px;
		height: 48px;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: v-bind('color');
		margin-right: var(--space-related-items);
	}

	&__button {
		margin-right: 20px;
	}
}
</style>
