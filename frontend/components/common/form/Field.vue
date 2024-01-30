<script setup lang="ts">
import { useField } from 'vee-validate';
const props = defineProps({
	name: {
		type: String,
		default: ''
	}
});
// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);
</script>
<template>
	<div class="field">
		<slot
			v-bind="error"
			:v-model="value"
			error="Boolean(errorMessage)"
		></slot>
		<p class="field__error">{{ errorMessage }}</p>
	</div>
</template>

<style lang="less" scoped>
.field {
	margin-bottom: 2rem;

	&__error {
		color: 'red';
		font-size: 12px;
		line-height: 16px;
		margin-top: 6px;
		margin-bottom: 6px;
	}
}
</style>
