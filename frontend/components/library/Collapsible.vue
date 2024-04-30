<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot } from 'radix-vue';

const open = ref(false);
</script>

<template>
	<CollapsibleRoot
		v-model:open="open"
		class="collapsible-root"
	>
		<slot
			name="trigger"
			is-open="open"
		/>

		<CollapsibleContent
			as-child
			class="collapsible-root__content"
		>
			<slot name="content" />
		</CollapsibleContent>
		<slot
			name="trigger-reversed"
			:is-open="open"
		/>
	</CollapsibleRoot>
</template>

<style scoped lang="less">
.collapsible-root {
	width: 100%;

	&__content {
		width: 100%;
		overflow: hidden;
	}

	&__content[data-state='open'] {
		animation: slideDown 300ms ease-out;
	}
	&__content[data-state='closed'] {
		animation: slideUp 300ms ease-out;
	}

	@keyframes slideDown {
		from {
			height: 0;
		}
		to {
			height: var(--radix-collapsible-content-height);
		}
	}

	@keyframes slideUp {
		from {
			height: var(--radix-collapsible-content-height);
		}
		to {
			height: 0;
		}
	}
}
</style>
