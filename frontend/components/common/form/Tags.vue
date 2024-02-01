<script setup lang="ts">
import { useField } from 'vee-validate';
import { Tags, TagsArray } from '../../../../common/const/tags';

const { value, errorMessage } = useField<String[]>(() => 'tags');
</script>
<template>
	<div class="event-form__tags">
		<CommonUiTag
			v-for="tag in TagsArray.filter((el) => el !== Tags.ONLINE)"
			:key="tag"
			v-model="value"
			name="tags"
			:tag-key="tag"
			is-checkbox
			:is-disabled="value.length >= 6"
			size="small"
		/>
	</div>
	<p>{{ errorMessage }}</p>
</template>

<style lang="less" scoped>
.event-form__tags {
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	gap: 10px;
}
</style>
