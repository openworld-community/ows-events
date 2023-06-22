<script setup lang="ts">
import { BASE_URL } from '@/constants/url';

const { translate } = useTranslation();

export type ImageLoaderFile = File | null | 'DELETED';
const props = defineProps<{
	externalImage?: string;
}>();

const emit = defineEmits<{
	'update:model-value': [file: ImageLoaderFile];
}>();

const input = ref<HTMLInputElement | null>(null);
const imageSrc = ref(props.externalImage ? `${BASE_URL}${props.externalImage}` : '');
const fileIsLoading = ref(false);

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
	emit('update:model-value', 'DELETED');
};
</script>

<template>
	<div class="loader">
		<input
			ref="input"
			accept="image/*"
			type="file"
			class="d-none"
			@change="loadImage"
		/>
		<div class="loader__buttons">
			<CommonButton
				v-if="!imageSrc"
				class="loader__button"
				button-kind="ordinary"
				:button-text="translate('component.new_event_modal.add_image')"
				icon-name="picture"
				@click="fileIsLoading ? null : input?.click()"
			/>
			<div
				v-if="imageSrc"
				class="loader__preview"
			>
				<div class="loader__img-wrapper">
					<img
						:src="imageSrc"
						class="loader__image"
					/>
				</div>
				<CommonButton
					class="loader__button"
					button-kind="ordinary"
					:button-text="translate('component.new_event_modal.remove_image')"
					@click="removeImage"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.d-none {
	display: none;
}

.loader {
	&__preview {
		display: flex;
		align-items: center;
	}

	&__img-wrapper {
		max-width: 69px;
		max-height: 59px;
		overflow: hidden;
		margin-right: 10px;
		border-radius: 8px;
	}

	&__image {
		max-height: 59px;
		max-width: 69px;
	}

	&__buttons {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	&__button {
		max-height: 40px;
	}
}
</style>
