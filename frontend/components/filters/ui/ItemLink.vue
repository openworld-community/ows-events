<script setup lang="ts">
import type { PropType } from 'vue';
import type { RoutePathEnum } from '~/constants/enums/route';
import { transformToQuery } from '../../../utils';

const props = defineProps({
	option: {
		type: [String, Object] as PropType<string | { [key: string]: string }>,
		required: true
	},
	path: {
		type: String as PropType<RoutePathEnum>,
		required: true
	}
});

const city = computed(() => {
	if (typeof props.option === 'string') {
		return props.option;
	}
	return props.option['value'];
});
</script>
<template>
	<li class="item-link">
		<CommonNavLink
			:to="`${path}/${transformToQuery(city)}`"
			class="item-link__nav-link"
		>
			{{ typeof option === 'string' ? option : option['label'] }}
		</CommonNavLink>
	</li>
</template>

<style lang="less" scoped>
.item-link {
	display: flex;
	width: 100%;
	cursor: pointer;
	justify-content: space-between;
	align-items: center;
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 6px;
	padding-bottom: 6px;

	&:hover {
		background-color: var(--color-accent-green-main-50);
		outline: 1px solid var(--color-accent-green-main-50);
		border-radius: 2px;
	}
	&:focus {
		background-color: var(--color-accent-green-main-50);
		outline: 1px solid var(--color-accent-green-main-50);
		border-radius: 2px;
	}

	&:focus-within {
		background-color: var(--color-accent-green-main-50);
	}
	&:focus-visible {
		background-color: var(--color-accent-green-dark);
	}

	&[data-highlighted] {
		background-color: var(--color-accent-green-main-50);
	}

	&__nav-link {
		width: 100%;
		&:hover,
		&:focus-visible {
			color: var(--color-accent-green-dark);
		}
	}
}
</style>
