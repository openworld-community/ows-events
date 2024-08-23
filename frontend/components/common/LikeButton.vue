<script setup lang="ts">
import { IconDefaultParams } from '~/constants/defaultValues/icon';

const emit = defineEmits(['toggleFavourites']);
defineProps({
	isInFavourites: {
		type: Boolean,
		default: false
	},
	width: {
		type: [String, Number] as PropType<string | number>,
		default: IconDefaultParams.WIDTH
	},
	height: {
		type: [String, Number] as PropType<string | number>,
		default: IconDefaultParams.HEIGHT
	}
});
</script>

<template>
	<CommonButton
		is-icon
		is-round
		:icon-height="height"
		:icon-width="width"
		:icon-color="isInFavourites ? '#48c78e' : undefined"
		:icon-name="isInFavourites ? 'heart-filled' : 'heart'"
		:alt="
			isInFavourites
				? $t('global.button.remove_from_favourites')
				: $t('global.button.add_to_favourites')
		"
		@click="emit('toggleFavourites')"
	/>
</template>
