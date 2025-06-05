<script lang="ts">
export const baseImageProps = {
	// input source
	src: { type: String, required: false },
	fallback: { type: String, required: false },
	// modifiers
	format: { type: String, required: false },
	quality: { type: [Number, String], required: false },
	background: { type: String, required: false },
	fit: { type: String, required: false },
	modifiers: { type: Object, required: false },
	// options
	preset: { type: String, required: false },
	provider: { type: String, required: false },
	densities: { type: String, required: false },
	// <img> attributes
	width: { type: [String, Number], required: false },
	height: { type: [String, Number], required: false },
	alt: { type: String, required: false },
	// csp
	nonce: { type: [String], required: false }
};

export const imgProps = {
	...baseImageProps,
	// eslint-disable-next-line vue/require-default-prop
	placeholderClass: { type: String, required: false }
};
</script>

<script lang="ts" setup>
const emit = defineEmits<{
	(e: 'error', data: any): void;
	(e: 'load', data: any): void;
}>();

const props = defineProps(imgProps);

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
		v-if="!hasCDNError || !props.fallback"
		v-bind="propsWithoutFallbackAndSrc"
		:src="props.src"
		@error="handleCDNError"
		@load="emit('load', $event)"
	/>
	<NuxtImg
		v-else-if="(hasCDNError && !hasStorageError) || !props.fallback"
		v-bind="propsWithoutFallbackAndSrc"
		provider="ipx"
		:src="props.src"
		@error="handleStorageError"
		@load="emit('load', $event)"
	/>
	<img
		v-else
		v-bind="propsWithoutFallbackAndSrc"
		:src="props.fallback"
	/>
</template>
