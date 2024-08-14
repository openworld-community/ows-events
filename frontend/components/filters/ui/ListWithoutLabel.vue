<script setup lang="ts">
defineProps({
	options: {
		type: [Array, String, Set] as PropType<
			string | string[] | { [key: string]: string }[] | Set<string>
		>,
		required: true
	}
});
</script>
<template>
	<ul class="list">
		<FiltersUiItemLink
			v-for="option in options"
			:key="typeof option === 'string' ? option : option['value']"
			:option="option"
		/>
	</ul>
</template>

<style lang="less" scoped>
.list {
	padding: 8px 4px;
	height: 100%;
	min-height: 100px;
	max-height: 300px;
}
</style>
