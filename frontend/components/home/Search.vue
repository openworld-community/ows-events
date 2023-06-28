<script setup lang="ts">
const route = useRoute();
const props = defineProps<{ search: string }>();
const emit = defineEmits<{ 'update:search': [search: typeof props.search] }>();

watch(
	() => props.search,
	(search) => {
		return navigateTo({
			query: { ...route.query, search: search || undefined }
		});
	}
);
</script>

<template>
	<div>
		<CommonUiBaseInput
			class="main-page__search"
			name="search"
			type="text"
			icon-name="search"
			:model-value="search"
			:placeholder="$t('global.search')"
			@update:model-value="(search: typeof search)=>emit('update:search', search)"
		/>
	</div>
</template>

<style scoped lang="less"></style>
