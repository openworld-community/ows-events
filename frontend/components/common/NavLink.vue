<script setup lang="ts">
const localePath = useLocalePath();
type LinkObjectType = {
	name?: string;
	path?: string;
};
defineProps({
	to: {
		// если это ссылка
		type: [String, Object] as PropType<string | LinkObjectType>,
		default: ''
	},
	isExternalLink: {
		// если необходимо открыть в новом окне
		type: Boolean,
		default: false
	}
});
</script>
<template>
	<NuxtLink
		:external="isExternalLink"
		:to="to ? (isExternalLink ? to : localePath(to)) : null"
		:target="isExternalLink ? '_blank' : null"
	>
		<slot />
	</NuxtLink>
</template>
