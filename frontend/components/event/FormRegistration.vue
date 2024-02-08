import type { error } from 'console'; import type { error } from 'console'; import type { error }
from 'console'; import type { CommonCheckLocation } from '#build/components'; import type { error }
from 'console'; import type { error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';

const urlField = useField<string>(() => 'url', {
	validateOnModelUpdate: false
});
</script>
<template>
	<ModalUiModalLocationSection :label="$t('form.event.fields.url_to_registration')">
		<template #child>
			<CommonFormField
				:error="urlField.errorMessage.value"
				:touched="urlField.meta.touched"
			>
				<CommonUiBaseInput
					v-model="urlField.value.value"
					name="url"
					type="url"
					:placeholder="$t('form.event.fields.url_placeholder')"
					required
					:error="urlField.meta.touched && Boolean(urlField.errorMessage.value)"
				/>
			</CommonFormField>
		</template>
	</ModalUiModalLocationSection>
</template>
