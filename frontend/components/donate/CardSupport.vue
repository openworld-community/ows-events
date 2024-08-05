<script setup lang="ts">
import {
	SeoItempropDonateEnum,
	SeoItemTypeEnum,
	SeoItempropGlobalEnum
} from '../../constants/enums/seo';
defineProps({
	method: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
	},

	icon: {
		type: String,
		required: true
	},

	color: {
		type: String,
		required: true
	}
});
</script>

<template>
	<li
		class="support"
		itemscope
		:itemtype="SeoItemTypeEnum.DONATE_METHOD"
		:itemprop="SeoItempropDonateEnum.METHOD"
	>
		<div class="support__header">
			<CommonIcon
				:name="`donate/${icon}`"
				class="support__icon"
				color="var(--color-white)"
				width="32px"
				height="29px"
			/>

			<h3
				class="support__name"
				:itemprop="SeoItempropGlobalEnum.TITLE"
			>
				{{ $t(method) }}
			</h3>
		</div>

		<div class="support__button">
			<h5 :itemprop="SeoItempropGlobalEnum.DESCRIPTION">
				{{ $t('donate.support_on') }} {{ $t(method) }}
			</h5>

			<CommonButton
				button-kind="success"
				:link="link"
				:is-external-link="link ? true : null"
				:button-text="$t('global.button.follow')"
				class="support__button-style"
				:itemprop="SeoItempropDonateEnum.LINK"
			/>
		</div>
	</li>
</template>

<style lang="less" scoped>
.support {
	@media (min-width: 765px) {
		width: 47%;
	}

	@media (min-width: 1440px) {
		width: 351px;
	}

	&__header {
		display: flex;
		align-items: center;
		background-color: v-bind('color');
		height: 56px;
		border-radius: 20px 20px 0 0;
		gap: 44px;
		padding-left: 62px;
	}

	&__name {
		font-size: var(--font-size-M);
		font-weight: var(--font-weight-regular);

		color: white;
	}

	&__button {
		height: 150px;
		padding: 30px 15px;

		background-color: #f5f5f5;
		margin-bottom: 40px;
	}

	&__button-style {
		width: 100px;
		margin-top: 30px;
	}
}
</style>
