<script setup lang="ts">
import { SelectItem, SelectItemIndicator, type SelectItemProps, SelectItemText } from 'radix-vue';
const props = defineProps<SelectItemProps>();
</script>

<template>
	<SelectItem
		v-bind="props"
		class="select-item"
	>
		<SelectItemText as-child>
			<slot />
		</SelectItemText>
		<SelectItemIndicator>
			<CommonIcon
				class="checkbox-row__icon"
				name="check"
				color="var(--color-accent-green-main)"
			/>
		</SelectItemIndicator>
	</SelectItem>
</template>
<style scoped>
.select-item {
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

	&:hover {
		background-color: var(--color-accent-green-main-50);
	}
}
</style>
