<script lang="ts" setup>
import type { ImgHTMLAttributes } from 'vue';

const emit = defineEmits<{
	(e: 'error', data: any): void;
	(e: 'load', data: any): void;
}>();

type imgProps = {
	placeholder: {
		type: (ArrayConstructor | BooleanConstructor | NumberConstructor | StringConstructor)[];
		required: boolean;
	};
	placeholderClass: {
		type: StringConstructor;
		required: boolean;
	};
	src: {
		type: StringConstructor;
		required: boolean;
	};
	format: {
		type: StringConstructor;
		required: boolean;
	};
	quality: {
		type: (NumberConstructor | StringConstructor)[];
		required: boolean;
	};
	background: {
		type: StringConstructor;
		required: boolean;
	};
	fit: {
		type: StringConstructor;
		required: boolean;
	};
	modifiers: {
		type: () => Record<string, any>;
		required: boolean;
	};
	preset: {
		type: StringConstructor;
		required: boolean;
	};
	provider: {
		type: StringConstructor;
		required: boolean;
	};
	sizes: {
		type: () => string | Record<string, any>;
		required: boolean;
	};
	densities: {
		type: StringConstructor;
		required: boolean;
	};
	preload: {
		type: () =>
			| boolean
			| {
					fetchPriority: 'auto' | 'high' | 'low';
			  };
		required: boolean;
	};
	width: {
		type: (NumberConstructor | StringConstructor)[];
		required: boolean;
	};
	height: {
		type: (NumberConstructor | StringConstructor)[];
		required: boolean;
	};
	alt: {
		type: StringConstructor;
		required: boolean;
	};
	referrerpolicy: {
		type: () => ImgHTMLAttributes['referrerpolicy'];
		required: boolean;
	};
	usemap: {
		type: StringConstructor;
		required: boolean;
	};
	longdesc: {
		type: StringConstructor;
		required: boolean;
	};
	ismap: {
		type: BooleanConstructor;
		required: boolean;
	};
	loading: {
		type: () => 'lazy' | 'eager';
		required: boolean;
		validator: (val: any) => boolean;
	};
	crossorigin: {
		type: () => 'anonymous' | 'use-credentials' | boolean;
		required: boolean;
		validator: (val: any) => boolean;
	};
	decoding: {
		type: () => 'async' | 'auto' | 'sync';
		required: boolean;
		validator: (val: any) => boolean;
	};
	nonce: {
		type: StringConstructor[];
		required: boolean;
	};
	fallback: {
		type: StringConstructor;
		required: boolean;
	};
};

const props = defineProps<imgProps>();

const attrs = useAttrs();

const propsWithoutFallbackAndSrc = computed(() => {
	const { fallback, src, ...restProps } = props;

	return { ...attrs, ...restProps };
});

const hasCDNError = ref(false);
const hasStorageError = ref(false);

const handleCDNError = (data: any) => {
	emit('error', data);
	hasCDNError.value = true;
};

const handleStorageError = (data: any) => {
	emit('error', data);
	hasStorageError.value = true;
};
</script>

<template>
	<NuxtImg
		v-if="!hasCDNError || !fallback"
		v-bind="propsWithoutFallbackAndSrc"
		:src="src"
		@error="handleCDNError"
		@load="emit('load', $event)"
	/>
	<NuxtImg
		v-else-if="(hasCDNError && !hasStorageError) || !fallback"
		v-bind="propsWithoutFallbackAndSrc"
		provider="ipx"
		:src="src"
		@error="handleStorageError"
		@load="emit('load', $event)"
	/>
	<img
		v-else
		v-bind="propsWithoutFallbackAndSrc"
		:src="fallback"
	/>
</template>
