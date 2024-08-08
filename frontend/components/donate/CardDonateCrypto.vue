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
		class="donate-cripto"
		itemscope
		:itemtype="SeoItemTypeEnum.DONATE_METHOD"
		:itemprop="SeoItempropDonateEnum.METHOD"
	>
		<div class="donate-cripto__lable">
			<div class="donate-cripto__icon-wrapper">
				<CommonIcon
					:name="`donate/${icon}`"
					class="donate-cripto__icon"
					color="var(--color-white)"
					width="48px"
					height="48px"
				/>
			</div>

			<p
				class="donate-cripto__name"
				:itemprop="SeoItempropGlobalEnum.DESCRIPTION"
			>
				{{ $t(method) }}
			</p>
		</div>

		<div class="donate-cripto__button">
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
.donate-cripto {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
	background-color: #f5f5f5;
	border-radius: 8px;
	height: 76px;
	@media (min-width: 1440px) {
		width: 45%;
	}

	&__lable {
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
