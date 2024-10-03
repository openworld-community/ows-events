<script setup lang="ts">
defineProps({
	placeholder: {
		type: String,
		default: ''
	},
	currentText: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	ariaLabel: {
		type: String,
		default: ''
	}
});
</script>
<template>
	<LibraryPopover
		:aria-label="ariaLabel"
		:disabled="disabled"
	>
		<template #trigger>
			<div
				class="link-select__trigger"
				:data-placeholder="!!currentText === false"
			>
				<span class="link-select__text">{{ currentText ? currentText : placeholder }}</span>
				<CommonIcon
					name="container"
					color="var(--color-input-icons)"
				/>
			</div>
		</template>
		<template #content>
			<div class="link-select__content">
				<LibraryScrollArea>
					<slot />
				</LibraryScrollArea>
			</div>
		</template>
	</LibraryPopover>
</template>
<style lang="less" scoped>
.link-select {
	&__trigger {
		width: 100%;
		min-width: 100%;
		display: flex;
		justify-content: space-between;
		font-family: var(--font-family-main);
		font-size: var(--font-size-M);
		@media (min-width: 1440px) {
			font-size: var(--font-size-L);
		}
	}

	&__trigger[data-placeholder='true'] {
		color: var(--color-input-icons);
	}

	&__trigger[data-placeholder='false'] {
		color: var(--color-text-main);
	}

	&__text {
		display: block;
		flex-grow: 1;
		text-align: left;
	}

	&__content {
		min-width: 200px;
		overflow: hidden;
		height: auto;

		min-height: 100px;
		max-height: 300px;
	}
}
</style>
