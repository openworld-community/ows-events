<script setup lang="ts">
import type { LocationQuery } from '#vue-router';

//if we need use with object:
//:to="localePath({ path: `/city/${belg}`, query: route.query })"
const localePath = useLocalePath();
type LinkObjectType = {
	query?: LocationQuery;
	path?: string;
};
defineProps({
	to: {
		// если это ссылка
		type: [String, Object] as PropType<String | LinkObjectType>,
		default: ''
	},
	isExternalLink: {
		// если необходимо открыть в новом окне
		type: Boolean,
		default: false
	},
	prefetch: {
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
		:prefetch="prefetch"
	>
		<slot />
	</NuxtLink>
</template>
