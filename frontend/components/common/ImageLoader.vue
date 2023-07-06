<script setup lang="ts">
import { BASE_URL } from '@/constants/url';

export type ImageLoaderFile = File | null | 'DELETED';
const props = defineProps<{
	externalImage?: string;
}>();

const emit = defineEmits<{
	'update:model-value': [file: ImageLoaderFile];
}>();

const input = ref<HTMLInputElement>();
const imageSrc = ref(props.externalImage ? `${BASE_URL}${props.externalImage}` : '');

const loadImage = (event: Event) => {
	if (!event.target) return console.warn('Load Image Event has no target attached');
	const target = event.target as HTMLInputElement;
	if (!target.files || !target.files[0])
		return console.warn('Load Image Event targed to has no files');
	const file = target.files[0];
	const reader = new FileReader();

	// TODO: определить тип при загрузке изображения
	reader.addEventListener(
		'load',
		(e: ProgressEvent<FileReader>) => {
			if (!e.target) return console.warn('Reader Load Event has no target attached');
			const result = e.target.result;
			if (typeof result !== 'string')
				return console.warn(
					'Reader Load Event received data format which is not supported'
				);
			imageSrc.value = result;
		},
		{ once: true }
	);
	reader.readAsDataURL(file);
	emit('update:model-value', file);
};

const removeImage = () => {
	imageSrc.value = '';
	if (input.value) {
		input.value.value = '';
	}
	emit('update:model-value', 'DELETED');
};
</script>

<template>
	<div>
		<input
			ref="input"
			accept="image/*"
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
			/>
			<button
				class="delete-button"
				:aria-label="$t('modal.new_event_modal.remove_image')"
				@click="removeImage"
			>
				<CommonIcon
					name="delete"
					color="var(--color-accend-red-dark)"
				/>
			</button>
		</div>
		<CommonButton
			v-else
			class="add-button"
			button-kind="ordinary"
			:button-text="$t('modal.new_event_modal.add_image')"
			icon-name="picture"
			@click="input?.click()"
		/>
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
		width: 69px;
		height: 56px;
		overflow: hidden;
		object-fit: cover;
		border-radius: 4px;
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
</style>
