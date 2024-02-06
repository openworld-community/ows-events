import type { CommonFormTexrareaField } from '#build/components'; import type { error } from
'console'; import type { error } from 'console'; import type { error } from 'console'; import type {
CommonCheckLocation } from '#build/components'; import type { error } from 'console'; import type {
error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';

const titleField = useField<string>(() => 'title', {
	validateOnModelUpdate: false
});
const organizeField = useField<string>(toRef('organizer'), {
	validateOnModelUpdate: false
});

const descriptionField = useField<string>(toRef('description'));
</script>
<template>
	<ModalUiModalLocationSection :label="$t('form.event.fields.main_info')">
		<template #child>
			<CommonFormField :error="titleField.errorMessage.value">
				<CommonUiBaseInput
					v-model="titleField.value.value"
					:placeholder="$t('form.event.fields.title')"
					required
					name="title"
					:error="Boolean(titleField.errorMessage.value)"
				/>
			</CommonFormField>

			<CommonFormField :error="organizeField.errorMessage.value">
				<CommonUiBaseInput
					v-model="organizeField.value.value"
					:placeholder="$t('form.event.fields.organizer')"
					name="organizer"
					:error="JSON.stringify(organizeField.errorMessage.value)"
				/>
			</CommonFormField>

			<CommonFormField :error="descriptionField.errorMessage.value">
				<CommonUiTextArea
					v-model="descriptionField.value.value"
					:error="JSON.stringify(descriptionField.errorMessage.value)"
					name="description"
					:placeholder="$t('form.event.fields.description')"
					required
				/>
			</CommonFormField>

			<CommonFormTags />
		</template>
	</ModalUiModalLocationSection>
</template>
