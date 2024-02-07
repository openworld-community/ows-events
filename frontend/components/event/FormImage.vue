import type { error } from 'console'; import type { error } from 'console'; import type { error }
from 'console'; import type { error } from 'console'; import type { CommonCheckLocation } from
'#build/components'; import type { error } from 'console'; import type { error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';

const imageField = useField<string>(() => 'image');
</script>
<template>
	<CommonFormField
		:error="imageField.errorMessage.value"
		:touched="imageField.meta.touched"
		hint="validation.hints.image"
	>
		<CommonImageLoader
			v-model="imageField.value.value"
			:external-image="imageField.value.value"
			:error="imageField.errorMessage.value"
		/>
	</CommonFormField>
</template>
