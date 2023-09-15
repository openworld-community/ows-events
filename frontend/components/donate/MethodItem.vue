<script setup lang="ts">
import { SeoItempropDonateEnum, SeoItemTypeEnum } from '../../constants/enums/seo';

const props = defineProps({
	method: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: true
	},
	link: {
		type: String,
		default: ''
	},
	copyData: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		required: true
	}
});

const { copy, copied } = useClipboard({ source: props.copyData, legacy: true });
</script>

<template>
	<li
		class="method"
		itemscope
		:itemtype="SeoItemTypeEnum.DONATE_METHOD"
		:itemprop="SeoItempropDonateEnum.METHOD"
	>
		<div class="method__name-wrapper">
			<div class="method__icon-wrapper">
				<CommonIcon
					:name="`donate/${icon}`"
					class="method__icon"
					color="var(--color-white)"
				/>
			</div>
			<h3 class="method__name">{{ method }}</h3>
		</div>
		<CommonButton
			button-kind="text"
			:link="link ? link : null"
			:is-external-link="link ? true : null"
			:button-text="
				link
					? $t('global.button.follow')
					: !copied
					? $t('global.button.copy')
					: $t('global.button.copied')
			"
			:icon-name="link ? 'arrow-right' : 'copy'"
			:itemprop="SeoItempropDonateEnum.LINK"
			@click="link ? null : copy(copyData)"
		/>
	</li>
</template>

<style scoped lang="less">
.method {
	display: flex;
	height: 45px;
	justify-content: space-between;
	align-items: center;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-input-field);
	}

	&__name-wrapper {
		display: flex;
		align-items: center;
	}

	&__icon-wrapper {
		display: flex;
		width: 32px;
		height: 32px;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: v-bind('color');
		margin-right: var(--space-related-items);
	}

	&__name {
		font-size: var(--font-size-S);
		font-weight: var(--font-weight-regular);
		line-height: 20px;
	}

	&__button {
		display: flex;
		align-items: center;
		padding: var(--space-related-items) 12px;

		&-icon {
			margin-right: var(--space-related-items);
		}
	}
}
</style>
