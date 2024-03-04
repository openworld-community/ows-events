<script
	setup
	lang="ts"
>
import { ComboboxItem, type ComboboxItemProps } from 'radix-vue';

const props = defineProps<ComboboxItemProps>();
</script>

<template>
	<ComboboxItem
		v-bind="props"
		class="search-item"
		as="li"
		tabindex="1"
	>
		<slot />
		<ComboboxItemIndicator>
			<CommonIcon
				name="check"
				color="var(--color-accent-green-main)"
				style="display: flex; align-items: center; justify-content: center"
			/>
		</ComboboxItemIndicator>
	</ComboboxItem>
</template>

<style scoped lang="less">
.search-item {
	background-color: var(--color-white);
	display: flex;
	width: 100%;
	cursor: pointer;
	justify-content: space-between;
	align-items: center;
	padding: 6px 14px 6px 8px;

	&[data-highlighted] {
		background-color: var(--color-accent-green-main-50);
	}
}
</style>
