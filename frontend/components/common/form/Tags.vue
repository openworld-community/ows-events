<script setup lang="ts">
import { useField } from 'vee-validate';
import { Tags, TagsArray } from '../../../../common/const/tags';

const tagsFields = useField<String[]>(() => 'tags');
</script>
<template>
	<CommonFormField
		:error="tagsFields.errorMessage.value"
		:touched="tagsFields.meta.touched"
		hint="validation.hints.tags"
	>
		<div class="event-form__tags">
			<CommonUiTag
				v-for="tag in TagsArray.filter((el) => el !== Tags.ONLINE)"
				:key="tag"
				v-model="tagsFields.value.value"
				name="tags"
				:tag-key="tag"
				is-checkbox
				size="small"
				:is-disabled="
					tagsFields.value.value.filter((el) => el !== Tags.ONLINE).length >= 6 &&
					!tagsFields.value.value.includes(tag)
				"
			/>
		</div>
	</CommonFormField>
</template>

<style lang="less" scoped>
.event-form__tags {
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	gap: 10px;
}
</style>
