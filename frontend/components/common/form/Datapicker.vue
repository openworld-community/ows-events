<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps({
	name: {
		type: String,
		default: null
	},
	placeholder: {
		type: String,
		default: ''
	},
	type: {
		type: String as PropType<'date' | 'time'>,
		required: true
	}
});

const { value, errorMessage } = useField<Date | Time>(() => props.name);
</script>
<template>
	<CommonUiDateTimepicker
		v-model="value"
		type="date"
		name="name"
		:placeholder="placeholder"
		required
	/>
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
