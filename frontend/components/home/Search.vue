<script setup lang="ts">
const route = useRoute();
const props = defineProps<{ search: string }>();
const emit = defineEmits<{ 'update:search': [search: typeof props.search] }>();

const { translate } = useTranslation();
function searchUpdate(search: typeof props.search) {
	emit('update:search', search);
	return navigateTo({
		query: { ...route.query, search: search || undefined }
	});
}
</script>

<template>
	<div>
		<CommonUiBaseInput
			class="main-page__search"
			name="search"
			type="text"
			icon-name="search"
			:model-value="search"
			:placeholder="translate('global.search')"
			@update:model-value="searchUpdate"
		/>
	</div>
</template>

<style scoped lang="less"></style>
