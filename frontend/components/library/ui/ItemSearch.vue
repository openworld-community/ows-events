<script setup lang="ts">
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
<style scoped>
.search-item {
	display: flex;
	width: 100%;
	cursor: pointer;
	justify-content: space-between;
	align-items: center;
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 6px;
	padding-bottom: 6px;

	&:focus {
		background-color: var(--color-accent-green-main-50);
		outline: 1px solid var(--color-accent-green-main-50);
		border-radius: 2px;
	}
	&:focus-within {
		background-color: var(--color-accent-green-main-50);
		outline: 1px solid var(--color-accent-green-main-50);
		border-radius: 2px;
	}

	&:hover {
		background-color: var(--color-accent-green-main-50);
	}
}
.search-item[data-highlighted] {
	background-color: red;
}
</style>
