<script setup lang="ts">
const route = useRoute();
const props = defineProps<{ search: string }>();
defineEmits(['update:search']);
watch(
	() => props.search,
	async (search) => {
		await navigateTo({
			query: { ...route.query, search: search || undefined }
		});
	}
);
</script>

<template>
	<CommonInput
		input-class="input is-info search-input"
		input-type="text"
		input-name="search"
		:input-placeholder="$translate('global.search')"
		:model-value="search"
		@update:model-value="(value) => $emit('update:search', value)"
	/>
</template>

<style scoped lang="less"></style>
