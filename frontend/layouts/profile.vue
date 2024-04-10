<script setup>
const mobile = inject('mobile');
</script>

<template>
	<div class="root">
		<HeaderCommon :has-back-button="mobile" />

		<slot />

		<FooterCommon v-if="!mobile" />
	</div>
</template>
