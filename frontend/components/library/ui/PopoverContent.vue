<script setup lang="ts">
import {
	PopoverContent,
	type PopoverContentEmits,
	type PopoverContentProps,
	useForwardPropsEmits
} from 'radix-vue';

const props = defineProps<PopoverContentProps>();
const emits = defineEmits<PopoverContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<PopoverContent v-bind="{ ...forwarded, ...$attrs }">
		<slot />
	</PopoverContent>
</template>
