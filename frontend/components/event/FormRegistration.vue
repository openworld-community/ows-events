import type { error } from 'console'; import type { error } from 'console'; import type { error }
from 'console'; import type { CommonCheckLocation } from '#build/components'; import type { error }
from 'console'; import type { error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';
import { watch } from 'vue';

const urlField = useField<string>(() => 'url', {
	validateOnModelUpdate: false
});

// Удаляем все после # из ссылки если присутствует
// Если нужно удалить обрезку убирайте импорт watch ↑ и сам watch ↓
watch(() => urlField.value.value, (inputUrl) => {
  if (inputUrl) {
    const trimmedUrl = inputUrl.split('#')[0];
    if (trimmedUrl !== inputUrl) {
      urlField.value.value = trimmedUrl;
    }
  }
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
