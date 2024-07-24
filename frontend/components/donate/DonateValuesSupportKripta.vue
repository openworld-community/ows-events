<script setup lang="ts">
import type { DonateValuesData } from './DonateData';
defineProps<DonateValuesData>();

const { copy, copied } = useClipboard({ source: '', legacy: true });
</script>

<template>
	<li class="supportKripta">
		<div class="supportKripta__lable">
			<div class="supportKripta__icon-wrapper">
				<CommonIcon
					:name="`donate/${icon}`"
					name="donate/bitcoin"
					class="supportKripta__icon"
					color="var(--color-white)"
					width="48px"
					height="48px"
				/>
			</div>

			<p class="supportKripta__name">{{ $t(method) }}</p>
		</div>

		<div class="supportKripta__button">
			<CommonButton
				button-kind="text"
				:button-text="!copied ? $t('global.button.copy') : $t('global.button.copied')"
				icon-name="copy"
				@click="copy(account)"
			/>
		</div>
	</li>
</template>

<style lang="less" scoped>
.supportKripta {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
	background-color: #f5f5f5;
	border-radius: 8px;
	height: 76px;

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
		//background-color: var(--color-donate-usdt);

		margin-right: var(--space-related-items);
	}

	&__button {
		margin-right: 20px;
	}
}
</style>
