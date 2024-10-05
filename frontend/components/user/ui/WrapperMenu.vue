<script setup lang="ts">
const clickOnTrigger = (event: Event) => {
	event.stopPropagation();
	event.preventDefault();
};
</script>
<template>
	<LibraryPopover
		variant="custom"
		align="end"
	>
		<template #trigger>
			<CommonButton
				is-icon
				icon-name="dots-three-vertical"
				:alt="$t('global.button.back')"
				@click="clickOnTrigger($event)"
			/>
		</template>
		<template #content>
			<slot></slot>
		</template>
	</LibraryPopover>
</template>
<style scoped lang="less"></style>
