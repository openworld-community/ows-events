<script setup lang="ts">
const emit = defineEmits(['toggleFavourites']);
defineProps({
	isInFavourites: {
		type: Boolean,
		default: false
	}
});
</script>

<template>
	<CommonButton
		is-icon
		is-round
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
