<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
</script>
<template>
	<VueFinalModal
		:hide-overlay="false"
		overlay-transition="vfm-fade"
		overlay-transition-duration="2600"
		content-transition="vfm-fade"
		swipe-to-close="down"
		:click-to-close="true"
		:esc-to-close="true"
		:lock-scroll="true"
	>
		<slot />
	</VueFinalModal>
</template>
