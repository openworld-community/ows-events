<script setup lang="ts">
import { BASE_URL } from '@/constants/url';

export type ImageLoaderFile = File | null | 'DELETED';
const props = defineProps<{
	externalImage?: string;
}>();

const emit = defineEmits(['update:model-value']);

const input = ref<HTMLInputElement>();
const imageSrc = computed(() => (props.externalImage ? `${BASE_URL}${props.externalImage}` : ''));

const loadImage = async (event: Event) => {
	if (!event.target) return console.warn('Load Image Event has no target attached');
	const target = event.target as HTMLInputElement;
	if (!target.files || !target.files[0])
		return console.warn('Load Image Event targed to has no files');
	const file = target.files[0];

	const { data } = await apiRouter.events.image.add.useMutation({ data: { image: file } });
	input.value.value = null;
	if (!data.value) return;
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
				:alt="$t('form.event.image')"
			/>
			<button
				class="delete-button"
				:aria-label="$t('form.event.remove_image')"
				@click="removeImage"
			>
				<CommonIcon
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
