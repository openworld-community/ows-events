<script setup lang="ts">
import { type PropType } from 'vue';

type TagSize = 'standard' | 'small';

defineProps({
	tagKey: {
		type: String,
		required: true,
	},
	size: {
		type: String as PropType<TagSize>,
		default: 'standard'
	}
});
</script>

<template>
	<div :class="['tag', { 'tag--small': size === 'small' }]">
		<p>
			{{ $t(`event.category.${tagKey}`) }}
		</p>
	</div>
</template>

<style lang="less" scoped>
.tag {
	min-width: 50px;
	max-width: max-content;

	font-size: var(--font-size-S);
	font-weight: var(--font-weight-bold);
	line-height: 20px;
	text-align: center;

	background-color: var(--color-input-field);
	border-radius: 8px;

	padding: 4px 10px;

	&--small {
		font-size: var(--font-size-XS);
		line-height: 16px;
	}
}
</style>
