<script setup lang="ts">
import { useField, useFieldArray } from 'vee-validate';
import { useEventStore } from '../../../stores/event.store';
import { Tags, TagsArray } from '../../../../common/const/tags';

const eventStore = useEventStore();

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => 'tags');
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
			:is-disabled="eventStore.eventData.tags.length >= 6"
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
