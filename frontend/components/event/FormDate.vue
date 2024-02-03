import type { error } from 'console'; import type { error } from 'console'; import type { error }
from 'console'; import type { CommonCheckLocation } from '#build/components'; import type { error }
from 'console'; import type { error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps({
	error: {
		type: String,
		default: ''
	}
});

const { value: startDate, errorMessage: startDateError } = useField<string>(() => 'startDate');
const { value: startTime, errorMessage: startTimeError } = useField<string>(() => 'startTime');
const { value: endDate, errorMessage: endDateError } = useField<string>(() => 'endDate');
const { value: endTime, errorMessage: endTimeError } = useField<string>(() => 'endTime');
</script>
<template>
	<ModalUiModalSection
		type="row"
		:label="$t('form.event.fields.start')"
	>
		<template #child>
			<CommonFormField :error="JSON.stringify(startDateError)">
				<CommonUiDateTimepicker
					v-model="startDate"
					type="date"
					name="startDate"
					:placeholder="$t('form.event.fields.date_placeholder')"
					required
				/>
			</CommonFormField>
			<CommonFormField :error="JSON.stringify(startTimeError)">
				<CommonUiDateTimepicker
					v-model="startTime"
					type="time"
					name="startTime"
					placeholder="--:--"
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
			<CommonFormField :error="JSON.stringify(endDateError)">
				<CommonUiDateTimepicker
					v-model="endDate"
					type="date"
					name="endDate"
					:placeholder="$t('form.event.fields.date_placeholder')"
				/>
			</CommonFormField>
			<CommonFormField :error="JSON.stringify(endTimeError)">
				<CommonUiDateTimepicker
					v-model="endTime"
					type="time"
					name="endTime"
					placeholder="--:--"
					:disabled="!endDate"
					:required="!!endDate"
					:min-time="
						startDate?.toDateString() === endDate?.toDateString()
							? startTime
							: undefined
					"
				/>
			</CommonFormField>
		</template>
	</ModalUiModalSection>
</template>
