<script setup lang="ts">
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
	<li class="support">
		<div class="support__header">
			<CommonIcon
				:name="`donate/${icon}`"
				class="support__icon"
				color="var(--color-white)"
				width="32px"
				height="29px"
			/>

			<h3 class="support__name">{{ $t(method) }}</h3>
		</div>

		<div class="support__button">
			<p>Поддержать на {{ $t(method) }}</p>

			<CommonButton
				button-kind="success"
				:link="link"
				:is-external-link="link ? true : null"
				:button-text="$t('global.button.follow')"
				class="support__button-style"
			/>
		</div>
	</li>
</template>

<style lang="less" scoped>
.support {
	width: 351px;
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
