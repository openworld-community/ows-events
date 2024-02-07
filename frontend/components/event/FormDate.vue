import type { error } from 'console'; import type { error } from 'console'; import type { error }
from 'console'; import type { CommonCheckLocation } from '#build/components'; import type { error }
from 'console'; import type { error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';

const startDateField = useField<Date>(() => 'startDate', {
	validateOnModelUpdate: false
});
const startTimeField = useField<Time>(() => 'startTime', {
	validateOnModelUpdate: false
});
const endDateField = useField<Date>(() => 'endDate', {
	validateOnModelUpdate: false
});
const endTimeField = useField<Time>(() => 'endTime', {
	validateOnModelUpdate: false
});
</script>
<template>
	<ModalUiModalSection
		type="row"
		:label="$t('form.event.fields.start')"
	>
		<template #child>
			<CommonFormField
				:error="startDateField.errorMessage.value"
				:touched="startDateField.meta.touched"
			>
				<CommonUiDateTimepicker
					v-model="startDateField.value.value"
					type="date"
					name="startDate"
					:error="
						startDateField.meta.touched && Boolean(startDateField.errorMessage.value)
					"
					:placeholder="$t('form.event.fields.date_placeholder')"
					required
				/>
			</CommonFormField>
			<CommonFormField
				:error="startTimeField.errorMessage.value"
				:touched="startTimeField.meta.touched"
			>
				<CommonUiDateTimepicker
					v-model="startTimeField.value.value"
					type="time"
					name="startTime"
					:erroe="
						startTimeField.meta.touched && Boolean(startTimeField.errorMessage.value)
					"
					placeholder="--:--"
					:disabled="!startDateField.value.value"
					required
				/>
			</CommonFormField>
		</template>
	</ModalUiModalSection>

	<ModalUiModalSection
		type="row"
		:label="$t('form.event.fields.end')"
	>
		<template #child>
			<CommonFormField
				:error="endDateField.errorMessage.value"
				:touched="endDateField.meta.touched"
			>
				<CommonUiDateTimepicker
					v-model="endDateField.value.value"
					type="date"
					name="endDate"
					:error="endDateField.meta.touched && Boolean(endDateField.errorMessage.value)"
					:placeholder="$t('form.event.fields.date_placeholder')"
					:min-date="startDateField.value.value ?? undefined"
					:disabled="!startTimeField.value.value"
				/>
			</CommonFormField>
			<CommonFormField
				:error="endTimeField.errorMessage.value"
				:touched="endTimeField.meta.touched"
			>
				<CommonUiDateTimepicker
					v-model="endTimeField.value.value"
					type="time"
					name="endTime"
					:error="endTimeField.meta.touched && Boolean(endTimeField.errorMessage.value)"
					placeholder="--:--"
					:disabled="!endDateField.value.value"
					:required="!!endDateField.value.value"
					:min-time="
						startDateField.value.value === endDateField.value.value
							? startTimeField.value.value
							: undefined
					"
				/>
			</CommonFormField>
		</template>
	</ModalUiModalSection>
</template>
