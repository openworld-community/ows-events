import type { error } from 'console'; import type { error } from 'console'; import type { error }
from 'console'; import type { CommonCheckLocation } from '#build/components'; import type { error }
from 'console'; import type { error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';

const { value: url, errorMessage: urlError } = useField<string>(() => 'url', {
	validateOnModelUpdate: false
});
</script>
<template>
	<ModalUiModalLocationSection :label="$t('form.event.fields.url_to_registration')">
		<template #child>
			<CommonFormField :error="urlError">
				<CommonUiBaseInput
					v-model="url"
					name="url"
					type="url"
					:placeholder="$t('form.event.fields.url_placeholder')"
					required
					:error="JSON.stringify(urlError)"
				/>
			</CommonFormField>
		</template>
	</ModalUiModalLocationSection>
</template>
