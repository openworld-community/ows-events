<script setup lang="ts">
defineProps({
	error: {
		type: String,
		default: ''
	},
	errorLabel: {
		type: Boolean,
		defualt: false
	},
});

const isVisible = ref(false);

const toggleLabel = () => {
	isVisible.value = !isVisible.value;
};

const mobile = inject('mobile');
</script>
<template>
	<p
		v-if="!errorLabel || mobile"
		:class="['form-error', { validation_error: error }]"
	>
	{{ error }}
	</p>
	<div
		v-if="errorLabel && !mobile"
		class="form__error--wrapper"
	>
		<!-- почему-то на CommonIcon не вешаются ивенты :( -->
		<div
			style="display: flex;"
			@mouseenter="toggleLabel"
			@mouseleave="toggleLabel"
		>
			<CommonIcon
				name="error"
				color="var(--color-accent-red)"
			/>
		</div>
		<div 
			:class="[
				'form__error',
				'form__error--label',
				{ 'form__error--label--show': isVisible }
			]"
		>
			<div class="form__error--content">
				{{ error }}
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.form-error {
	margin-top: 6px;
	margin-left: 6px;
	font-size: 10px;
	line-height: 12px;
	color: var(--color-accent-red);
}
</style>
