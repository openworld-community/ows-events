<script setup lang="ts">
defineProps({
	method: {
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
	<li class="metod">
		<div class="method__name-wrapper">
			<div class="method__icon-wrapper">
				<CommonIcon
					:name="`donate/${icon}`"
					class="method__icon"
					color="var(--color-white)"
					width="32px"
					height="29px"
				/>
			</div>
			<h3 class="method__name">{{ $t(method) }}</h3>
		</div>
		<!-- 
		<div>
			<p>{{ $t(text) }}</p>
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
		</div>
        -->
	</li>
</template>

<style lang="less" scoped>
.method {
	&__name-wrapper {
		width: 100%;
		display: flex;
		align-items: center;

		background-color: v-bind('color');
		color: white;
		height: 56px;
		border-radius: 20px 20px 0 0;
		gap: 44px;
		padding-left: 62px;
	}

	&__name {
		font-size: var(--font-size-M);
		font-weight: var(--font-weight-regular);
		line-height: 24px;
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
