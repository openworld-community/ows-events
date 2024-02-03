<script setup lang="ts">
const { t } = useI18n();
const props = defineProps({
	error: {
		type: [String, Object],
		default: ''
	},
	hint: {
		type: String,
		default: ''
	}
});

const transformErrorValidate = (err?: string | Object): string => {
	if (!err) return '';
	if (typeof err === 'string') {
		return t(err);
	}
	if (typeof err === 'object') {
		const obj = { ...err };
		if ('key' in obj && obj.key && 'values' in obj) {
			const message = obj.key as string;
			const ob = obj.values as Record<string, unknown>;

			return t(message, ob);
		}
		if ('key' in obj && obj.key) {
			const message = obj.key as string;

			return t(message);
		}
	}
	return '';
};

const errorResult = computed({
	get() {
		return transformErrorValidate(props.error);
	},
	set(value) {
		return value;
	}
});
</script>
<template>
	<div class="form-field">
		<slot></slot>
		<p
			v-if="hint"
			class="form-hint"
		>
			{{ hint }}
		</p>
		<CommonErrorComponent :error="errorResult" />
	</div>
</template>

<style lang="less" scoped>
.form-hint {
	margin-top: 6px;
	font-size: 10px;
	line-height: 12px;
	color: var(--color-text-secondary);
}
</style>
