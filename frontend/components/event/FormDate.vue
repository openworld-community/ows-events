import type { error } from 'console'; import type { error } from 'console'; import type { error }
from 'console'; import type { CommonCheckLocation } from '#build/components'; import type { error }
from 'console'; import type { error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';

const { value: startDate, errorMessage: startDateError } = useField<Date>(() => 'startDate', {
	validateOnModelUpdate: false
});
const { value: startTime, errorMessage: startTimeError } = useField<Time>(() => 'startTime', {
	validateOnModelUpdate: false
});
const { value: endDate, errorMessage: endDateError } = useField<Date>(() => 'endDate', {
	validateOnModelUpdate: false
});
const { value: endTime, errorMessage: endTimeError } = useField<Time>(() => 'endTime', {
	validateOnModelUpdate: false
});
</script>
<template>
	<ModalUiModalSection
		type="row"
		:label="$t('form.event.fields.start')"
	>
		<template #child>
			<CommonFormField :error="startDateError">
				<CommonUiDateTimepicker
					v-model="startDate"
					type="date"
					name="startDate"
					:placeholder="$t('form.event.fields.date_placeholder')"
					required
				/>
			</CommonFormField>
			<CommonFormField :error="startTimeError">
				<CommonUiDateTimepicker
					v-model="startTime"
					type="time"
					name="startTime"
					placeholder="--:--"
					:disabled="!startDate"
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
			<CommonFormField :error="endDateError">
				<CommonUiDateTimepicker
					v-model="endDate"
					type="date"
					name="endDate"
					:placeholder="$t('form.event.fields.date_placeholder')"
					:min-date="startDate ?? undefined"
					:disabled="!startTime"
				/>
			</CommonFormField>
			<CommonFormField :error="endTimeError">
				<CommonUiDateTimepicker
					v-model="endTime"
					type="time"
					name="endTime"
					placeholder="--:--"
					:disabled="!endDate"
					:required="!!endDate"
					:min-time="startDate === endDate ? startTime : undefined"
				/>
			</CommonFormField>
		</template>
	</ModalUiModalSection>
</template>
