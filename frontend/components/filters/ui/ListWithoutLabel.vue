<script setup lang="ts">
import type { RoutePathEnum } from '~/constants/enums/route';

defineProps({
	options: {
		type: [Array, String, Set] as PropType<
			string | string[] | { [key: string]: string }[] | Set<string>
		>,
		required: true
	},
	path: {
		type: String as PropType<RoutePathEnum>,
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
			:path="path"
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
