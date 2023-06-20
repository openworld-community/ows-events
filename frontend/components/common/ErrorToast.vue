<script setup lang="ts">
defineProps<{ error: string }>();
</script>
<template>
	<div :class="$style.content">
		<CommonIcon
			name="error"
			:height="24"
			color="var(--color-alert-error)"
			:class="$style.icon"
		/><span>
			{{ error ?? 'UNEXPECTED ERROR' }}
		</span>
		<CommonIcon
			name="close"
			:width="25"
			:class="$style.icon"
		/>
	</div>
</template>
<style lang="less" module>
.content {
	font-family: var(--font-family-main);
	font-size: var(--font-size-XS);
	line-height: 18px;

	width: 343px;
	min-height: 64px;
	padding: 14px 14px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 14px;

	background-color: var(--color-text-main);
	cursor: pointer;
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
}
</style>
