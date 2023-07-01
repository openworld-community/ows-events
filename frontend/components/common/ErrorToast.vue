<script setup lang="ts">
defineProps<{ error: string }>();
</script>
<template>
	<div class="content">
		<CommonIcon
			name="error"
			:height="24"
			color="var(--color-alert-error)"
			class="item icon"
		/>
		<span class="item text">
			{{ error ?? 'UNEXPECTED ERROR' }}
		</span>
		<CommonIcon
			name="close"
			:width="25"
			class="item icon"
		/>
	</div>
</template>
<style lang="less" scoped>
.content {
	width: 343px;
	min-height: 64px;
	padding: 14px 14px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	background-color: var(--color-text-main);
	cursor: pointer;
}

.item {
	&:not(:last-child) {
		margin-right: 14px;
	}
}

.text {
	font-family: var(--font-family-main);
	font-size: var(--font-size-XS);
	line-height: 18px;
}

.icon {
	flex-shrink: 0;
}
</style>
<!-- unscoped to apply styles to toast wrapper. -->
<style>
.Vue-Toastification__toast--default.errorToast {
	padding: 0;
	box-shadow: hsla(0, 0%, 0%, 0.4) 0 2px 3px, hsla(0, 0%, 0%, 0.25) 0 4px 8px 3px;
	align-self: center;
	max-width: fit-content;
}
</style>
