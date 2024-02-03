<script setup lang="ts">
import { useField } from 'vee-validate';
import { Field, useForm } from 'vee-validate';

const props = defineProps({
	error: {
		type: String,
		default: ''
	}
});

const { value: title, errorMessage: titleError } = useField<string | number>(() => 'title');
</script>
<template>
	<CommonUiBaseInput
		v-model="title"
		:error="JSON.stringify(titleError)"
		name="title"
		:placeholder="$t('form.event.fields.title')"
		:disabled="false"
	/>
	<p>{{ JSON.stringify(titleError) }}</p>
	<CommonErrorComponent :error="JSON.stringify(titleError)" />
</template>
