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
	},
	touched: {
		type: Boolean,
		default: false
	},
	errorLabel: {
		type: Boolean,
		defualt: false
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
			v-if="hint && !(errorResult && touched)"
			class="form-hint"
		>
			{{ t(hint) }}
		</p>
		<CommonErrorComponent
			v-if="touched"
			:error="errorResult"
			:error-label="errorLabel"
		/>
	</div>
</template>

<style lang="less" scoped>
.form-field {
	width: 100%;
	position: relative;
}
.form-hint {
	margin-top: 10px;
	font-size: 10px;
	line-height: 12px;
	color: var(--color-text-secondary);
	margin-left: 6px;
}
</style>
