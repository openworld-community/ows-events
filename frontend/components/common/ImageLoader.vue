<script setup lang="ts">
import { allowedFormatsToString, isImageFormatAllowed, isImageTooBig } from '../../utils/image';
import { ALLOWED_IMAGE_EXTENSIONS, ALLOWED_IMAGE_SIZE } from '~/constants/defaultValues/validation';

export type ImageLoaderFile = File | null | 'DELETED';

const config = useRuntimeConfig();
const props = defineProps<{
	externalImage?: string;
}>();
const { t } = useI18n();
const emit = defineEmits(['update:model-value']);

const input = ref<HTMLInputElement>();
const errorLoad = ref('');
const imageSrc = computed(() =>
	props.externalImage
		? props.externalImage.includes('http')
			? props.externalImage
			: `${config.public.baseUrl}${props.externalImage}`
		: ''
);

const loadImage = async (event: Event) => {
	errorLoad.value = '';
	if (!event.target) return console.warn('Load Image Event has no target attached');
	const target = event.target as HTMLInputElement;
	if (!target.files || !target.files[0])
		return console.warn('Load Image Event targed to has no files');
	const file = target.files[0];

	if (!isImageFormatAllowed(file.name)) {
		errorLoad.value = t('validation.image.extension', {
			name: allowedFormatsToString(ALLOWED_IMAGE_EXTENSIONS)
		});
		return;
	}

	if (isImageTooBig(file.size)) {
		errorLoad.value = t('validation.image.size', { count: ALLOWED_IMAGE_SIZE });
		return console.warn('Too big');
	}

	const { data } = await apiRouter.events.image.add.useMutation({ data: { image: file } });
	input.value.value = null;
	if (!data.value) {
		errorLoad.value = t('validation.image.problemServer');
		return;
	}
	emit('update:model-value', data.value.path);
};

const removeImage = async () => {
	await apiRouter.events.image.delete.useMutation({
		data: { path: props.externalImage }
	});
	input.value.value = null;
	emit('update:model-value', '');
};
</script>

<template>
	<div>
		<input
			ref="input"
			accept=".png,.webp, .svg, .jpeg, .jpg"
			type="file"
			class="d-none"
			@change="loadImage"
		/>
		<div
			v-if="imageSrc"
			class="preview"
		>
			<img
				:src="imageSrc"
				class="image"
				:alt="$t('form.event.image')"
			/>
			<button
				type="button"
				class="delete-button"
				:aria-label="$t('form.event.remove_image')"
				@click="removeImage"
			>
				<CommonIcon
					type="button"
					name="delete"
					color="var(--color-accent-red-dark)"
				/>
			</button>
		</div>
		<CommonButton
			v-else
			class="add-button"
			button-kind="ordinary"
			:button-text="$t('form.event.add_image')"
			icon-name="picture"
			icon-color="var(--color-text-main)"
			@click="input?.click()"
		/>
		<p
			v-if="errorLoad"
			class="image-error"
		>
			{{ $t(errorLoad) }}
		</p>
	</div>
</template>

<style scoped lang="less">
.d-none {
	display: none;
}

.preview {
	position: relative;
	width: fit-content;

	.image {
		min-width: unset;
		width: 248px;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		object-fit: cover;
		border-radius: 4px;

		@media (min-width: 768px) {
			width: 248px;
			aspect-ratio: 16 / 9;
		}
	}

	.delete-button {
		height: 24px;
		right: 0;
		transform: translate(50%, -50%);
		position: absolute;
		transition: filter 0.3s;

		&:hover {
			filter: brightness(0.8);
		}
	}
}

.add-button {
	max-height: 40px;
}
.image-error {
	margin-top: 6px;
	font-size: 10px;
	line-height: 12px;
	margin-left: 6px;
	color: var(--color-accent-red);
}
</style>
