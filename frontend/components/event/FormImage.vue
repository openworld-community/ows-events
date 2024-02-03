import type { error } from 'console'; import type { error } from 'console'; import type { error }
from 'console'; import type { error } from 'console'; import type { CommonCheckLocation } from
'#build/components'; import type { error } from 'console'; import type { error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';
import { useLocationStore } from '@/stores/location.store';
import { useEventStore } from '../../stores/event.store';

const props = defineProps({
	error: {
		type: String,
		default: ''
	}
});

const { value: image, errorMessage: imageError } = useField<string>(() => 'image');
</script>
<template>
	<CommonFormField :error="imageError">
		<CommonImageLoader
			v-model="image"
			:external-image="image"
			:error="imageError"
		/>
	</CommonFormField>
</template>
