<script setup lang="ts">
import { useField } from 'vee-validate';
import { Tags, TagsArray } from '../../../../common/const/tags';

const { value, errorMessage } = useField<String[]>(() => 'tags');
</script>
<template>
	<CommonFormField :error="errorMessage">
		<div class="event-form__tags">
			<CommonUiTag
				v-for="tag in TagsArray.filter((el) => el !== Tags.ONLINE)"
				:key="tag"
				v-model="value"
				name="tags"
				:tag-key="tag"
				is-checkbox
				size="small"
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
