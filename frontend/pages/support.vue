<script setup lang="ts">
import { SUPPORT_TG_URL, SUPPORT_EMAIL_URL } from '~/constants/url';
</script>

<template>
	<div class="support">
		<div class="support__navigation">
			<div class="support__navigation__text">
				<div>{{ $t('support.title') }}</div>
				<div>{{ $t('support.message') }}</div>
			</div>

			<div class="support__navigation__buttons">
				<CommonButton
					:link="SUPPORT_EMAIL_URL"
					button-kind="ordinary"
					:button-text="$t('support.telegram')"
				/>
				<CommonButton
					isExternalLink
					:link="SUPPORT_TG_URL"
					icon-name="telegram"
					:button-text="$t('support.telegram')"
					class="button__success--filled"
					button-kind="success"
				/>
			</div>
		</div>
		<div class="support__design">
			<img
				class="support__design__image"
				src="./support.svg"
			/>
			<div class="support__design__question">{{ $t('support.question') }}</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.support {
	display: flex;
	align-self: center;
	align-items: center;
	justify-content: center;
	height: 100%;
	max-width: 1440px;
	&__navigation {
		width: 500px;
        &__text{
            padding-bottom: 100px;
        }
		&__buttons {
			display: flex;
			flex-direction: column;
			gap: 30px;
			width: 340px;
		}
	}

	&__design {
		display: flex;
		flex-direction: row;
		gap: 20px;
		padding: 30px 30px 30px 30px;
		&__image {
			width: 320px;
		}
		&__question {
			padding-bottom: 64px;
			align-self: flex-end;
			font-family: var(--font-family-error);
			font-size: 32px;
		}
	}
}
</style>
